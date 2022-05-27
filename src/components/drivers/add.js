import React, { useState } from 'react';
import {
  Grid,
  Divider,
  makeStyles,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DRIVERS_ROUTE, VISA_TYPES, SHIFT_TYPES, TRANSPORT_TYPES, IMAGES_DRIVERS_API_URL } from '../../constants/index';
import { addDriver } from '../../redux/drivers/Actions';
import BaseUploadImage from '../Base/BaseUploadImage';
// import BaseWaiting from '../Base/BaseWaiting';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddDriver() {
  let history = useHistory();
  const classes = useStyles();
  const drivers = useSelector(state => state.Drivers);
  const [driversLength,] = useState(drivers.drivers.length);
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
  const [recordState, setRecordState] = useState({

  });



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
  const handleChangePhone = (e) => {
    setRecordState({ ...recordState, phone: e });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addDriver(recordState));
  }

  const setImage = (image) => {
    setRecordState({ ...recordState, image });
    setIsDisabled(false)
  }


  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          {driversLength !== drivers.drivers.length ? history.push(DRIVERS_ROUTE) : <div></div>}
          <Snackbar open={SnackbarState.open && (drivers.loading || drivers.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={drivers.error ? "error" : "info"}>
              {drivers.error ? drivers.error : "Please Wait"}
            </Alert>
          </Snackbar>
          <form
            component="fieldset"
            onSubmit={(e) => addClick(e)}
            encType="multipart/form-data">
            <BaseUploadImage
              IMAGES_URL={IMAGES_DRIVERS_API_URL}
              smallName={recordState.status&&recordState.transportType?recordState.transportType + "-" +  recordState.status : ""}
              bigName={recordState.firstName&&recordState.lastName ? recordState.firstName + (recordState.middleName?" "+recordState.middleName+" ":" ") +  recordState.lastName : ""}
              type="Add"
              image={recordState.image}
              setImage={setImage}
              isDisabled={isDisabled}
            />
            <Divider variant="middle" />
            <Grid container>
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="firstName"
                  value={recordState.firstName}
                  name="firstName"
                  required
                  label="First name"
                  onChange={(e) => handleChange(e)}/>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="middleName"
                  value={recordState.middleName}
                  name="middleName"
                  required
                  label="Middle name"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="lastName"
                  value={recordState.lastName}
                  name="lastName"
                  required
                  label="Last name"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="nickName"
                  value={recordState.nickName}
                  name="nickName"
                  required
                  label="Nick name"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="userName"
                  value={recordState.userName}
                  name="userName"
                  required
                  label="userName"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="password"
                  value={recordState.password}
                  name="password"
                  required
                  label="Password"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="civilId"
                  value={recordState.civilId}
                  name="civilId"
                  required
                  label="Civil id"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="address"
                  value={recordState.address}
                  name="address"
                  required
                  label="Address"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="workHours"
                  value={recordState.workHours}
                  name="workHours"
                  required
                  label="Work hours"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="salary"
                  value={recordState.salary}
                  name="salary"
                  required
                  label="Salary"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="notes"
                  value={recordState.notes}
                  name="notes"
                  label="Notes"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="experienceYears"
                  value={recordState.experienceYears}
                  name="experienceYears"
                  required
                  label="Experience years"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Phone number</InputLabel>
                <PhoneInput
                  className={classes.PhoneInput}
                  placeholder="Phone"
                  name="phone"
                  defaultCountry="AE"
                  required
                  value={recordState.phone}
                  onChange={(e) => handleChangePhone(e)} />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Visa type</InputLabel>
                  <Select
                    id="visaType"
                    defaultValue={recordState.visaType}
                    value={recordState.visaType}
                    name="visaType"
                    onChange={handleChange}
                    label="Visa type"
                  >
                    {VISA_TYPES.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Shift type</InputLabel>
                  <Select
                    id="shiftType"
                    required
                    defaultValue={recordState.shiftType}
                    value={recordState.shiftType}
                    name="shiftType"
                    onChange={handleChange}
                    label="Shift type"
                  >
                    {SHIFT_TYPES.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Transport type</InputLabel>
                  <Select
                    id="transportType"
                    required
                    defaultValue={recordState.transportType}
                    value={recordState.transportType}
                    name="transportType"
                    onChange={handleChange}
                    label="Transport type"
                  >
                    {TRANSPORT_TYPES.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
                  </Select>
                </FormControl>
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
                    label="Birthdate"
                    value={recordState.birthdate}
                    onChange={(e) => handleChangeDate(e, "birthdate")}
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
                    className={classes.TextField}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Start date"
                    value={recordState.startDate}
                    onChange={(e) => handleChangeDate(e, "startDate")}
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
                    value={recordState.endDate}
                    onChange={(e) => handleChangeDate(e, "endDate")}
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
                    className={classes.TextField}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Visa expiry date"
                    value={recordState.visaExpiryDate}
                    onChange={(e) => handleChangeDate(e, "visaExpiryDate")}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid xs={12}>
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


export default AddDriver;
