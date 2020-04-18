import { combineReducers } from './util'
import popsReducer from './popReducer'
import boardReducer from './boardReducer'

const rootReducer = combineReducers({
	pops: popsReducer,
	board: boardReducer,
})

export default rootReducer
