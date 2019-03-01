// @flow
import React from 'react'
import styles from './styles.scss'

type Props = {
	color: string,
	bytesPerSecond: string,
	progress: string
}

export default (props: Props) => {
	const megabytesPerSecond = String(Math.trunc(props.bytesPerSecond / 1000))
	const percent = String(Math.trunc(props.progress))

	return (
		<div className={styles.progressBarContainer}>
			<div className={styles.progressWrap}>
				<span className={styles.progress}>{`${percent}%`}</span>
				<div className={styles.progressBar} style={{ width: `${percent}%` }} />
			</div>
			<span
				className={styles.progressSpeed}
				style={{
					color: props.color
				}}
			>
				{`${megabytesPerSecond} MB/s`}
			</span>
		</div>
	)
}
