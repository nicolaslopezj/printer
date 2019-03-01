// @flow
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router'
import Welcome from './Welcome'
import Dashboard from './Dashboard'
import styles from './styles.scss'
import { loadColorMode } from '../actions/actions'

const mapStateToProps = ({ global }) => ({
	colorMode: global.colorMode,
	colorPalette: global.colorPalette
})

const mapDispatchToProps = {
	loadColorMode
}

type Props = {
	store: {},
	history: {},
	colorMode: string,
	colorPalette: {},
	loadColorMode: () => void
}

class App extends Component<Props> {
	componentDidMount() {
		this.props.loadColorMode()
	}

	render() {
		const { colorMode, colorPalette, history, store } = this.props

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div
						className={styles.appContainer}
						style={{
							backgroundColor: colorPalette[colorMode].backgroundColor,
							color: colorPalette[colorMode].color
						}}
					>
						<Switch>
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/" component={Welcome} />
						</Switch>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
