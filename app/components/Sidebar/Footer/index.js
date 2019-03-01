// @flow
import React from 'react'
import { connect } from 'react-redux'
import { saveColorMode } from '../../../actions/actions'
import styles from './styles.scss'

const mapStateToProps = ({ global }) => ({
	colorMode: global.colorMode
})

const mapDispatchToProps = {
	saveColorMode
}

type Props = {
	colorMode: string,
	saveColorMode: () => void
}

class Footer extends React.Component {
	props: Props

	constructor() {
		super()
		this.changeColors = this.changeColors.bind(this)
	}

	changeColors() {
		const colorMode = this.props.colorMode === 'light' ? 'dark' : 'light'
		this.props.saveColorMode(colorMode)
	}

	render() {
		return (
			<div className={styles.footerContainer}>
				<form>
					<div key="colorModeToggle" className="filter">
						<input
							type="checkbox"
							id="colorMode"
							className={styles.cbx}
							style={{
								display: 'none'
							}}
							checked={this.props.colorMode !== 'light'}
							onChange={this.changeColors}
						/>
						<label htmlFor="colorMode" className={styles.lbl} />
					</div>
				</form>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
