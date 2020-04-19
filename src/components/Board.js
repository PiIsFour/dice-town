import React from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import './Board.css'

import { roll, returnRoll } from '../actions/boardActions'
import { DragItemType } from '../types/dnd'
import Dice from './Dice'
import Card from './Card'

const Board = () => {
	const freePops = useSelector(R.path(['board', 'freePops']))
	const cards = useSelector(R.path(['board', 'cards']))
	const dispatch = useDispatch()
	const dispatchRoll = () => dispatch(roll())
	const onReturn = item => dispatch(returnRoll(item.id))

	const [, drop] = useDrop({
		accept: DragItemType.dice,
		drop: onReturn,
	})

	return <main className="board">
		<div className="cards">
			{cards && cards.map(c => <Card {...c} key={c.id} />)}
		</div>
		<button onClick={dispatchRoll}>Roll</button>
		<div
			className="free-pops"
			ref={drop}
		>
			{freePops && freePops.map(({up, pop: {faces, id}}) => <Dice up={up} faces={faces} id={id} key={id} />)}
		</div>
	</main>
}

export default Board
