// @flow
import { SET_COLOR_MODE } from '../actions/action-types'

export type globalType = {
	colorMode: string,
	colorPalette: {
		light: {
			color: string,
			backgroundImage: string,
			backgroundColor: string,
			activeStyle: {
				color: string
			}
		},
		dark: {
			color: string,
			backgroundImage: string,
			backgroundColor: string,
			activeStyle: {
				color: string
			}
		}
	}
}

type Action = { +type?: string, +mode?: string }

const initialState = {
	colorMode: 'light',
	colorPalette: {
		light: {
			color: '#111',
			backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
			backgroundColor: '#fafafa',
			activeStyle: {
				color: '#000',
				opacity: 1
			}
		},
		dark: {
			color: '#fafafa',
			backgroundImage: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
			backgroundColor: '#11293d',
			activeStyle: {
				color: '#fff',
				opacity: 1
			}
		}
	}
}

export default function(state = initialState, action: Action) {
	switch (action.type) {
		case SET_COLOR_MODE:
			return {
				...state,
				colorMode: action.mode
			}
		default:
			return state
	}
}
