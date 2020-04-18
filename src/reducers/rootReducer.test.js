import rootReducer from './rootReducer'

describe('rootReducer', () => {
	it('initial state matches snapshot', () => {
		const initialState = rootReducer()
		expect(initialState).toMatchSnapshot()
	})

	it('returns the same state if none of the substates change', () => {
		const initialState = rootReducer()
		const unusedAction = { type: 'SHOULD_NOT_BE_USED' }
		expect(rootReducer(initialState, unusedAction)).toBe(initialState)
	})
})
