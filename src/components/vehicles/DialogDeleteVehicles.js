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
import { deleteAllVehicles, deleteVehiclesGroup } from '../../redux/vehicles/Actions';
const useStyles = makeStyles((theme) => ({
	disableTransform: {
		textTransform: 'none'
	}
}));
const allChoise = 'all'
const selectedChoise = 'selected'
function DialogDeleteVehicles({ open, setOpen }) {
	const classes = useStyles();
	const [selectType, setSelectType] = useState(selectedChoise);
	const dispatch = useDispatch();
	const Vehicles = useSelector(state => state.Vehicles);
	const deleteRecords = () => {
		if (selectType === allChoise) deleteAll()
		else deleteGroup()
	}
	const deleteAll = () => {
		dispatch(deleteAllVehicles)
		setOpen(false)
	}
	const deleteGroup = () => {
		let body = [];
		Vehicles.vehicles.forEach(element => {
			if (element.checked) {
				body.push(element.id);
			}
		});
		dispatch(deleteVehiclesGroup(body))
		setOpen(false)
	}
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Delete Vehicles
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
						<FormControlLabel value={selectedChoise} disabled={Vehicles.selectedCount === 0} control={<Radio />} label={"Selected vehicles (" + Vehicles.selectedCount + ")"} />
						<FormControlLabel value={allChoise} control={<Radio />} label={"All vehicles (" + Vehicles.count + ")"} />
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
export default DialogDeleteVehicles;