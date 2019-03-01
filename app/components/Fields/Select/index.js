// @flow
import React from 'react'
import styles from '../styles.scss'

type Props = {
	name: string,
	label: string,
	value: string,
	options: Array,
	onChange: () => void
}

export default (props: Props) => (
	<div className={styles.fieldContainer}>
		<label htmlFor={props.name}>
			{props.label}
			<select name={props.name} value={props.value} onChange={props.onChange}>
				{props.options.map(option => (
					<option key={option.name} value={option.name}>
						{option.name}
					</option>
				))}
			</select>
		</label>
	</div>
)
