// @flow
import * as types from './action-types'
import { db, printers } from '../helpers'

// GLOBAL action creators
export const loadColorMode = () => async dispatch => {
	try {
		const data = await db.get()
		const colorMode =
			typeof data.colorMode !== 'undefined' ? data.colorMode : 'light'
		return dispatch(setColorMode(colorMode))
	} catch (error) {
		return dispatch(setColorMode('light'))
	}
}

export const saveColorMode = (colorMode: string) => async dispatch => {
	try {
		const data = await db.get()
		const newData = { ...data, colorMode }
		await db.set(newData)
		return dispatch(setColorMode(colorMode))
	} catch (error) {
		return dispatch(setColorMode('light'))
	}
}

export const setColorMode = (mode: string) => ({
	type: types.SET_COLOR_MODE,
	mode
})

// CONFIG action creators
export const getPrinters = () => dispatch => {
	const printerList = printers.fetchPrinters()
	return dispatch(addPrinters(printerList))
}

export const addPrinters = (newPrinters: Array) => ({
	type: types.ADD_PRINTERS,
	newPrinters
})

export const loadConfig = callback => async dispatch => {
	try {
		const data = await db.get()
		dispatch(getPrinters())
		dispatch(setConfig(data))
		return callback(null, { ...data })
	} catch (error) {
		console.log(error)
		return callback(error)
	}
}

export const saveConfig = (changes: Object) => async dispatch => {
	try {
		const data = await db.get()
		const newData = { ...data, ...changes }
		await db.set(newData)
		return dispatch(setConfig(newData))
	} catch (error) {
		console.log(error)
		return dispatch(setConfig({}))
	}
}

export const setConfig = (changes: Object) => ({
	type: types.SET_CONFIG,
	changes
})

export const changeUpdateStatus = (updateStatus: Object) => ({
	type: types.CHANGE_UPDATE_STATUS,
	updateStatus
})

export const pingServer = port => async dispatch => {
	try {
		const requestServer = await fetch(`http://localhost:${port}/`)
		return dispatch({ type: types.PING_SERVER, payload: requestServer })
	} catch (err) {
		console.log('Err:', err)
	}
}

// type: types.PING_SERVER
