import React from 'react'
import './Requirement.css'

const Requirement = ({description, card, testCard}) => {
	const classes = [
		'requirement',
	]
	if(testCard && card){
		classes.push(testCard(card) ? 'requirement-fullfilled' : 'requirement-failed')
	}
	return <p className={classes.join(' ')}>{description}</p>
}

export default Requirement
