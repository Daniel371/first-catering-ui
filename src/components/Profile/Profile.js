import React, { useState, useEffect } from 'react'
import './Profile.css'
import { ReactComponent as BasketIcon } from '../../assets/basket.svg'
import { ReactComponent as CardIcon } from '../../assets/card.svg'
import BasicDialog from '../Dialog/BasicDialog'
import TopUpForm from './TopUpForm'
import axios from '../../axios'

const Profile = props => {
	const [open, setOpen] = useState(false)
	const [timer, setTimer] = useState(0)
	const { balance, id, name } = props.profile || {
		balance: null,
		id: null,
		name: '',
	}

	// Set timer back to 0 when some action is performed
	const resetTimer = () => {
		setTimer(0)
	}

	// Countdown. When timer will reach 60 seconds, user will be logged out automatically
	const updateTimer = () => {
		setTimer(prev => {
			if (prev === 60) {
				props.logOut()
				return
			}
			return prev + 1
		})
	}

	// Start timer when component mounts. When user perform action, timer will reset
	useEffect(() => {
		let timeout = setTimeout(() => {
			updateTimer()
		}, 1000)
		return () => clearTimeout(timeout)
	})

	// Open top up dialog
	const topUp = () => {
		setOpen(true)
		resetTimer()
	}

	const purchaseHandler = () => {
		// Random price generation for testin & demo purposes
		const itemPrice = (Math.random() * 5 + 0.01).toFixed(2)
		resetTimer()

		// Check if balance is sufficient to purchase the item
		if (balance - itemPrice < 0) {
			setOpen(true)
		} else {
			axios
				.patch(`/profile/${id}/`, {
					balance: (itemPrice * -1).toString(),
				})
				.then(res => {
					props.setProfile(res.data)
				})
				.catch(err => console.log(err.message))
		}
	}

	return (
		<div className='Profile'>
			<BasicDialog
				open={open}
				title='TOP UP'
				closeHandler={() => setOpen(false)}>
				<TopUpForm
					{...props}
					closeDialog={() => setOpen(false)}
					resetTimer={resetTimer}
				/>
			</BasicDialog>
			<h1>{`Welcome ${name}`}</h1>
			<h2>YOUR BALANCE</h2>
			<h3>{` £ ${balance}`}</h3>
			<div className='Profile__ButtonContainer'>
				<button className='Profile__Confirm' onClick={purchaseHandler}>
					<BasketIcon style={{ fill: 'rgb(100, 221, 23)' }} />
					<p>CONFIRM PURCHASE</p>
				</button>
				<button className='Profile__Topup' onClick={topUp}>
					<CardIcon style={{ fill: 'rgb(255, 193, 7)' }} />
					<p>TOP UP</p>
				</button>
			</div>
		</div>
	)
}

export default Profile
