import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Button,
  InputLabel,
  Select
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TRANSPORT_TYPES, VEHICLES_ROUTE, VEHICLES_SERVICE_TYPES } from '../../constants/index';
// import BaseWaiting from '../Base/BaseWaiting';
import { addVehicle } from '../../redux/vehicles/Actions';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FormControl, MenuItem } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 40px",
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
  },
  TextField: {
    margin: "10px"
  },
  Select: {
    margin: "10px",
    marginTop: "0px"
  },
  InputLabel: {
    margin: "10px",
    marginBottom: "0px"
  },
  PhoneInput: {
    marginLeft: "10px",
    marginTop: "10px"
  },
  showMoreButton: {
    backgroundColor: "#1a73e8",
    textTransform: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "#1a73e8",
      marginLeft: "20px"
    }
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    textTransform: 'none',
    "&:hover": {
      backgroundColor:"#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddVehicle() {
  let history = useHistory();
  const classes = useStyles();
  const vehicles = useSelector(state => state.Vehicles);
  const [vehiclesLength,] = useState(vehicles.vehicles.length);
  const dispatch = useDispatch();
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  //const [existFields,setExistFields] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [recordState, setRecordState] = useState({});




  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setRecordState({ ...recordState, [e.target.name]: e.target.value });
    setIsDisabled(false)
  };
  const handleChangeDate = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addVehicle(recordState));
  }



  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          {vehiclesLength !== vehicles.vehicles.length ? history.push(VEHICLES_ROUTE) : <div></div>}
          <Snackbar open={SnackbarState.open && (vehicles.loading || vehicles.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={vehicles.error ? "error" : "info"}>
              {vehicles.error ? vehicles.error : "Please Wait"}
            </Alert>
          </Snackbar>
          <form
            component="fieldset"
            onSubmit={(e) => addClick(e)}
            encType="multipart/form-data">

            <Grid container>
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="number"
                  value={recordState.number}
                  name="number"
                  required
                  label="Number"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="name"
                  value={recordState.name}
                  name="name"
                  required
                  label="Name"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={5}>
              <FormControl
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label"
                  className={classes.InputLabel}>Type</InputLabel>
                  <Select
                  className={classes.Select}
                    id="type"
                    required
                    defaultValue={recordState.type}
                    value={recordState.type}
                    name="type"
                    onChange={handleChange}
                    label="Type"
                  >
                    {TRANSPORT_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
              <FormControl
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label"
                  className={classes.InputLabel}>Service type</InputLabel>
                  <Select
                  className={classes.Select}
                    id="service_type"
                    defaultValue={recordState.service_type}
                    value={recordState.service_type}
                    name="service_type"
                    onChange={handleChange}
                    label="Service type"
                  >
                    {VEHICLES_SERVICE_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                  </Select>
                </FormControl>
                
              </Grid>
              <Grid item xs={12} sm={5}>
              <TextField
                  className={classes.TextField}
                  fullWidth id="start_counter"
                  value={recordState.start_counter}
                  name="start_counter"
                  required
                  label="Start counter"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
              <TextField
                  className={classes.TextField}
                  fullWidth id="model"
                  value={recordState.model}
                  name="model"
                  required
                  label="Model"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
              <TextField
                  className={classes.TextField}
                  fullWidth id="rent_cost"
                  value={recordState.rent_cost}
                  name="rent_cost"
                  required
                  disabled={!(recordState.service_type&&recordState.service_type===VEHICLES_SERVICE_TYPES[1])}
                  label="Rent cost"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    className={classes.TextField}
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Start date"
                    value={recordState.start_date}
                    onChange={(e) => handleChangeDate(e, "start_date")}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid xs={12} sm={5}/>
              <Grid xs={1}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isDisabled}
                  className={classes.saveButton}>
                  Save
                </Button>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
          </form>

        </Grid>
      </Grid>
    </div>
  );
}


export default AddVehicle;
