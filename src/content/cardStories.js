import * as R from 'ramda'
import { uuid } from 'uuidv4'

import { minDiceCount, minWorkCount, maxLife, minLife, pullsText } from './requirements'
import { removeCard, addCard, moveRollToSlot } from '../actions/boardActions'
import { updatePips, removePop } from '../actions/popActions'

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
		requirements: [minWorkCount(1)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
				dispatch(addCard('fire 2'))
			}
		},
	}),
	'fire 1': () => ({
		title: 'Gather wood for a fire',
		description: 'a fire will keep the cold away',
		slots: [{}],
		requirements: [minWorkCount(1)],
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
})

export const createCard = (name) => {
	return {
		id: uuid(),
		name,
		...cardStories[name](),
	}
}
