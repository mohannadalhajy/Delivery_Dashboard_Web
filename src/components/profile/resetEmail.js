import React, { useState } from "react";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { editEmail, initEditProfile } from "../../Redux/Profile/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import EmailTextValidator from '../Base/EmailTextValidator';
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../constants";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signin: {
    background: 'rgba(44,62,80,0.3)',
    borderRadius: '20px',
    padding: '40px',
    width: '250px',
    margin: 'auto',
    marginTop: '90px',
    marginLeft: '180x',
    textAlign: 'center'

  },
  link: {
    margin: '5px',
    font: '13px',
    fontFamily: 'Tahoma Geneva, sans-serif',
    color: 'blue',
    textDecoration: 'blink'
  },
  button: {
    backgroundColor: "#1a73e8",
    color: "white",
    textTransform: 'none',
    margin: '5px',
    "&:hover": {
      backgroundColor: "#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ResetEmail() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const user_store = useSelector(state => state.User)
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleEdit = async (e) => {
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(editEmail({ oldPassword: password, newEmail: email }))
  }

  const moveToProfile = () => {
    history.push(PROFILE_ROUTE)
    dispatch(initEditProfile)
}
  return (
    <div>
      <Snackbar open={SnackbarState.open && (user_store.loading || user_store.error)} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
        <Alert onClose={SnackbarClose} severity={user_store.error ? "error" : "info"}>
        {user_store.error ? user_store.error :"Please wait"}
        </Alert>
      </Snackbar>
      {!user_store.user.email && !user_store.loading ?history.push(LOGIN_ROUTE):
        <div className={classes.signin} >
          {user_store.error==="edited"?moveToProfile():<React.Fragment />}
          <br></br>
          <h2 style={{ color: '#000' }}>Reset Email</h2>
          <ValidatorForm
            component="fieldset"
            dir="rtl" onSubmit={(e) => handleEdit(e)}
            enctype="multipart/form-data">
            <EmailTextValidator
              required={true}
              name="email"
              value={email}
              label="Email"
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <br />
            <br />
            <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              name="oldPassword"
              onChange={(e) => { setPassword(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle Password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              } />

            <br />
            <br />
            <Button
              variant="contained"
              className={classes.button}
              type="submit" >Change Email</Button>
          </ValidatorForm>
        </div>
      }
    </div>
  );
}



export default ResetEmail;