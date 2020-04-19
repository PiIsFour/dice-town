import * as R from 'ramda'
import { uuid } from 'uuidv4'

import { minDiceCount, minWorkCount, minWork, maxLife, minLife, pullsText } from './requirements'
import { removeCard, addCard, moveRollToSlot } from '../actions/boardActions'
import { updatePips, removePop, addPop } from '../actions/popActions'
import { PipType } from '../types/pips'

const isCardFullfilled = card => R.all(({testCard}) => testCard(card), card.requirements)
const delay = time => new Promise(resolve => setTimeout(resolve, time))
const isNotNill = R.complement(R.isNil)

const cardStories = Object.freeze({
	'intro 1': () => ({
		title: 'Place a citizen',
		description: 'The dice are your citizens and you can place them after rolling',
		slots: [{}, {}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('intro 2'))
			}
		},
	}),
	'intro 2': () => ({
		title: 'To many needed',
		description: 'Sometimes you can not meet the cards requirement',
		slots: [{}, {}],
		requirements: [minWorkCount(3)],
		resolve: function(dispatch) {
			dispatch(removeCard(this.id))
			dispatch(addCard('intro 3'))
			dispatch(addCard('death'))
		},
	}),
	'intro 3': () => ({
		title: 'Life is harsh',
		description: 'Death is waiting, maybe we can think of a way to "keep it alive"',
		slots: [{}, {}],
		requirements: [minWorkCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('intro 4'))
				dispatch(addCard('illness'))
			}
		},
	}),
	'intro 4': () => ({
		title: 'Life is even worse',
		description: 'illness will bring us closer to death, let\'s search some wood',
		slots: [{}],
		requirements: [minWorkCount(0)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('fire 2'))
				dispatch(addCard('explore 1'))
			}
		},
	}),
	'fire 1': () => ({
		title: 'Gather wood for a fire',
		description: 'a fire will keep the cold away',
		slots: [{
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('fire 2'))
			}
		},
	}),
	'fire 2': () => ({
		title: 'Rest at fire',
		description: 'not as taxing as sitting in the cold',
		slots: [{
			requirements: [minLife(2)],
		}, {
			requirements: [minLife(2)],
		}],
		requirements: [],
		resolve: async function(dispatch) {
			if(R.any(slot => slot.selectedRoll, this.slots)){
				R.pipe(
					R.always(this.slots),
					R.map(R.prop('selectedRoll')),
					R.filter(isNotNill),
					R.forEach(({up, pop: {id, faces}}) => {
						const upside = faces[up]
						dispatch(updatePips({
							popId: id,
							face: up,
							pips: R.max(1, upside.pips - 1),
							pipsType: upside.type,
						}))
					}),
				)()
				await delay(1000)
				dispatch(removeCard(this.id))
				dispatch(addCard('fire 1'))
			}
		},
	}),
	'death': () => ({
		title: 'Death',
		description: 'Life is just that way',
		slots: [{
			requirements: [maxLife(1), pullsText()],
		}],
		requirements: [],
		resolve: async function(dispatch, freePops) {
			for(const [slotIndex, slot] of this.slots.entries()){
				let victim = slot.selectedRoll
				if(!victim) {
					victim = R.find(roll => R.all(r => r.testRoll(roll), slot.requirements), freePops)
					if(victim){
						dispatch(moveRollToSlot({
							diceId: victim.pop.id,
							cardId: this.id,
							slot: slotIndex,
							force: true,
						}))
						await delay(1000)
					}
				}
				if(victim){
					dispatch(removePop(victim.pop.id))
				}
			}
		},
	}),
	'illness': () => ({
		title: 'Illness',
		description: 'I should really find a place to rest',
		slots: [{
			requirements: [minLife(2), pullsText()],
		}],
		requirements: [],
		resolve: async function(dispatch, freePops) {
			for(const [slotIndex, slot] of this.slots.entries()){
				let victim = slot.selectedRoll
				if(!victim) {
					victim = R.find(roll => R.all(r => r.testRoll(roll), slot.requirements), freePops)
					if(victim){
						dispatch(moveRollToSlot({
							diceId: victim.pop.id,
							cardId: this.id,
							slot: slotIndex,
							force: true,
						}))
						await delay(1000)
					}
				}
				if(victim){
					const upside = victim.pop.faces[victim.up]
					dispatch(updatePips({
						popId: victim.pop.id,
						face: victim.up,
						pips: R.max(1, upside.pips - 2),
						pipsType: upside.type,
					}))
					await delay(1000)
				}
			}
		},
	}),
	'explore 1': () => ({
		title: 'Explore your Surroundings',
		description: 'let\'s see what we can find',
		slots: [{
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('explore 2'))
				dispatch(addCard('hut 1'))
			}
		},
	}),
	'explore 2': () => ({
		title: 'Explore your Surroundings',
		description: 'let\'s see what we can find',
		slots: [{
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('explore 3'))
				dispatch(addCard('tools 1'))
			}
		},
	}),
	'explore 3': () => ({
		title: 'Explore your Surroundings',
		description: 'let\'s see what we can find',
		slots: [{
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('end 1'))
			}
		},
	}),
	'hut 1': () => ({
		title: 'We found a meadow',
		description: 'if we gather some wood we could build a hut here',
		slots: [{
			requirements: [minWork(1)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('hut 2'))
			}
		},
	}),
	'hut 2': () => ({
		title: 'We need more Logs',
		description: 'we need some of the big logs',
		slots: [{
			requirements: [minWork(1)],
		}, {
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('hut 3'))
			}
		},
	}),
	'hut 3': () => ({
		title: 'Just the roof left',
		description: 'let\'s search something to seal the roof',
		slots: [{
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('hut 4'))
				dispatch(addCard('basic teaching'))
			}
		},
	}),
	'hut 4': () => ({
		title: 'Maybe time to grow the Town',
		description: 'now that we have finished th hut we could think about a child',
		slots: [{
			requirements: [minLife(3)],
		}, {
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('child 2'))
			}
		},
	}),
	'basic teaching': () => ({
		title: 'Teaching basic skills',
		description: 'everybody starts small',
		slots: [{
			requirements: [minWork(1)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				const selected = this.slots[1].selectedRoll
				dispatch(updatePips({
					popId: selected.pop.id,
					face: selected.up,
					pips: 1,
					pipsType: PipType.work,
				}))
			}
		},
	}),
	'child 1': () => ({
		title: 'Maybe time to grow the Town',
		description: 'we could think about a child again',
		slots: [{
			requirements: [minLife(3)],
		}, {
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('child 2'))
			}
		},
	}),
	'child 2': () => ({
		title: 'A child was born',
		description: 'but it needs to be looked after',
		slots: [{
			requirements: [minWork(0)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('child 3'))
			} else {
				dispatch(removeCard(this.id))
				dispatch(addCard('child -1'))
			}
		},
	}),
	'child 3': () => ({
		title: 'A child has grown',
		description: 'and can help us now',
		slots: [],
		requirements: [],
		resolve: function(dispatch) {
			dispatch(removeCard(this.id))
			dispatch(addCard('child 1'))
			dispatch(addPop())
		},
	}),
	'child -1': () => ({
		title: 'How could\'d you',
		description: 'you do know that children need to be looked after. do you?',
		slots: [],
		requirements: [],
		resolve: function(dispatch) {
			dispatch(removeCard(this.id))
			dispatch(addCard('child 1'))
		},
	}),
	'tools 1': () => ({
		title: 'Found some stones',
		description: 'maybe we could make tools with them',
		slots: [{
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('tools 2'))
			}
		},
	}),
	'tools 2': () => ({
		title: 'Still trying to make those tools',
		description: 'maybe a stick here would help',
		slots: [{
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('tools 3'))
				const selected = this.slots[0].selectedRoll
				dispatch(updatePips({
					popId: selected.pop.id,
					face: selected.up,
					pips: 2,
					pipsType: PipType.work,
				}))
			}
		},
	}),
	'tools 3': () => ({
		title: 'The tools work',
		description: 'i can show you how',
		slots: [{
			requirements: [minWork(2)],
		}, {
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('tools 4'))
				const selected = this.slots[1].selectedRoll
				dispatch(updatePips({
					popId: selected.pop.id,
					face: selected.up,
					pips: 2,
					pipsType: PipType.work,
				}))
			}
		},
	}),
	'tools 4': () => ({
		title: 'Teaching toolmaking',
		description: 'it is not that hard',
		slots: [{
			requirements: [minWork(2)],
		}, {
			requirements: [minWork(1)],
		}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				const selected = this.slots[1].selectedRoll
				dispatch(updatePips({
					popId: selected.pop.id,
					face: selected.up,
					pips: 2,
					pipsType: PipType.work,
				}))
			}
		},
	}),
	'end 1': () => ({
		title: 'We found somthing shine',
		description: 'we have to dig to see how big it is',
		slots: [{
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minWorkCount(4)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('end 2'))
			}
		},
	}),
	'end 2': () => ({
		title: 'What is this',
		description: 'can we get it open',
		slots: [{
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minWorkCount(5)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('end 3'))
			}
		},
	}),
	'end 3': () => ({
		title: 'It is alive',
		description: 'can we talk to it',
		slots: [{
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minWorkCount(6)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('end 4'))
			}
		},
	}),
	'end 4': () => ({
		title: 'It speaks',
		description: 'can we convince it to help us',
		slots: [{
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}, {
			requirements: [minWork(0)],
		}],
		requirements: [minWorkCount(7)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('end 5'))
			}
		},
	}),
	'end 5': () => ({
		title: 'It will take us to the stars',
		description: 'you have won, thanks for playing',
		slots: [],
		requirements: [],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(addCard('end 6'))
			}
		},
	}),
	'end 6': () => ({
		title: 'Sorry it is so short',
		description: 'but I\'m out of time, hope there are no bugs',
		slots: [],
		requirements: [],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(addCard('end 6'))
			}
		},
	}),
})

export const createCard = (name) => {
	return {
		id: uuid(),
		name,
		...cardStories[name](),
	}
}
