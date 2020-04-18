import { syncToLocalStore, getStateFromLocalStore } from './localStore'

describe('localStore', () => {
	it('syncToLocalStore saves the state to Browser Local Storage', () => {
		const localStorage = {
			setItem: jest.fn(),
		}
		const state = {
			todos: ['click', 'delete'],
		}
		const store = {
			getState: jest.fn().mockReturnValue(state),
		}
		syncToLocalStore(localStorage, 'store key', store)()
		expect(store.getState).toHaveBeenCalledWith()
		expect(localStorage.setItem).toHaveBeenCalledWith('store key', JSON.stringify(state))
	})

	it('getStateFromLocalStore', () => {
		const state = {
			todos: ['click', 'delete'],
		}
		const localStorage = {
			getItem: jest.fn().mockReturnValue(JSON.stringify(state)),
		}
		expect(getStateFromLocalStore(localStorage, 'store key')).toEqual(state)
		expect(localStorage.getItem).toHaveBeenCalledWith('store key')
	})

	it('getStateFromLocalStore returns undefined if no state in localStorage', () => {
		const localStorage = {
			getItem: jest.fn().mockReturnValue(null),
		}
		expect(getStateFromLocalStore(localStorage, 'store key')).toEqual(undefined)
		expect(localStorage.getItem).toHaveBeenCalledWith('store key')
	})

	it('getStateFromLocalStore returns undefined if state is not parseable', () => {
		const state = {
			todos: ['click', 'delete'],
		}
		const localStorage = {
			getItem: jest.fn().mockReturnValue(JSON.stringify(state).substring(0, 23)),
		}
		expect(getStateFromLocalStore(localStorage, 'store key')).toEqual(undefined)
		expect(localStorage.getItem).toHaveBeenCalledWith('store key')
	})
})
