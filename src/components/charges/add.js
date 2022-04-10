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
import { addCharge } from '../../redux/charges/Actions';
import { CHARGES_ROUTE } from '../../constants';
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

function AddCharge() {
  let history = useHistory();
  const classes = useStyles();
  const records = useSelector(state => state.Charges);
  const [clients, setClients] = useState([]);
  const [recordsLength,] = useState(records.records.length);
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
    const promise1 = APIClient.getCompaniesNames();
    promise1.then((response) => {
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

  const addClick = (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addCharge(recordState));
  }



  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
          {recordsLength !== records.records.length ? history.push(CHARGES_ROUTE) : <div></div>}
          <Snackbar open={SnackbarState.open && (records.loading || records.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={records.error ? "error" : "info"}>
              {records.error ? records.error : "Please Wait"}
            </Alert>
          </Snackbar>
          <form
            component="fieldset"
            onSubmit={(e) => addClick(e)}
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
              <Grid item xs={12} sm={5}>
                <TextField
                  className={classes.TextField}
                  fullWidth id="points"
                  value={recordState.address}
                  name="points"
                  required
                  label="Points"
                  onChange={(e) => handleChange(e)}>
                </TextField>
              </Grid>
              <Grid item xs={1} />
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
    </div>
  );
}


export default AddCharge;
