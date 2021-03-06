import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import DndBackend from 'react-dnd-html5-backend'
import './index.css'

import App from './App'
import buildStore from './store/store'
import rootReducer from './reducers/rootReducer'

const store = buildStore({
	rootReducer,
	preloadedState: undefined,
})

ReactDOM.render(
	<React.StrictMode>
		<DndProvider backend={DndBackend}>
			<Provider store={store}>
				<App />
			</Provider>
		</DndProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
