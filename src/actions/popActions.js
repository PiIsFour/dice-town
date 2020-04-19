import { ActionType } from '../types/actions'

export const updatePips = ({popId, face, pips, pipsType}) => ({
	type: ActionType.updatePips,
	popId,
	face,
	pips,
	pipsType,
})

export const removePop = popId => ({
	type: ActionType.removePop,
	popId,
})
