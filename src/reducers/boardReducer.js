import * as R from 'ramda'

import { ActionType } from '../types/actions'
import { BoardActions } from '../types/board'
import { adjustOnCondition, adjustObjectProp } from './util'
import { createCard } from '../content/cardStories'

const initialBoard = {
	nextAction: BoardActions.roll,
	freePops: [],
	//FIXME: change back to 'intro 1', just cheating for testing
	// cards: [createCard('intro 1')],
	cards: [createCard('intro 2')],
}

const roll = (board, pops) => {
	if(board.nextAction !== BoardActions.roll){
		return board
	}
	return {
		...board,
		nextAction: BoardActions.done,
		freePops: pops.map(pop => ({
			pop,
			up: Math.floor(Math.random()*6),
		})),
	}
}

const findRollInFreePop = diceId => R.find(({pop}) => pop.id === diceId)
const findRollInSlots = diceId => R.pipe(
	R.map(R.prop('selectedRoll')),
	R.find(roll => (roll && roll.pop.id === diceId)),
)
const findRollInCards = diceId => R.reduce((acc, {slots}) => acc || findRollInSlots(diceId)(slots), undefined)
const removeRollFromFreePops = diceId => R.filter(({pop}) => pop.id !== diceId)

const findCard = cardId => R.find(({id}) => id === cardId)
const adjustCard = (cardId, fn) => adjustOnCondition(({id}) => id === cardId, fn)
const removeRollFromCards = diceId => adjustOnCondition(
	card => R.any(slot => slot.selectedRoll && slot.selectedRoll.pop.id === diceId)(card.slots),
	adjustObjectProp('slots', adjustOnCondition(
		({selectedRoll}) => selectedRoll && selectedRoll.pop.id === diceId,
		adjustObjectProp('selectedRoll', () => undefined),
	)),
)

const moveRollToSlot = ({diceId, cardId, slot, force}) => board => {
	const roll = findRollInFreePop(diceId)(board.freePops)
		|| findRollInCards(diceId)(board.cards)
	const card = findCard(cardId)(board.cards)
	const previusRoll = card.slots[slot].selectedRoll
	if(previusRoll === roll || (board.nextAction !== BoardActions.done && !force)){
		return board
	}
	return R.evolve({
		freePops: R.pipe(
			removeRollFromFreePops(diceId),
			R.when(() => previusRoll, R.append(previusRoll)),
		),
		cards: R.pipe(
			removeRollFromCards(diceId),
			adjustCard(cardId,
				adjustObjectProp('slots', R.adjust(slot, adjustObjectProp('selectedRoll', () => roll))),
			),
		),
	})(board)
}

const returnRoll = diceId => board => {
	const roll = findRollInCards(diceId)(board.cards)
	if(!roll || board.nextAction !== BoardActions.done){
		return board
	}
	return R.evolve({
		freePops: R.append(roll),
		cards: removeRollFromCards(diceId),
	})(board)
}

const isCardFullfilled = card => R.all(({testCard}) => testCard(card), card.requirements)
const isCardFailed = R.complement(isCardFullfilled)
const isNotNill = R.complement(R.isNil)
const addFailedCardsRolls =cards => R.concat(R.pipe(
	R.always(cards),
	R.filter(isCardFailed),
	R.map(R.prop('slots')),
	R.flatten,
	R.filter(R.propSatisfies(isNotNill, 'selectedRoll')),
	R.map(R.prop('selectedRoll')),
)())
const removeRollsIfFailed = R.map(
	R.when(
		isCardFailed,
		adjustObjectProp('slots',
			R.map(adjustObjectProp('selectedRoll', () => undefined)),
		),
	),
)

const removeRollFromFailedCards = board => {
	return R.evolve({
		nextAction: () => BoardActions.resolving,
		freePops: addFailedCardsRolls(board.cards),
		cards: removeRollsIfFailed,
	})(board)
}

const collectAllDiceToRoll = R.evolve({
	nextAction: () => BoardActions.roll,
	freePops: () => [],
	cards: R.map(adjustObjectProp('slots',
		R.map(adjustObjectProp('selectedRoll', () => undefined)),
	)),
})

const removeCard = cardId => R.evolve({
	cards: R.filter(card => card.id !== cardId),
})

const addCard = name => R.evolve({
	cards: R.append(createCard(name)),
})

const updatePips = ({popId, face, pips, pipsType}) => R.evolve({
	cards: R.map(adjustObjectProp('slots',
		adjustOnCondition(
			slot => slot.selectedRoll && slot.selectedRoll.pop.id === popId,
			adjustObjectProp('selectedRoll',
				adjustObjectProp('pop',
					adjustObjectProp('faces',
						R.update(face, {
							pips,
							type: pipsType,
						}),
					),
				),
			),
		),
	)),
})

const boardReducer = (rootState = {}, action = {}) => {
	const { board = initialBoard, pops } = rootState
	const { type, diceId, cardId, slot, name, force, popId, face, pips, pipsType } = action
	switch(type){
	case ActionType.roll:
		return roll(board, pops)
	case ActionType.moveRollToSlot:
		return moveRollToSlot({diceId, cardId, slot, force})(board)
	case ActionType.returnRoll:
		return returnRoll(diceId)(board)
	case ActionType.removeRollFromFailedCards:
		return removeRollFromFailedCards(board)
	case ActionType.collectAllDiceToRoll:
		return collectAllDiceToRoll(board)
	case ActionType.removeCard:
		return removeCard(cardId)(board)
	case ActionType.addCard:
		return addCard(name)(board)
	case ActionType.updatePips:
		return updatePips({popId, face, pips, pipsType})(board)
	default:
		return board
	}
}

export default boardReducer
