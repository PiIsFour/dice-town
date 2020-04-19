import * as R from 'ramda'

export const minDiceCount = min => ({
	description: `min ${min} dice`,
	testCard: R.pipe(
		R.prop('slots'),
		R.map(slot => slot.selectedRoll ? 1 : 0),
		R.sum,
		diceCount => diceCount >= min,
	),
})

