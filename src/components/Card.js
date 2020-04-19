import React from 'react'
import { useDispatch } from 'react-redux'
import './Card.css'

import Slot from './Slot'
import Requirement from './Requirement'
import { moveRollToSlot } from '../actions/boardActions'

const Card = (card) => {
	const {title, description, slots, id, requirements} = card
	const dispatch = useDispatch()
	const onDrop = slot => item => dispatch(moveRollToSlot({
		diceId: item.id,
		cardId: id,
		slot,
	}))
	return <div className="card">
		<h2>{title}</h2>
		<p>{description}</p>
		<div className="requirements">
			{requirements.map((r, i) => <Requirement {...r} card={card} key={i} />)}
		</div>
		<div className="slots">
			{slots.map((s, i) => <Slot {...s} onDrop={onDrop(i)} key={i} />)}
		</div>
	</div>
}

export default Card
