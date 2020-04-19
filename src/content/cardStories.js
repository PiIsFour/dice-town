import * as R from 'ramda'
import { uuid } from 'uuidv4'

import { minDiceCount } from './requirements'
import { removeCard } from '../actions/boardActions'

const isCardFullfilled = card => R.all(({testCard}) => testCard(card), card.requirements)

const cardStories = Object.freeze({
	'intro 1': () => ({
		title: 'Place a citizen',
		description: 'The dice are your citizens and you can place them after rolling',
		slots: [{}, {}],
		requirements: [minDiceCount(2)],
		resolve: function(dispatch) {
			if(isCardFullfilled(this)){
				dispatch(removeCard(this.id))
			}
		},
	}),
})

export const createCard = (name) => {
	return {
		id: uuid(),
		name,
		...cardStories[name](),
	}
}
