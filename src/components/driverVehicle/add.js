import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
// import BaseWaiting from '../Base/BaseWaiting';
import 'react-phone-number-input/style.css'

import getErrorMessage from '../../Errors';

const APIDriver = require('../../redux/drivers/API');
const APIVehicle = require('../../redux/vehicles/API');
const APIDriver_Vehicle = require('../../redux/driverVehicle/API');
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
      backgroundColor: "#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddDriverVehicle() {
  let history = useHistory();
  const classes = useStyles();
  const [drivers, setDrivers] = useState(false)
  const [vehicles, setVehicles] = useState(false)
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "info",
    message: "Please wait",
  });
  //const [existFields,setExistFields] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [recordState, setRecordState] = useState({});

  useEffect(() => {
    const promiseDrivers = APIDriver.getFreeNames()
    promiseDrivers.then((response) => {
      setDrivers(response.data.result.result)
    }).catch((error) => {
      console.log("error: ", error)
    });
    const promiseVehicles = APIVehicle.getFreeNumbers()
    promiseVehicles.then((response) => {
      setVehicles(response.data.result.result)
    }).catch((error) => {
      setDrivers([])
      setVehicles([])
      console.log("error: ", error)
    });
  }, [])

  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setRecordState({ ...recordState, [e.target.name]: e.target.value });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true,severity: "info", message: "Please wait" })
    const promise = APIDriver_Vehicle.add(recordState)
    promise.then(res => {
      setSnackbarState({ ...SnackbarState, open: false })
      history.goBack();
    }).catch(error => {
      let errorMsg = "error"
      if (error.response)
        errorMsg = getErrorMessage(error.response.data.error.message.arrayError[0].code);
      setSnackbarState({ ...SnackbarState, open: true, severity: "error", message: errorMsg })
    })
  }


//!drivers||!vehicles?<div>Please wait...<div/>:
  return (
    <div className={classes.root}>
      {!drivers||!vehicles?<div>Please wait...</div>:drivers.length<=0?<div>There is not free drivers</div>:vehicles.length<=0?<div>There is not free vehicles</div>:<Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          <Snackbar open={SnackbarState.open} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={SnackbarState.severity}>
              {SnackbarState.message}
            </Alert>
          </Snackbar>
          <form
            component="fieldset"
            onSubmit={(e) => addClick(e)}
            encType="multipart/form-data">

            <Grid container>
              <Grid item xs={5}>
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Driver name</InputLabel>
                  <Select
                    id="driver_id"
                    required
                    value={recordState.driver_id}
                    name="driver_id"
                    onChange={handleChange}
                    label="Driver name">
                    {drivers.map(driver => (<MenuItem value={driver.id}>{driver.first_name + " " + driver.middle_name + " " + driver.last_name + " " + driver.nick_name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Vehicle number</InputLabel>
                  <Select
                    id="vehicle_id"
                    required
                    value={recordState.driver_id}
                    name="vehicle_id"
                    onChange={handleChange}
                    label="Vehicle name">
                    {vehicles.map(vehicle => (<MenuItem value={vehicle.id}>{vehicle.number}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={1} />
              

              <Grid xs={5} />
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
      </Grid>}
    </div>
  );
}


export default AddDriverVehicle;
