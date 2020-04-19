import React from 'react'
import './Requirement.css'

const Requirement = ({description, card, testCard}) => {
	const classes = [
		'requirement',
		testCard(card) ? 'requirement-fullfilled' : 'requirement-failed',
	].join(' ')
	return <p className={classes}>{description}</p>
}

export default Requirement
