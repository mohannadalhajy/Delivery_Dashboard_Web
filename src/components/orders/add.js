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
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ORDERS_ROUTE, ORDER_EMIRATES, ORDER_TYPES, TRANSPORT_TYPES } from '../../constants/index';
import { addOrder } from '../../redux/orders/Actions';
// import BaseWaiting from '../Base/BaseWaiting';
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

function AddOrder() {
  let history = useHistory();
  const classes = useStyles();
  const orders = useSelector(state => state.Orders);
  const [clients, setClients] = useState([]);
  const [ordersLength,] = useState(orders.orders.length);
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
  const handleChangePhone = (e, name) => {
    setRecordState({ ...recordState, [name]: e });
    setIsDisabled(false)
  };

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addOrder(recordState));
  }



  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          {ordersLength !== orders.orders.length ? history.push(ORDERS_ROUTE) : <div></div>}
          <Snackbar open={SnackbarState.open && (orders.loading || orders.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={orders.error ? "error" : "info"}>
              {orders.error ? orders.error : "Please Wait"}
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
                  fullWidth id="address"
                  value={recordState.address}
                  name="address"
                  required
                  label="Address"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
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
              <Grid item xs={5}>
              <InputLabel id="emirate-label"className={classes.PhoneInput}>Customer phone</InputLabel>
                <PhoneInput
                  className={classes.PhoneInput}
                  required
                  placeholder="Customer phone"
                  name="customer_phone"
                  defaultCountry="AE"
                  value={recordState.customer_phone}
                  onChange={(e) => handleChangePhone(e, "customer_phone")} />

              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
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
              <Grid item xs={5}>
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
              <Grid item xs={1} />
              <Grid item xs={5}>
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
              <Grid xs={5}/>
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


export default AddOrder;
