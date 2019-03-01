import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import styles from './styles.scss'

const mapStateToProps = ({ global }) => ({
	...global
})

type Props = {
	location: {},
	colorPalette: {},
	colorMode: string
}

const sidebar = (props: Props) => (
	<div
		className={styles.sidebarContainer}
		style={{
			backgroundColor:
				props.colorMode === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)',
			color: props.colorPalette[props.colorMode].color
		}}
	>
		<Header />
		<Body location={props.location} />
		<Footer />
	</div>
)

export default connect(mapStateToProps)(sidebar)
