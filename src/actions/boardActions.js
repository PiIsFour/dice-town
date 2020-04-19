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
