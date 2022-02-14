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
import { EMIRATES, CLIENT_DETAILS_ROUTE, IMAGES_CLIENTS_API_URL } from '../../constants/index';
import { editClient, initEditClient } from '../../redux/clients/Actions';
import BaseUploadImage from '../Base/BaseUploadImage';
import BaseWaiting from '../Base/BaseWaiting';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
const APIClient = require('../../redux/clients/API');
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 40px",
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
  },
  PhoneInput: {
    marginLeft: "10px",
    marginTop: "10px"
  },
  icon: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  TextField: {
    margin: "10px"
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

function EditClient() {
  let history = useHistory();
  const emirates = EMIRATES;
  const classes = useStyles();
  const clients = useSelector(state => state.Clients);
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
    const promise = APIClient.getById(id);
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
    dispatch(editClient({
      "id": pos,
      "body": recordState
    }));
  }

  const setImage = (image) => {
    setRecordState({ ...recordState, image });
    setIsDisabled(false)
  }
  const handleChangePhone = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const moveToDetails = () => {
    history.push(CLIENT_DETAILS_ROUTE + '?&id=' + recordState.id)
    dispatch(initEditClient)
  }
  return (
    <div className={classes.root}>
      {!loading ?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {clients.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (clients.loading || clients.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={clients.error ? "error" : "info"}>
                {clients.error ? clients.error : "Please Wait"}
              </Alert>
            </Snackbar>
            <form
              component="fieldset"
              onSubmit={(e) => EditClick(e)}
              encType="multipart/form-data">
              <BaseUploadImage
                IMAGES_URL={IMAGES_CLIENTS_API_URL}
                smallName={recordState.company_name}
                bigName={recordState.client_name}
                type="Edit"
                image={recordState.image}
                setImage={setImage}
                isDisabled={isDisabled}
              />
              <Divider variant="middle" />
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="company_name"
                    value={recordState.company_name}
                    name="company_name"
                    required
                    label="Company name"
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
                    fullWidth id="amount"
                    value={recordState.amount}
                    name="amount"
                    required
                    label="Amount"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="points"
                    value={recordState.points}
                    name="points"
                    required
                    label="Points"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="client_name"
                    value={recordState.client_name}
                    name="client_name"
                    required
                    label="Client name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={5}>
                  <FormControl
                    className={classes.TextField}
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Emirate</InputLabel>
                    <Select
                      id="emirate"
                      required
                      defaultValue={recordState.emirate}
                      value={recordState.emirate}
                      name="emirate"
                      onChange={handleChange}
                      label="Emirate"
                    >
                      {emirates.map(emirate => (<MenuItem value={emirate}>{emirate}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="city"
                    value={recordState.city}
                    name="city"
                    required
                    label="City"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>

                <Grid item xs={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Client phone</InputLabel>
                  <PhoneInput
                    className={classes.PhoneInput}
                    placeholder="Client phone"
                    name="client_phone"
                    defaultCountry="AE"
                    value={recordState.client_phone}
                    onChange={(e) => handleChangePhone(e, "client_phone")} />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Client phone</InputLabel>
                  <PhoneInput
                    className={classes.PhoneInput}
                    placeholder="Company phone"
                    name="company_phone"
                    defaultCountry="AE"
                    value={recordState.company_phone}
                    onChange={(e) => handleChangePhone(e, "company_phone")} />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="locationX"
                    value={recordState.locationX}
                    name="locationX"
                    required
                    label="Location X"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="locationY"
                    value={recordState.locationY}
                    name="locationY"
                    required
                    label="location Y"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="company_type"
                    value={recordState.company_type}
                    name="company_type"
                    required
                    label="Company type"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      name="contract_date"
                      margin="normal"
                      label="Contract date"
                      value={recordState.contract_date}
                      onChange={(e) => handleChangeDate(e, "contract_date")}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      name="service_start_date"
                      margin="normal"
                      label="Service start date"
                      value={recordState.service_start_date}
                      onChange={(e) => handleChangeDate(e, "service_start_date")}
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
                      className={classes.TextField}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Service end date"
                      value={recordState.service_end_date}
                      onChange={(e) => handleChangeDate(e, "service_end_date")}
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


export default EditClient;
