import * as R from 'ramda'

import { ActionType } from '../types/actions'
import { BoardActions } from '../types/board'
import { adjustOnCondition, adjustObjectProp } from './util'
import { createCard } from '../content/cardStories'

const initialBoard = {
	nextAction: BoardActions.roll,
	freePops: [],
	cards: [createCard('intro 1')],
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

const moveRollToSlot = ({diceId, cardId, slot}) => board => {
	const roll = findRollInFreePop(diceId)(board.freePops)
		|| findRollInCards(diceId)(board.cards)
	const card = findCard(cardId)(board.cards)
	const previusRoll = card.slots[slot].selectedRoll
	if(previusRoll === roll){
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
	if(!roll){
		return board
	}
	return R.evolve({
		freePops: R.append(roll),
		cards: removeRollFromCards(diceId),
	})(board)
}

const boardReducer = (rootState = {}, action = {}) => {
	const { board = initialBoard, pops } = rootState
	const { type, diceId, cardId, slot } = action
	switch(type){
	case ActionType.roll:
		return roll(board, pops)
	case ActionType.moveRollToSlot:
		return moveRollToSlot({diceId, cardId, slot})(board)
	case ActionType.returnRoll:
		return returnRoll(diceId)(board)
	default:
		return board
	}
}

export default boardReducer
