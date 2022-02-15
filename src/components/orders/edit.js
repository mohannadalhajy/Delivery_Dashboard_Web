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
import { ORDER_DETAILS_ROUTE, ORDER_EMIRATES, ORDER_STATUS_TYPES, ORDER_TYPES, TRANSPORT_TYPES } from '../../constants/index';
import { editOrder, initEditOrder } from '../../redux/orders/Actions';
import BaseWaiting from '../Base/BaseWaiting';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const APIOrder = require('../../redux/orders/API');
const APIClient = require('../../redux/clients/API');
const APIDriver = require('../../redux/drivers/API');
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

function EditOrder() {
  const [clients, setClients] = useState([]);
  let history = useHistory();
  const classes = useStyles();
  const orders = useSelector(state => state.Orders);
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState('Please wait');
  const [drivers, setDrivers] = useState([])
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
    const promise = APIOrder.getById(id);
    promise.then(res => {
      setRecordState(res.data.result)
      setLoading(false)
    }).catch(
      err => {
        setError(err)
      }
    );
    const promise1 = APIClient.getCompaniesNames();

    promise1.then((response) => {
      setClients(response.data.result.result)
    })
    promise.catch((error) => {
    });
    const promiseDrivers = APIDriver.getFreeNames()
    promiseDrivers.then((response) => {
      setDrivers(response.data.result.result)
    }).catch((error) => {
      setDrivers([])
      console.log("error: ", error)
    });
  }, [location, loading]);


  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setRecordState({ ...recordState, [e.target.name]: e.target.value });
    setIsDisabled(false)
  };
  const handleChangeType = (e) => {
    const type = e.target.value
    setRecordState({ ...recordState, [e.target.name]: e.target.value, emirate: type === ORDER_TYPES[0] || type === ORDER_TYPES[2] ? ORDER_EMIRATES[0] : ORDER_EMIRATES[1] });
    //setRecordState({ ...recordState, emirate: ORDER_EMIRATES[0] });
    setIsDisabled(false)
  };
  const handleChangeEmirate = (e) => {
    const emirate = e.target.value
    setRecordState({ ...recordState, [e.target.name]: e.target.value, transport_type: emirate === ORDER_EMIRATES[2] ? TRANSPORT_TYPES[1] : TRANSPORT_TYPES[0] });
    //setRecordState({ ...recordState, emirate: ORDER_EMIRATES[0] });
    setIsDisabled(false)
  };
  const EditClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    var str = location.search;
    var pos = str.substring(1);
    dispatch(editOrder({
      "id": pos,
      "body": recordState
    }));
  }

  const handleChangePhone = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const moveToDetails = () => {
    history.push(ORDER_DETAILS_ROUTE + '?&id=' + recordState.id)
    dispatch(initEditOrder)
  }
  return (
    <div className={classes.root}>
      {!loading ?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {orders.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (orders.loading || orders.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={orders.error ? "error" : "info"}>
                {orders.error ? orders.error : "Please Wait"}
              </Alert>
            </Snackbar>
            <form
              component="fieldset"
              onSubmit={(e) => EditClick(e)}
              encType="multipart/form-data">

              <Grid container>
                <Grid item xs={12} sm={5}>
                  <FormControl
                    className={classes.TextField}
                    required
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Company name</InputLabel>
                    <Select
                      id="client_id"
                      required
                      value={recordState.client_id}
                      name="client_id"
                      onChange={handleChange}
                      label="Client name">
                      {clients.map(client => (<MenuItem value={client.id}>{client.company_name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="customer_name"
                    value={recordState.customer_name}
                    name="customer_name"
                    required
                    label="Customer Name"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>

                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  <InputLabel id="emirate-label" className={classes.PhoneInput}>Customer phone</InputLabel>
                  <PhoneInput
                    className={classes.PhoneInput}
                    required
                    placeholder="Customer phone"
                    name="customer_phone"
                    defaultCountry="AE"
                    value={recordState.customer_phone}
                    onChange={(e) => handleChangePhone(e, "customer_phone")} />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControl
                    className={classes.TextField}
                    variant="standard" fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      id="type"
                      required
                      value={recordState.type}
                      name="type"
                      onChange={handleChangeType}
                      label="Type">
                      {ORDER_TYPES.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={5}>
                  {recordState.emirate && recordState.emirate !== ORDER_EMIRATES[2] ? <FormControl
                    className={classes.TextField}
                    variant="standard" fullWidth>
                    <InputLabel id="transport_type-label">Transport Type</InputLabel>
                    <Select
                      id="transport_type"
                      required
                      name="transport_type"
                      value={recordState.transport_type}
                      labelId={recordState.transport_type}
                      onChange={handleChange}
                      label="Transport Type">
                      {TRANSPORT_TYPES.map(transport => (<MenuItem value={transport} labelId={transport}>{transport}</MenuItem>))}
                    </Select>
                  </FormControl> : <React.Fragment />}
                </Grid>
                <Grid item xs={12} sm={5}>
                  {recordState.type && recordState.type !== ORDER_TYPES[0] ? <FormControl
                    className={classes.TextField}
                    variant="standard" fullWidth>
                    <InputLabel id="emirate-label">Emirate</InputLabel>
                    <Select
                      id="emirate"
                      required
                      name="emirate"
                      defaultChecked={recordState.emirate}
                      value={recordState.emirate}
                      labelId={recordState.emirate}
                      onChange={handleChangeEmirate}
                      label="Emirate">
                      {ORDER_EMIRATES.filter(emirate => recordState.type && ((recordState.type === ORDER_TYPES[1] && !(emirate === ORDER_EMIRATES[0] || emirate === ORDER_EMIRATES[2])) || (recordState.type === ORDER_TYPES[0] && emirate === ORDER_EMIRATES[0]) || recordState.type === ORDER_TYPES[2]))
                        .map(emirate => (<MenuItem value={emirate} labelId={emirate}>{emirate}</MenuItem>))}
                    </Select>
                  </FormControl> : <React.Fragment />}
                </Grid>
                <Grid xs={1} />
                <Grid item xs={12} sm={5}>
                  <FormControl
                    className={classes.TextField}
                    variant="standard" fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      id="status"
                      required
                      name="status"
                      defaultChecked={recordState.status}
                      value={recordState.status}
                      labelId={recordState.status}
                      onChange={handleChange}
                      label="Status">
                      {ORDER_STATUS_TYPES.map(type => (<MenuItem value={type} labelId={type}>{type}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={classes.TextField}
                    fullWidth id="points"
                    value={recordState.points}
                    name="points"
                    required
                    label="points"
                    onChange={(e) => handleChange(e)}>
                  </TextField>
                </Grid>
                <Grid xs={12} />
                <Grid xs={12} sm={5} />
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


export default EditOrder;
