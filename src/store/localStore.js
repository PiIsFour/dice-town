export const syncToLocalStore = (localStorage, storeKey, store) => () => {
	localStorage.setItem(storeKey, JSON.stringify(store.getState()))
}

export const getStateFromLocalStore = (localStorage, storeKey) => {
	const stateString = localStorage.getItem(storeKey)
	if(!stateString) return undefined
	try{
		return JSON.parse(stateString)
	}catch(e){
		return undefined
	}
}
