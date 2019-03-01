// @flow
import React from 'react'
import styles from '../styles.scss'

type Props = {
	name: string,
	label: string,
	value: string,
	onChange: () => void
}

export default (props: Props) => (
	<div className={styles.fieldContainer}>
		<label htmlFor={props.name}>
			{props.label}
			<textarea name={props.name} value={props.value} onChange={props.onChange} />
		</label>
	</div>
)
