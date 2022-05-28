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
import { deleteAllCharges, deleteChargesGroup } from '../../redux/charges/Actions';
const useStyles = makeStyles((theme) => ({
	disableTransform: {
		textTransform: 'none'
	}
}));
const allChoise = 'all'
const selectedChoise = 'selected'
function DialogDeleteCharges({ open, setOpen }) {
	const classes = useStyles();
	const [selectType, setSelectType] = useState(selectedChoise);
	const dispatch = useDispatch();
	const records = useSelector(state => state.Charges);
	const deleteRecords = () => {
		if (selectType === allChoise) deleteAll()
		else deleteGroup()
	}
	const deleteAll = () => {
		dispatch(deleteAllCharges)
		setOpen(false)
	}
	const deleteGroup = () => {
		let body = [];
		records.records.forEach(element => {
			if (element.checked) {
				body.push(element.id);
			}
		});
		dispatch(deleteChargesGroup(body))
		setOpen(false)
	}
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Delete charges
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
						<FormControlLabel value={selectedChoise} disabled={records.selectedCount === 0} control={<Radio />} label={"Selected records (" + records.selectedCount + ")"} />
						<FormControlLabel value={allChoise} control={<Radio />} label={"All records (" + records.count + ")"} />
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
export default DialogDeleteCharges;