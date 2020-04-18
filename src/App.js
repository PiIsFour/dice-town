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
				{R.range(0, 10).map(x => <Dice faces={[
					{pips: x, type: pipType.work},
					{pips: 2, type: pipType.work},
					{pips: 3, type: pipType.work},
					{pips: 5, type: pipType.work},
					{pips: 9, type: pipType.work},
					{pips: 6, type: pipType.live},
				]} up={0} key={x} />)}
			</main>
		</div>
	)
}

export default App
