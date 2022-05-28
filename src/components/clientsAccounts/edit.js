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
import 'react-phone-number-input/style.css'
import { editClientAccount, initEditClientAccount } from '../../redux/clientsAccounts/Actions';
import { CLIENTS_ACCOUNTS_ROUTE } from '../../constants';
const APIClientAccount = require('../../redux/clientsAccounts/API');
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
      backgroundColor: "#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function EditClientAccount() {
  const [clients, setClients] = useState([]);
  let history = useHistory();
  const classes = useStyles();
  const records = useSelector(state => state.ClientsAccounts);
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
  const [isDisabled, setIsDisabled] = useState(true)
  const [recordState, setRecordState] = useState({});
  useEffect(() => {
    var str = location.search;
    var id = str.substring(1);
    const promise = APIClientAccount.getById(id);
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
    dispatch(editClientAccount({
      "id": pos,
      "body": recordState
    }));
  }
  const moveToDetails = () => {
    history.push(CLIENTS_ACCOUNTS_ROUTE)
    dispatch(initEditClientAccount)
  }
  return (
    <div className={classes.root}>
      {!loading ?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
          <Grid item xs={12}>
            {records.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (records.loading || records.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
              <Alert onClose={SnackbarClose} severity={records.error ? "error" : "info"}>
                {records.error ? records.error : "Please Wait"}
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


export default EditClientAccount;
