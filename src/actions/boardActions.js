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

const collectAllDiceToRoll = () => ({
	type: ActionType.collectAllDiceToRoll,
})

export const done = () => async (dispatch, getState) => {
	const waitTime = 1000
	dispatch(removeRollFromFailedCards())
	await delay(waitTime)
	const cards = getState().board.cards
	for(const card of cards){
		card.resolve(dispatch)
		await delay(waitTime)
	}
	dispatch(collectAllDiceToRoll())
}

export const removeCard = cardId => ({
	type: ActionType.removeCard,
	cardId,
})

export const addCard = name => ({
	type: ActionType.addCard,
	name,
})
