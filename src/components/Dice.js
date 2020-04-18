import React, { useState } from 'react'
import * as R from 'ramda'
import './Dice.css'

export const pipType = Object.freeze({
	work: 'work',
	live: 'live',
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
	const [open, setOpen] = useState(false)
	const toggleOpen = () => setOpen(!open)

	const renderPips = (pips, type) => R.pipe(
		R.always(R.range(1, pips + 1)),
		R.map(pos => <Pip type={type} pos={pos} of={pips} key={pos} />),
	)()

	const mapIndexed = R.addIndex(R.map)
	const renderOtherFaces = () => {
		return R.pipe(
			R.always(R.range(0, 6)),
			R.filter(x => x !== up),
			R.insert(2, up),
			R.map(i => faces[i]),
			mapIndexed((face, index) => <div className={`dice dice-ghost dice-ghost${index}`}>
				{face && renderPips(face.pips, face.type)}
			</div>),
		)()
	}

	return <div className={`dice ${open ? 'dice-open' : ''}`} onClick={toggleOpen}>
		{renderPips(pips, type)}

		{open && renderOtherFaces()}
	</div>
}

export default Dice