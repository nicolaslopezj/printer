// @flow
import React from 'react'
import { connect } from 'react-redux'
import { loadConfig, saveConfig, pingServer } from '../../../actions/actions'
import { Select, Text } from '../../../components/Fields'
import Form from '../../../components/Form'
import styles from './styles.scss'

const mapStateToProps = ({ config }) => ({
	printers: config.printers
})

const mapDispatchToProps = {
	loadConfig,
	saveConfig,
	pingServer
}

type Props = {
	printers: Array,
	loadConfig: () => void,
	saveConfig: () => void,
	pingServer: () => void
}

class Configuration extends React.Component {
	props: Props

	constructor(props) {
		super(props)
		this.state = {
			documentPrinter: '',
			receiptPrinter: '',
			port: '',
			message: ''
		}
	}

	componentDidMount() {
		this.props.loadConfig((error, data) => {
			if (error) return console.log(error)
			this.setState({
				documentPrinter: data.documentPrinter || '',
				receiptPrinter: data.receiptPrinter || '',
				port: data.port || ''
			})
		})
	}

	handleChange = event => {
		const { target } = event
		const value = target.type === 'checkbox' ? target.checked : target.value
		const { name } = target

		return this.setState({
			[name]: value
		})
	}

	handleSubmit = event => {
		event.preventDefault()

		return this.props.saveConfig(this.state)
	}

	handlePingServer = event => {
		event.preventDefault()
		const seconds = 1000 * 3
		this.props
			.pingServer(this.state.port)
			.then(({ payload }) => payload.json())
			.then(message => this.setState(message))
			.then(
				setTimeout(() => {
					this.setState({ message: '' })
				}, seconds)
			)
			.catch(err => {
				this.setState({ message: 'Hubo un error al hacer ping al servidor' })
				console.log('Err:', err)
			})
	}

	render() {
		return (
			<Form header="Configuración" handleSubmit={this.handleSubmit}>
				<Select
					name="documentPrinter"
					label="Impresora de Documentos"
					value={this.state.documentPrinter}
					options={this.props.printers}
					onChange={this.handleChange}
				/>
				<Select
					name="receiptPrinter"
					label="Impresora de Boletas"
					value={this.state.receiptPrinter}
					options={this.props.printers}
					onChange={this.handleChange}
				/>
				<Text
					name="port"
					label="Puerto"
					value={this.state.port}
					onChange={this.handleChange}
				/>
				<div className={styles.submitContainer}>
					<div className={styles.submitLabel}>
						<div className={styles.placementFixer}>
							<input type="submit" value="Ping!" onClick={this.handlePingServer} />
						</div>
					</div>
				</div>
				{this.state.message}
			</Form>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
