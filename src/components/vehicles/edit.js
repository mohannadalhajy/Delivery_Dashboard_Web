import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BaseWaiting from '../Base/BaseWaiting';
import DateFnsUtils from '@date-io/date-fns';
import 'react-phone-number-input/style.css'
import { editVehicle, initEditVehicle } from '../../redux/vehicles/Actions';
import { TRANSPORT_TYPES, VEHICLES_SERVICE_TYPES, VEHICLE_DETAILS_ROUTE } from '../../constants';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const API = require('../../redux/vehicles/API');
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
  Select: {
    margin: "10px",
    marginTop: "0px"
  },
  InputLabel: {
    margin: "10px",
    marginBottom: "0px"
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

function EditVehicle() {
  let history = useHistory();
  const classes = useStyles();
  const vehicles = useSelector(state => state.Vehicles);
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState('Please wait');
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [loading, setLoading] = useState(true)
  //const [existFields,setExistFields] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [recordState, setRecordState] = useState({});

  useEffect(() => {
    var str = location.search;
    var id = str.substring(1);
    const promise = API.getById(id);
    promise.then(res => {
      setRecordState(res.data.result)
      setLoading(false)
    }).catch(
      err => {
        setError(err)
      }
    );
    
  }, [location, loading]);


  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setRecordState({ ...recordState, [e.target.name]: e.target.value });
    setIsDisabled(false)
  };
  const EditClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    var str = location.search;
    var pos = str.substring(1);
    dispatch(editVehicle({
      "id": pos,
      "body": recordState
    }));
  }


  const handleChangeDate = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };
  const moveToDetails = () => {
    history.push(VEHICLE_DETAILS_ROUTE + '?&id=' + recordState.id)
    dispatch(initEditVehicle)
  }
  return (
    <div className={classes.root}>
      {!loading ?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {vehicles.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (vehicles.loading || vehicles.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={vehicles.error ? "error" : "info"}>
                {vehicles.error ? vehicles.error : "Please Wait"}
              </Alert>
            </Snackbar>
            <form
              component="fieldset"
              onSubmit={(e) => EditClick(e)}
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
                  fullWidth id="end_counter"
                  value={recordState.end_counter}
                  name="end_counter"
                  label="End counter"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
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
              <Grid item xs={1} />
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
              <Grid item xs={1} />

              <Grid item xs={12} sm={5}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    className={classes.TextField}
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="End date"
                    value={recordState.end_date}
                    onChange={(e) => handleChangeDate(e, "end_date")}
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
        :
        <BaseWaiting error={error} />
      }
    </div>
  );
}


export default EditVehicle;
