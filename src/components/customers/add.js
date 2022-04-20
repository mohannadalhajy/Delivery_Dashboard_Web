import React, { useEffect, useState } from 'react';
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
import { EMIRATES, CUSTOMERS_ROUTE, IMAGES_CUSTOMERS_API_URL } from '../../constants/index';
import { addCustomer } from '../../redux/customers/Actions';
import BaseUploadImage from '../Base/BaseUploadImage';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
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

function AddCustomer() {
  let history = useHistory();
  const emirates = EMIRATES;
  const classes = useStyles();
  const customers = useSelector(state => state.Customers);
  const [customersLength,] = useState(customers.customers.length);
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
  const [clients, setClients] = useState([]);



  useEffect(() => {
    const promise = APIClient.getCompaniesNames();

    promise.then((response) => {
      setClients(response.data.result.result)
    }).catch((error) => {
    });
  }, [])


  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setRecordState({ ...recordState, [e.target.name]: e.target.value });
    setIsDisabled(false)
  };
  const handleChangePhone = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addCustomer(recordState));
  }

  const setImage = (image) => {
    setRecordState({ ...recordState, image });
    setIsDisabled(false)
  }


  // clientId: DataTypes.INTEGER,
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          {customersLength !== customers.customers.length ? history.push(CUSTOMERS_ROUTE) : <div></div>}
          <Snackbar open={SnackbarState.open && (customers.loading || customers.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={customers.error ? "error" : "info"}>
              {customers.error ? customers.error : "Please Wait"}
            </Alert>
          </Snackbar>
          <form
            component="fieldset"
            onSubmit={(e) => addClick(e)}
            encType="multipart/form-data">
            <BaseUploadImage
              IMAGES_URL={IMAGES_CUSTOMERS_API_URL}
              smallName={recordState.nameEnglish}
              bigName={recordState.addressEnglish}
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
                  fullWidth id="nameEnglish"
                  value={recordState.nameEnglish}
                  name="nameEnglish"
                  required
                  label="Name english"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={0} sm={1} />
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="nameArabic"
                  value={recordState.nameArabic}
                  name="nameArabic"
                  required
                  label="Name arabic"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>

              <Grid item xs={1} />
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
                <FormControl
                  className={classes.TextField}
                  required
                  variant="standard" fullWidth>
                  <InputLabel id="emirate-label">Company name</InputLabel>
                  <Select
                    id="clientId"
                    required
                    value={recordState.clientId}
                    name="clientId"
                    onChange={handleChange}
                    label="Client name">
                    {clients.map(client => (<MenuItem value={client.id}>{client.companyNameEnglish}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>


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
                <TextField
                  className={classes.TextField}
                  fullWidth id="location"
                  value={recordState.location}
                  name="location"
                  required
                  label="Location"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={5}>
                <InputLabel id="emirate-label" className={classes.PhoneInput}>Phone</InputLabel>
                <PhoneInput
                  className={classes.PhoneInput}
                  placeholder="Phone"
                  name="phone"
                  defaultCountry="AE"
                  value={recordState.phone}
                  onChange={(e) => handleChangePhone(e, "phone")} />
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
export default AddCustomer;