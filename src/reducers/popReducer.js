import { uuid } from 'uuidv4'

import { PipType } from '../types/pips'

const createStartingPop = () => {
	return {
		id: uuid(),
		faces: [
			{pips: 0, type: PipType.work},
			{pips: 0, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 1, type: PipType.work},
			{pips: 6, type: PipType.live},
		],
	}
}

const initialPops = [
	createStartingPop(),
	createStartingPop(),
]

const popsReducer = (rootState = {}, action = {}) => {
	const { pops = initialPops } = rootState
	return pops
}

export default popsReducer
