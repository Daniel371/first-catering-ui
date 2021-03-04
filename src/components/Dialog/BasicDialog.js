import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { DialogContent, DialogTitle } from '@material-ui/core'

const BasicDialog = props => {
	return (
		<Dialog onClose={props.closeHandler} open={props.open}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent style={{ minWidth: 400 }}>{props.children}</DialogContent>
		</Dialog>
	)
}

export default BasicDialog
