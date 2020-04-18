import React from 'react'
import * as R from 'ramda'
import { useSelector } from 'react-redux'
import './App.css'

import Dice from './components/Dice'

function App() {
	const pop = useSelector(R.prop('pops'))
	return (
		<div className="App">
			<header className="App-header">
				<h1>Dice Town</h1>
			</header>
			<main>
				{pop && pop.map(({faces, id}) => <Dice faces={faces} up={0} key={id} />)}
			</main>
		</div>
	)
}

export default App
