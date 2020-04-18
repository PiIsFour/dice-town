import React from 'react'
import * as R from 'ramda'
import './Dice.css'

export const pipType = Object.freeze({
	work: 'work',
})

const Pip = ({pos, of, type}) => {
	const classes = [
		'pip',
		`pip${pos}of${of}`,
		`pip-${type}`,
	].join(' ')
	return <div className={classes}></div>
}

const Dice = ({faces, up}) => {
	const {pips, type} = faces[up]
	return <div className="dice">
		{R.pipe(
			R.always(R.range(1, pips + 1)),
			R.map(pos => <Pip type={type} pos={pos} of={pips} key={pos} />),
		)()}
	</div>
}

export default Dice
