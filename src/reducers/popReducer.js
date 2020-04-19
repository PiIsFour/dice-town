import * as R from 'ramda'
import { uuid } from 'uuidv4'

import { PipType } from '../types/pips'
import { ActionType } from '../types/actions'
import { adjustOnCondition, adjustObjectProp } from './util'

const createStartingPop = () => {
	return {
		id: uuid(),
		faces: [
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 6, type: PipType.life},
		],
	}
}

const createChild = () => {
	return {
		id: uuid(),
		faces: [
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 6, type: PipType.life},
		],
	}
}

const initialPops = [
	createStartingPop(),
	createStartingPop(),
	createStartingPop(),
]

const updatePips = ({popId, face, pips, pipsType}) => adjustOnCondition(
	pop => pop.id === popId,
	adjustObjectProp('faces',
		R.update(face, {
			pips,
			type: pipsType,
		}),
	),
)

const removePop = popId => R.filter(pop => pop.id !== popId)

const addPop = () => R.append(createChild())

const popsReducer = (rootState = {}, action = {}) => {
	const { pops = initialPops } = rootState
	const { type, popId, face, pips, pipsType } = action
	switch(type){
	case ActionType.updatePips:
		return updatePips({popId, face, pips, pipsType})(pops)
	case ActionType.removePop:
		return removePop(popId)(pops)
	case ActionType.addPop:
		return addPop()(pops)
	default:
		return pops
	}
}

export default popsReducer
