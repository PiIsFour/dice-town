import { ActionType } from '../types/actions'

export const roll = () => ({
	type: ActionType.roll,
})

export const moveRollToSlot = ({diceId, cardId, slot, force=false}) => ({
	type: ActionType.moveRollToSlot,
	diceId,
	cardId,
	slot,
	force,
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
	const waitTime = 500
	dispatch(removeRollFromFailedCards())
	await delay(waitTime)
	const { cards, freePops } = getState().board
	for(const card of cards){
		await card.resolve(dispatch, freePops)
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
