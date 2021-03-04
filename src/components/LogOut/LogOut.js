import React from 'react'
import './LogOut.css'
import { ReactComponent as LogOutIcon } from '../../assets/logout.svg'

const LogOut = props => {
	return (
		<div className='LogOut'>
			<div className='LogOut__Button' onClick={props.logOut}>
				<p>To log out, scan your card again or click here</p>
				<LogOutIcon height={40} width={40} />
			</div>
		</div>
	)
}

export default LogOut
