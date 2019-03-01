// @flow
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.scss'
import sodlabLogo from '../../../../resources/images/logo_notext.svg'

const mapStateToProps = ({ global }) => ({
	...global
})

type Props = {
	colorPalette: {},
	colorMode: string
}

const Header = (props: Props) => (
	<div className={styles.header}>
		<div className={styles.imgContainer}>
			<img src={sodlabLogo} alt="logo" />
		</div>
		<div className={styles.textContainer}>
			<span
				style={{
					color: props.colorPalette[props.colorMode].color
				}}
			>
				Sodlab
			</span>
		</div>
	</div>
)

export default connect(mapStateToProps)(Header)
