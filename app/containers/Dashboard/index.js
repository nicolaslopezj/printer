// @flow
import React from 'react'
import { Switch, Route } from 'react-router'
import Sidebar from '../../components/Sidebar'
import Configuration from './Configuration'
import styles from './styles.scss'

type Props = {
	location: {}
}

export default (props: Props) => (
	<div className={styles.dashboardContainer}>
		<Sidebar location={props.location} />
		<Switch>
			<Route path="/dashboard/configuration" component={Configuration} />
			{/* <Route path="/dashboard/contact" component={Contact} /> */}
		</Switch>
	</div>
)
