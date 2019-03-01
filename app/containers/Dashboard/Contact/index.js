// @flow
import React from 'react'
import { connect } from 'react-redux'
import { loadConfig, saveConfig } from '../../../actions/actions'
import { Text, TextArea } from '../../../components/Fields'
import Form from '../../../components/Form'

const mapDispatchToProps = {
	loadConfig,
	saveConfig
}

type Props = {
	loadConfig: () => void,
	saveConfig: () => void
}

class ContactForm extends React.Component {
	props: Props

	constructor(props) {
		super(props)
		this.state = {
			termsOfAgreement: '',
			address: '',
			phone: '',
			email: '',
			openHoursOne: '',
			openHoursTwo: ''
		}
	}

	componentDidMount() {
		this.props.loadConfig((error, data) => {
			if (error) console.log(error)

			this.setState({
				termsOfAgreement: data.termsOfAgreement || '',
				address: data.address || '',
				phone: data.phone || '',
				email: data.email || '',
				openHoursOne: data.openHoursOne || '',
				openHoursTwo: data.openHoursTwo || ''
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

	render() {
		const {
			termsOfAgreement,
			address,
			phone,
			email,
			openHoursOne,
			openHoursTwo
		} = this.state

		return (
			<Form header="Datos de Contacto" handleSubmit={this.handleSubmit}>
				<TextArea
					name="termsOfAgreement"
					label="Términos y Condiciones"
					value={termsOfAgreement}
					onChange={this.handleChange}
				/>
				<Text
					name="address"
					label="Dirección"
					value={address}
					onChange={this.handleChange}
				/>
				<Text
					name="phone"
					label="Teléfono"
					value={phone}
					onChange={this.handleChange}
				/>
				<Text
					name="email"
					label="Email"
					value={email}
					onChange={this.handleChange}
				/>
				<Text
					name="openHoursOne"
					label="Horario de atención 1"
					value={openHoursOne}
					onChange={this.handleChange}
				/>
				<Text
					name="openHoursTwo"
					label="Horario de atención 2"
					value={openHoursTwo}
					onChange={this.handleChange}
				/>
			</Form>
		)
	}
}

export default connect(null, mapDispatchToProps)(ContactForm)
