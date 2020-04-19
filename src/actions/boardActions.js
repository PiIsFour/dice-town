import { ActionType } from '../types/actions'

export const roll = () => ({
	type: ActionType.roll,
})

export const moveRollToSlot = ({diceId, cardId, slot}) => ({
	type: ActionType.moveRollToSlot,
	diceId,
	cardId,
	slot,
})

export const returnRoll = diceId => ({
	type: ActionType.returnRoll,
	diceId,
})

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const removeRollFromFailedCards = () => ({
	type: ActionType.removeRollFromFailedCards,
})

export const done = () => async dispatch => {
	dispatch(removeRollFromFailedCards())
	await delay(1000)
}
