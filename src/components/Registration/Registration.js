import React, { useState } from 'react'
import './Registration.css'
import axios from '../../axios'

const Registration = props => {
	const [inputs, setInputs] = useState({
		card_id: props.cardId,
		employee_id: '',
		name: '',
		email: '',
		mobile: '',
		pin: '',
		balance: 0,
	})

	// Create new user
	const createUserHandler = e => {
		e.preventDefault()

		axios
			.post('/profile/', inputs)
			.then(res => {
				props.setProfile(res.data)
				props.navigate('profile')
			})
			.catch(err => console.log(err))
	}

	// Control input change
	const inputChangeHandler = e => {
		setInputs({
			...inputs,
			[e.target.name]: e.currentTarget.value,
		})
	}

	return (
		<form className='Registration__Form' onSubmit={createUserHandler}>
			<input
				onChange={inputChangeHandler}
				autoFocus
				required
				value={inputs.employee_id}
				type='text'
				placeholder='EmployeeID'
				name='employee_id'
			/>
			<input
				onChange={inputChangeHandler}
				required
				value={inputs.name}
				type='text'
				placeholder='Name'
				name='name'
			/>
			<input
				onChange={inputChangeHandler}
				required
				value={inputs.email}
				type='email'
				placeholder='Email'
				name='email'
			/>
			<input
				onChange={inputChangeHandler}
				required
				value={inputs.mobile}
				type='tel'
				placeholder='Mobile'
				maxLength={13}
				minLength={11}
				name='mobile'
			/>
			<input
				onChange={inputChangeHandler}
				required
				value={inputs.pin}
				type='text'
				maxLength={4}
				minLength={4}
				placeholder='PIN'
				name='pin'
				pattern='[0-9]{4}'
			/>
			<div className='ButtonContainer'>
				<button type='submit'>REGISTER</button>
			</div>
		</form>
	)
}

export default Registration
