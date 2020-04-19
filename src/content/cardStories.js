import { uuid } from 'uuidv4'

import { minDiceCount } from './requirements'

const cardStories = Object.freeze({
	'intro 1': () => ({
		title: 'Place a citizen',
		description: 'The dice are your citizens and you can place them after rolling',
		slots: [{}, {}],
		requirements: [minDiceCount(2)],
	}),
})

export const createCard = (name) => {
	return {
		id: uuid(),
		name,
		...cardStories[name](),
	}
}
