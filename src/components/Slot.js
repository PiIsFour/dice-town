import React from 'react'
import { useDrop } from 'react-dnd'

import { DragItemType } from '../types/dnd'
import Dice from './Dice'

const Slot = ({onDrop, selectedRoll}) => {
	const [, drop] = useDrop({
		accept: DragItemType.dice,
		drop: onDrop,
		canDrop: item => true,
	})
	return <div
		className="slot"
		ref={drop}
	>
		{selectedRoll && <Dice up={selectedRoll.up} faces={selectedRoll.pop.faces} id={selectedRoll.pop.id} />}
	</div>
}

export default Slot
