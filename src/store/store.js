import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

export const buildStoreFactory = ({
	createStore,
	applyMiddleware,
	thunk,
	composeWithDevTools,
}) => ({
	rootReducer,
	preloadedState,
}) => createStore(
	rootReducer,
	preloadedState,
	composeWithDevTools({})(applyMiddleware(thunk)),
)

export const injectedDependencies = {
	createStore,
	applyMiddleware,
	thunk,
	composeWithDevTools,
}

export default buildStoreFactory(injectedDependencies)
