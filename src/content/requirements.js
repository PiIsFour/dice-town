import * as R from 'ramda'

import { PipType } from '../types/pips'

export const minDiceCount = min => ({
	description: `min ${min} dice`,
	testCard: R.pipe(
		R.prop('slots'),
		R.map(slot => slot.selectedRoll ? 1 : 0),
		R.sum,
		diceCount => diceCount >= min,
	),
})

const isNotNill = R.complement(R.isNil)
const getUpsideFace = roll => roll.pop.faces[roll.up]

export const minWorkCount = min => ({
	description: `min ${min} work`,
	testCard: R.pipe(
		R.prop('slots'),
		R.filter(R.propSatisfies(isNotNill, 'selectedRoll')),
		R.map(slot => slot.selectedRoll),
		R.map(getUpsideFace),
		R.filter(upside => upside.type === PipType.work),
		R.map(upside => upside.pips),
		R.sum,
		diceCount => diceCount >= min,
	),
})

export const maxLife = max => ({
	description: `max ${max} life`,
	testItem: ({pips, pipsType}) => pipsType === PipType.life && pips <= max,
	testRoll: function({up, pop: { faces }}) {
		const upside = faces[up]
		return this.testItem({pips: upside.pips, pipsType: upside.type})
	},
})

export const minLife = min => ({
	description: `min ${min} life`,
	testItem: ({pips, pipsType}) => pipsType === PipType.life && pips >= min,
	testRoll: function({up, pop: { faces }}) {
		const upside = faces[up]
		return this.testItem({pips: upside.pips, pipsType: upside.type})
	},
})

export const pullsText = () => ({
	description: 'pulls',
	testItem: () => true,
	testRoll: () => true,
})
