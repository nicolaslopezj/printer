// @flow
import {
	ADD_PRINTERS,
	SET_CONFIG,
	CHANGE_UPDATE_STATUS,
	PING_SERVER
} from '../actions/action-types'

export type configType = {
	printers: Array<string>,
	documentPrinter: string,
	receiptPrinter: string,
	port: string,
	termsOfAgreement: string,
	address: string,
	phone: string,
	email: string,
	openHoursOne: string,
	openHoursTwo: string,
	status: Object,
	payload: string
}

const initialState = {
	printers: [],
	documentPrinter: '',
	receiptPrinter: '',
	port: '',
	termsOfAgreement: '',
	address: '',
	phone: '',
	email: '',
	openHoursOne: '',
	openHoursTwo: '',
	updateStatus: {}
}

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_PRINTERS:
			return {
				...state,
				printers: action.newPrinters
			}
		case SET_CONFIG:
			return {
				...state,
				...action.changes
			}
		case CHANGE_UPDATE_STATUS:
			return {
				...state,
				updateStatus: action.updateStatus
			}
		case PING_SERVER: {
			return {
				...state,
				payload: action.payload
			}
		}
		default:
			return state
	}
}
