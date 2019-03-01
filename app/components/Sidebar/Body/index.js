// @flox
import React from 'react'
import SidebarLink from '../Link'
import styles from './styles.scss'

type Props = {
	location: {}
}

const routes = [
	{
		name: 'Configuración',
		path: '/dashboard/configuration'
	}
	// {
	// 	name: 'Contacto',
	// 	path: '/dashboard/contact'
	// }
]

export default (props: Props) => {
	const links = routes.map(route => (
		<SidebarLink
			key={route.name}
			{...route}
			location={props.location}
			style={styles.sidebarButton}
		/>
	))

	return <div className={styles.body}>{links}</div>
}
