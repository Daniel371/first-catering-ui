import React, { useState, useEffect } from 'react'
import './App.css'
import Title from './components/Title/Title'
import CardID from './components/CardID/CardID'
import Registration from './components/Registration/Registration'
import Profile from './components/Profile/Profile'
import LogOut from './components/LogOut/LogOut'

const App = () => {
	const [profile, setProfile] = useState(null)
	const [cardId, setCardId] = useState('')
	const [page, setPage] = useState('home')
	const [loggedOut, setLoggedOut] = useState(false)

	// Monitor logged out state changes, say "Goodbye" for 2 seconds when user logged out"
	useEffect(() => {
		if (loggedOut) {
			setCardId('')
			setProfile(null)
			const tOut = setTimeout(() => {
				setLoggedOut(false)
				clearInterval(tOut)
			}, 2000)
		}
	}, [loggedOut])

	// switch between ui elements based on state
	const navigate = toPage => {
		setPage(toPage)
	}

	// Actins to perform to log user out
	const logOut = () => {
		setProfile(null)
		navigate('home')
		setLoggedOut(true)
	}

	// Show component based on context
	const content = {
		home: (
			<CardID
				logOut={logOut}
				setProfile={setProfile}
				navigate={navigate}
				cardId={cardId}
				setCardId={setCardId}
			/>
		),
		registration: (
			<Registration
				navigate={navigate}
				cardId={cardId}
				setCardId={setCardId}
				setProfile={setProfile}
			/>
		),
		profile: (
			<Profile
				logOut={logOut}
				navigate={navigate}
				profile={profile}
				setProfile={setProfile}
			/>
		),
	}

	// Navigate to profile page when profile information is retrieved
	useEffect(() => {
		profile && navigate('profile')
	}, [profile])

	return (
		<div className='App'>
			<div className='App__Container'>
				<div className='App__Header'>
					{profile ? (
						<LogOut logOut={logOut} />
					) : (
						<Title
							loggedOut={loggedOut}
							title={!loggedOut ? 'First Catering LTD' : 'Thank you, Goodbye!'}
						/>
					)}
				</div>
				<div className='App__Content'>{content[page]}</div>
			</div>
		</div>
	)
}

export default App
