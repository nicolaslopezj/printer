// @flow
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.scss'

const mapStateToProps = ({ global }) => ({
	colorPalette: global.colorPalette,
	colorMode: global.colorMode
})

type Props = {
	colorMode: string,
	colorPalette: Object,
	header: string,
	handleSubmit: () => void,
	children: Object
}

const Form = (props: Props) => (
	<div className={styles.pageContainer}>
		<div className={styles.titleContainer}>
			<h1>{props.header}</h1>
		</div>
		<div
			className={styles.formContainer}
			style={{
				backgroundColor:
					props.colorMode === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)',
				color: props.colorPalette[props.colorMode].color
			}}
		>
			<form onSubmit={props.handleSubmit}>
				{props.children}
				<div className={styles.submitContainer}>
					<div className={styles.submitLabel}>
						<div className={styles.placementFixer}>
							<input type="submit" value="Guardar" />
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
)

export default connect(mapStateToProps)(Form)
