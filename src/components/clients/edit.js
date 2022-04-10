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
                smallName={recordState.companyNameEnglish}
                bigName={recordState.clientNameEnglish}
                type="Edit"
                image={recordState.image}
                setImage={setImage}
                isDisabled={isDisabled}
              />
              <Divider variant="middle" />
              <Grid container>
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="companyNameEnglish"
                    value={recordState.companyNameEnglish}
                    name="companyNameEnglish"
                    required
                    label="Company name english"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={0} sm={1}/>
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="companyNameArabic"
                    value={recordState.companyNameArabic}
                    name="companyNameArabic"
                    required
                    label="Company name arabic"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
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
                <Grid item xs={0} sm={1}/>

                <Grid item xs={12} sm={5}>
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
                      {emirates.map((emirate, index) => (<MenuItem value={index}>{emirate}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="clientNameEnglish"
                    value={recordState.clientNameEnglish}
                    name="clientNameEnglish"
                    required
                    label="Client name english"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={0} sm={1}/>

                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="clientNameArabic"
                    value={recordState.clientNameArabic}
                    name="clientNameArabic"
                    required
                    label="Client name arabic"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                
                <Grid item xs={1} />
                
                
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="addressEnglish"
                    value={recordState.addressEnglish}
                    name="addressEnglish"
                    required
                    label="Address english"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="addressArabic"
                    value={recordState.addressArabic}
                    name="addressArabic"
                    required
                    label="Address arabic"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Client phone</InputLabel>
                  <PhoneInput
                  className={classes.PhoneInput}
                    placeholder="Client phone"
                    name="clientPhone"
                    defaultCountry="AE"
                    value={recordState.clientPhone}
                    onChange={(e) => handleChangePhone(e, "clientPhone")} />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Company phone</InputLabel>
                  <PhoneInput
                  className={classes.PhoneInput}
                    placeholder="Company phone"
                    name="companyPhone"
                    defaultCountry="AE"
                    value={recordState.companyPhone}
                    onChange={(e) => handleChangePhone(e, "companyPhone")} />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="latitude"
                    value={recordState.latitude}
                    name="latitude"
                    required
                    label="latitude"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="longitude"
                    value={recordState.longitude}
                    name="longitude"
                    required
                    label="longitude"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>

                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="companyTypeEnglish"
                    value={recordState.companyTypeEnglish}
                    name="companyTypeEnglish"
                    required
                    label="Company type english"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="companyTypeArabic"
                    value={recordState.companyTypeArabic}
                    name="companyTypeArabic"
                    required
                    label="Company type arabic"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
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
                      label="Service start date"
                      value={recordState.serviceStartDate}
                      onChange={(e) => handleChangeDate(e, "serviceStartDate")}
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
                      className={classes.TextField}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Service end date"
                      value={recordState.serviceEndDate}
                      onChange={(e) => handleChangeDate(e, "serviceEndDate")}
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
                      label="Contract date"
                      value={recordState.contractDate}
                      onChange={(e) => handleChangeDate(e, "contractDate")}
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
