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
import { EMIRATES, CLIENTS_ROUTE, IMAGES_CLIENTS_API_URL } from '../../constants/index';
import { addClient } from '../../redux/clients/Actions';
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

function AddClient() {
  let history = useHistory();
  const emirates = EMIRATES;
  const classes = useStyles();
  const clients = useSelector(state => state.Clients);
  const [clientsLength,] = useState(clients.clients.length);
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
  const handleChangePhone = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addClient(recordState));
  }

  const setImage = (image) => {
    setRecordState({ ...recordState, image });
    setIsDisabled(false)
  }


  return (
    <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {clientsLength !== clients.clients.length ? history.push(CLIENTS_ROUTE) : <div></div>}
            <Snackbar open={SnackbarState.open && (clients.loading || clients.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={clients.error ? "error" : "info"}>
                {clients.error ? clients.error : "Please Wait"}
              </Alert>
            </Snackbar>
            <form
              component="fieldset"
              onSubmit={(e) => addClick(e)}
              encType="multipart/form-data">
              <BaseUploadImage
                IMAGES_URL={IMAGES_CLIENTS_API_URL}
                smallName={recordState.company_name}
                bigName={recordState.client_name}
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
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Company phone</InputLabel>
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
                      disableToolbar
                      variant="inline"
                      className={classes.TextField}
                      format="MM/dd/yyyy"
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
                      disableToolbar
                      className={classes.TextField}
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="service start date"
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
    </div>
  );
}


export default AddClient;
