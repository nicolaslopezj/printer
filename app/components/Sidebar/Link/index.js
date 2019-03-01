// @flow
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mapStateToProps = ({ global }) => ({
	...global
})

type Props = {
	name: string,
	path: string,
	style: string,
	colorPalette: {},
	colorMode: string
}

const iconDictionary = {
	Configuración: 'sliders-h',
	Contacto: 'receipt',
	Historial: 'history'
}

const SidebarLink = (props: Props) => (
	<div className={props.style}>
		<span>
			<NavLink
				to={props.path}
				activeStyle={{
					...props.colorPalette[props.colorMode].activeStyle
				}}
				style={{
					color: props.colorPalette[props.colorMode].color
				}}
			>
				<FontAwesomeIcon icon={iconDictionary[props.name]} />
				{props.name}
			</NavLink>
		</span>
	</div>
)

export default connect(mapStateToProps)(SidebarLink)
