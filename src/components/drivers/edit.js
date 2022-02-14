import React, { useState, useEffect } from 'react';
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
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DRIVER_DETAILS_ROUTE, IMAGES_DRIVERS_API_URL, VISA_TYPES, DRIVER_STATUS, SHIFT_TYPES, TRANSPORT_TYPES } from '../../constants/index';
import { editDriver, initEditDriver } from '../../redux/drivers/Actions';
import BaseUploadImage from '../Base/BaseUploadImage';
import BaseWaiting from '../Base/BaseWaiting';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const API = require('../../redux/drivers/API');
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

function EditDriver() {
  let history = useHistory();
  const classes = useStyles();
  const drivers = useSelector(state => state.Drivers);
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
  const handleChangeDate = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const EditClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    var str = location.search;
    var pos = str.substring(1);
    dispatch(editDriver({
      "id": pos,
      "body": recordState
    }));
  }

  const setImage = (image) => {
    setRecordState({ ...recordState, image });
    setIsDisabled(false)
  }
  const handleChangePhone = (e) => {
    setRecordState({ ...recordState, phone: e });
    setIsDisabled(false)
  };

  const moveToDetails = () => {
    history.push(DRIVER_DETAILS_ROUTE + '?&id=' + recordState.id)
    dispatch(initEditDriver)
  }
  return (
    <div className={classes.root}>
      {!loading ?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {drivers.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (drivers.loading || drivers.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={drivers.error ? "error" : "info"}>
                {drivers.error ? drivers.error : "Please Wait"}
              </Alert>
            </Snackbar>
            <form
              component="fieldset"
              onSubmit={(e) => EditClick(e)}
              encType="multipart/form-data">
              <BaseUploadImage
                IMAGES_URL={IMAGES_DRIVERS_API_URL}
                smallName={recordState.status && recordState.transport_type ? recordState.transport_type + "-" + recordState.status : ""}
                bigName={recordState.first_name && recordState.last_name ? recordState.first_name + " " + recordState.last_name : ""}
                type="Add"
                image={recordState.image}
                setImage={setImage}
                isDisabled={isDisabled}
              />
              <Divider variant="middle" />
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="first_name"
                    value={recordState.first_name}
                    name="first_name"
                    required
                    label="First name"
                    onChange={(e) => handleChange(e)} />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="middle_name"
                    value={recordState.middle_name}
                    name="middle_name"
                    required
                    label="Middle name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="last_name"
                    value={recordState.last_name}
                    name="last_name"
                    required
                    label="Last name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="nick_name"
                    value={recordState.nick_name}
                    name="nick_name"
                    required
                    label="Nick name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="user_name"
                    value={recordState.user_name}
                    name="user_name"
                    required
                    label="user_name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />

                <Grid item xs={5}>
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
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="civil_id"
                    value={recordState.civil_id}
                    name="civil_id"
                    required
                    label="Civil id"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />

                <Grid item xs={5}>
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

                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="work_hours"
                    value={recordState.work_hours}
                    name="work_hours"
                    required
                    label="Work hours"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
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
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="experience_years"
                    value={recordState.experience_years}
                    name="experience_years"
                    required
                    label="Experience years"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                  <FormControl
                    className={classes.TextField}
                    required
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Visa type</InputLabel>
                    <Select
                      id="visa_type"
                      defaultValue={recordState.visa_type}
                      value={recordState.visa_type}
                      name="visa_type"
                      onChange={handleChange}
                      label="Visa type"
                    >
                      {VISA_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl
                    className={classes.TextField}
                    required
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Status</InputLabel>
                    <Select
                      id="status"
                      required
                      defaultValue={recordState.status}
                      value={recordState.status}
                      name="status"
                      onChange={handleChange}
                      label="Status"
                    >
                      {DRIVER_STATUS.map(status => (<MenuItem value={status}>{status}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <FormControl
                    className={classes.TextField}
                    required
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Shift type</InputLabel>
                    <Select
                      id="shift_type"
                      required
                      defaultValue={recordState.shift_type}
                      value={recordState.shift_type}
                      name="shift_type"
                      onChange={handleChange}
                      label="Shift type"
                    >
                      {SHIFT_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl
                    className={classes.TextField}
                    required
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Transport type</InputLabel>
                    <Select
                      id="transport_type"
                      required
                      defaultValue={recordState.transport_type}
                      value={recordState.transport_type}
                      name="transport_type"
                      onChange={handleChange}
                      label="Transport type"
                    >
                      {TRANSPORT_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      className={classes.TextField}
                      variant="inline"
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
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      className={classes.TextField}
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Visa expiry date"
                      value={recordState.visa_expiry_date}
                      onChange={(e) => handleChangeDate(e, "visa_expiry_date")}
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
        :
        <BaseWaiting error={error} />
      }
    </div>
  );
}


export default EditDriver;
