import React from 'react'
import './Profile.css'
import { ReactComponent as CardIcon } from '../../assets/card.svg'
import { ReactComponent as PayPalIcon } from '../../assets/paypal.svg'
import axios from '../../axios'

const TopUpForm = props => {
	// Update databasse and user interface with the new balance
	const topUpHandler = e => {
		e.preventDefault()
		props.resetTimer()
		axios
			.patch(`/profile/${props.profile.id}/`, {
				balance: e.target.amount.value,
			})
			.then(res => {
				props.setProfile(res.data)
				props.closeDialog()
			})
			.catch(err => console.log(err.message))
	}

	return (
		<form className='Topup' onSubmit={topUpHandler}>
			<input
				autoFocus
				required
				type='number'
				name='amount'
				placeholder='Amount'
				min={0.01}
				step={0.01}
			/>
			<div className='Topup__MethodsContainer'>
				<button>
					<CardIcon type='submit' style={{ fill: '#9e9d24' }} />
				</button>
				<button>
					<PayPalIcon type='submit' style={{ fill: '#448aff' }} />
				</button>
			</div>
		</form>
	)
}

export default TopUpForm
