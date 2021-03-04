import React from 'react'
import './Title.css'

const Title = props => {
	return (
		<div className='Title'>
			<h1
				className={'Title__H1'}
				style={{ color: props.loggedOut ? '#64dd17' : '#ffc107' }}>
				{props.title}
			</h1>
		</div>
	)
}

export default Title
