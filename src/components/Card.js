import React from 'react'
import './Card.css'

const Slot = () => {
	return <div className="slot"></div>
}

const Card = ({title, description, slots}) => {
	return <div className="card">
		<h2>{title}</h2>
		<p>{description}</p>
		<div className="slots">
			{slots.map((s, i) => <Slot {...s} key={i} />)}
		</div>
	</div>
}

export default Card
