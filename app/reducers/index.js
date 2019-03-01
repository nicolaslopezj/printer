// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import global from './global'
import config from './config'

const rootReducer = combineReducers({
	router,
	global,
	config
})

export default rootReducer
