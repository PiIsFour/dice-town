import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import { buildStoreFactory, injectedDependencies } from './store'

describe('store', () => {
	it('creates the Store', () => {
		const createStore = jest.fn().mockReturnValue('mock redux store')
		const rootReducer = 'mock root reducer'
		const preloadedState = 'mock preloaded state'
		const thunk = 'mock thunk middleware'
		const applyMiddleware = jest.fn().mockReturnValue('mock middleware applied')
		const composeWithDevToolsL2 = jest.fn().mockReturnValue('mock devtool middleware')
		const composeWithDevTools = jest.fn().mockReturnValue(composeWithDevToolsL2)

		const store = buildStoreFactory({
			createStore,
			applyMiddleware,
			thunk,
			composeWithDevTools,
		})({
			rootReducer,
			preloadedState,
		})

		expect(applyMiddleware).toHaveBeenCalledWith(thunk)
		expect(composeWithDevTools).toHaveBeenCalledWith({})
		expect(composeWithDevToolsL2).toHaveBeenCalledWith('mock middleware applied')
		expect(createStore).toHaveBeenCalledWith(rootReducer, preloadedState, 'mock devtool middleware')
		expect(store).toEqual('mock redux store')
	})

	it('has all the dependencies', () => {
		expect(injectedDependencies).toEqual({
			createStore,
			applyMiddleware,
			thunk,
			composeWithDevTools,
		})
	})
})
