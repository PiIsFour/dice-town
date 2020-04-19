import React from 'react'
import { useDrop } from 'react-dnd'
import * as R from 'ramda'

import { DragItemType } from '../types/dnd'
import Dice from './Dice'
import Requirement from './Requirement'

const Slot = (slot) => {
	const {onDrop, selectedRoll, requirements} = slot
	const [, drop] = useDrop({
		accept: DragItemType.dice,
		drop: onDrop,
		canDrop: item => {
			if(requirements){
				return R.all(r => r.testItem(item), requirements)
			}
			return true
		},
	})
	return <div
		className="slot"
		ref={drop}
	>
		{selectedRoll && <Dice up={selectedRoll.up} faces={selectedRoll.pop.faces} id={selectedRoll.pop.id} />}
		{!selectedRoll && requirements && <div className="requirements">
			{requirements.map((r, i) => <Requirement {...r} key={i} />)}
		</div>
		}
	</div>
}

export default Slot
