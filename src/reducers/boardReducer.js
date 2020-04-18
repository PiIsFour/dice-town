import { ActionType } from '../types/actions'
import { BoardActions } from '../types/board'
import { uuid } from 'uuidv4'

const initialBoard = {
	nextAction: BoardActions.roll,
	freePops: [],
	cards: [{
		id: uuid(),
		title: 'Place a citizen',
		name: 'intro 1',
		description: 'The dice are your citizens and you can place them after rolling',
		slots: [{}, {}],
	}],
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

const boardReducer = (rootState = {}, action = {}) => {
	const { board = initialBoard, pops } = rootState
	const { type } = action
	switch(type){
	case ActionType.roll:
		return roll(board, pops)
	default:
		return board
	}
}

export default boardReducer
