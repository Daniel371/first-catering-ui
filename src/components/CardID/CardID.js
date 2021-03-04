import React, { useState } from 'react'
import './CardID.css'
import axios from '../../axios'
import BasicDialog from '../Dialog/BasicDialog'

const CardID = props => {
	const [open, setOpen] = useState(false)
	const [pin, setPin] = useState({ value: '', error: false })

	// Control ID input
	const cardIdChangeHandler = e => {
		props.setCardId(e.target.value.toUpperCase())
	}

	// Control PIN input
	const pinChangeHandler = e => {
		setPin({ value: e.target.value, error: false })
	}

	// Check if user exist when card number is entered
	const submitHandler = e => {
		e.preventDefault()
		axios
			.get(`/find/?cardid=${props.cardId}`)
			.then(res => setOpen(true))
			.catch(err => {
				const status = err.response.status
				status === 404 && props.navigate('registration')
			})
	}

	// When user if found, verify the ping number
	const getProfileHandler = e => {
		e.preventDefault()
		axios
			.get(`/profile/?cardid=${props.cardId}&pin=${pin.value}`)
			.then(res => {
				props.setProfile(res.data[0])
				setOpen(false)
			})
			.catch(err => {
				setPin({ value: '', error: 'WRONG PIN NUMBER' })
			})
	}

	return (
		<>
			<BasicDialog
				open={open}
				title='Please enter your PIN'
				closeHandler={() => setOpen(false)}>
				<form className='PinConfirmation' onSubmit={getProfileHandler}>
					<input
						autoFocus
						onChange={pinChangeHandler}
						type='password'
						placeholder='PIN'
						value={pin.value}
						minLength={4}
						maxLength={4}
					/>
					{pin.error && <p className='PinConfirmation__Error'>{pin.error}</p>}
				</form>
			</BasicDialog>
			<form onSubmit={submitHandler}>
				<input
					className='CardId__Input'
					onChange={cardIdChangeHandler}
					value={props.cardId}
					maxLength={16}
					minLength={16}
					type='text'
					placeholder='Scan or enter your card ID'
				/>
			</form>
		</>
	)
}

export default CardID
