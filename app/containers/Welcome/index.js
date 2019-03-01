// @flow
import React from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import store from '../../store/configureStore'
import { changeUpdateStatus } from '../../actions/actions'
import ProgressBar from '../../components/ProgressBar'
import styles from './styles.scss'
import sodlabLogo from '../../../resources/images/logo_notext.svg'

const mapStateToProps = ({ config, global }) => ({
	colorMode: global.colorMode,
	colorPalette: global.colorPalette,
	updateStatus: config.updateStatus
})

const mapDispatchToProps = {
	changeUpdateStatus
}

type Props = {
	colorMode: string,
	colorPalette: Object,
	updateStatus: Object,
	changeUpdateStatus: () => void
}

class Welcome extends React.Component {
	props: Props

	componentDidMount() {
		ipcRenderer.on('update-status', (event, arg) => {
			if (arg.status === 'done' || arg.status === 'error') {
				return store.history.push('/dashboard/configuration')
			}
			this.props.changeUpdateStatus(arg)
		})
		if (process.env.NODE_ENV !== 'production')
			return store.history.push('/dashboard/configuration')
	}

	render() {
		const { colorMode, colorPalette, updateStatus } = this.props
		return (
			<div className={styles.welcomeContainer}>
				<img src={sodlabLogo} alt="sodlabLogo" className={styles.welcomeLogo} />
				<span
					className={styles.updateStatusText}
					style={{
						color: colorPalette[colorMode].color
					}}
				>
					{updateStatus.text}
				</span>
				{Object.keys(updateStatus).includes('progressObj') && (
					<ProgressBar
						color={colorPalette[colorMode].color}
						bytesPerSecond={updateStatus.progressObj.bytesPerSecond}
						progress={updateStatus.progressObj.percent}
					/>
				)}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
