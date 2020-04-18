import { combineReducers } from './util'
import popsReducer from './popReducer'

const rootReducer = combineReducers({
	pops: popsReducer,
})

export default rootReducer
