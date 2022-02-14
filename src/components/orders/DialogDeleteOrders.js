import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	RadioGroup,
	FormControlLabel,
	Radio,
	makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllOrders, deleteOrdersGroup } from '../../redux/orders/Actions';
const useStyles = makeStyles((theme) => ({
	disableTransform: {
		textTransform: 'none'
	}
}));
const allChoise = 'all'
const selectedChoise = 'selected'
function DialogDeleteOrders({ open, setOpen }) {
	const classes = useStyles();
	const [selectType, setSelectType] = useState(selectedChoise);
	const dispatch = useDispatch();
	const Orders = useSelector(state => state.Orders);
	const deleteRecords = () => {
		if (selectType === allChoise) deleteAll()
		else deleteGroup()
	}
	const deleteAll = () => {
		dispatch(deleteAllOrders)
		setOpen(false)
	}
	const deleteGroup = () => {
		let body = [];
		Orders.orders.forEach(element => {
			if (element.checked) {
				body.push(element.id);
			}
		});
		dispatch(deleteOrdersGroup(body))
		setOpen(false)
	}
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Delete Orders
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<RadioGroup
						required={true}
						aria-label="gender"
						name="selectType"
						id="selectType"
						value={selectType}
						onChange={e => setSelectType(e.target.value)}>
						<FormControlLabel value={selectedChoise} disabled={Orders.selectedCount === 0} control={<Radio />} label={"Selected Orders (" + Orders.selectedCount + ")"} />
						<FormControlLabel value={allChoise} control={<Radio />} label={"All Orders (" + Orders.count + ")"} />
					</RadioGroup>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					className={classes.disableTransform}
					onClick={() => setOpen(false)}
					color="primary">
					Cancel
				</Button>
				<Button
					onClick={deleteRecords}
					className={classes.disableTransform}
					color="primary">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default DialogDeleteOrders;