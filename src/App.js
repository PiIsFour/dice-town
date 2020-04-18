import React from 'react'
import * as R from 'ramda'
import './App.css'

import Dice, { pipType } from './components/Dice'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Dice Town</h1>
			</header>
			<main>
				{R.range(0, 10).map(x => <Dice faces={[{pips: x, type: pipType.work}]} up={0} key={x} />)}
			</main>
		</div>
	)
}

export default App
