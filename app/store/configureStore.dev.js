// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import * as actionTypes from '../actions/action-types'
import * as actions from '../actions/actions'
import type { configType } from '../reducers/config'
import type { globalType } from '../reducers/global'

const history = createHashHistory()

type InitialState = globalType & configType

const configureStore = (initialState?: InitialState) => {
	// Redux Configuration
	const middleware = []
	const enhancers = []

	// Thunk Middleware
	middleware.push(thunk)

	// Logging Middleware
	const logger = createLogger({
		level: 'info',
		collapsed: true
	})

	// Skip redux logs in console during the tests
	if (process.env.NODE_ENV !== 'test') {
		middleware.push(logger)
	}

	// Router Middleware
	const router = routerMiddleware(history)
	middleware.push(router)

	// Redux DevTools Configuration
	const actionCreators = {
		...actionTypes,
		...actions,
		...routerActions
	}
	// If Redux DevTools Extension is installed use it, otherwise use Redux compose
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html /* eslint-disable indent */
				actionCreators /* eslint-disable indent */
		  })
		: compose
	/* eslint-enable no-underscore-dangle */

	// Apply Middleware & Compose Enhancers
	enhancers.push(applyMiddleware(...middleware))
	const enhancer = composeEnhancers(...enhancers)

	// Create Store
	const store = createStore(rootReducer, initialState, enhancer)

	if (module.hot) {
		module.hot.accept(
			'../reducers',
			() => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
		)
	}

	return store
}

export default { configureStore, history }
