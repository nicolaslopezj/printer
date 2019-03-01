// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import type { configType } from '../reducers/config'
import type { globalType } from '../reducers/global'

type InitialState = globalType & configType

const history = createHashHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

function configureStore(initialState?: InitialState) {
	return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
