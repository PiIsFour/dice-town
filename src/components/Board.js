import React from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import './Board.css'

import { roll } from '../actions/boardActions'
import Dice from './Dice'
import Card from './Card'

const Board = () => {
	const freePops = useSelector(R.path(['board', 'freePops']))
	const cards = useSelector(R.path(['board', 'cards']))
	const dispatch = useDispatch()
	const dispatchRoll = () => dispatch(roll())
	return <main className="board">
		<div className="cards">
			{cards && cards.map(c => <Card {...c} key={c.id} />)}
		</div>
		<button onClick={dispatchRoll}>Roll</button>
		<div className="free-pops">
			{freePops && freePops.map(({up, pop: {faces, id}}) => <Dice up={up} faces={faces} id={id} key={id} />)}
		</div>
	</main>
}

export default Board
