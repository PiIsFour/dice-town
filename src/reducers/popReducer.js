const initialPops = []

const popsReducer = (rootState = {}, action = {}) => {
	const { pops = initialPops } = rootState
	return pops
}

export default popsReducer
