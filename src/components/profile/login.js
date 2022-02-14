import React, { useState, useEffect } from "react";
import {
  Input,
  Button
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { profileMe, login } from "../../redux/User/Actions";
import { connect } from "react-redux";
import { PREFIX_ROUTE } from "../../constants";
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
    textAlign: 'center',
    marginTop: '10%'
  },
  link: {
    margin: '5px',
    font: '13px',
    fontFamily: 'Tahoma Geneva, sans-serif',
    color: 'blue',
    textDecoration: 'blink'
  },
  button1: {
    backgroundImage: `url(https://kic-kw.com/assets/img/svg-mask.svg) !important`,
    
    backgroundColor:'#C2A377',
    borderColor:'#c38b3c',
    color:'#183861',
    textTransform:'none',
    padding:'19.5px 28.5px',
    borderRadius:'50px',
    backgroundSize:'100% 100%',
    fontWeight: 'bold',
    //margin:'16px 4px 0',
    lineHeight:'1',
    letterSpacing:'1.5px',
    position:'relative',
    overflow:'hidden',
      margin:'10px',
      borderWidth:'2px',
    fontSize:'16px',
    fontFamily:'philosopher',
    textAlign:'center',
    whiteSpace:'nowrap',
    border:'1px solid transparent',
    
    "&:hover": {
      borderColor:'#183861',
      backgroundColor:'#183861',
      color:'#C2A377',
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login({ user_store, login }) {
  let history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    user_name: "",
    password: "",
  });
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });

  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
      }
    })();
  }, [history]);

  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setFormState({ ...FormState, [e.target.name]: e.target.value });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarState({ ...SnackbarState, open: true, message: "" })
    login(FormState)

  };

  return (
    <div>
      {user_store.user.user_name !== undefined && !user_store.loading ? history.push(PREFIX_ROUTE) :
        <React.Fragment>
          <Snackbar open={SnackbarState.open && (user_store.loading || user_store.error)} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={user_store.error || SnackbarState.message ? "error" : "info"}>
              {SnackbarState.message ? SnackbarState.message : user_store.error ? user_store.error : "Please wait"}
            </Alert>
          </Snackbar>
          <div className={classes.signin}>
            <div className="form-container" >
              <br></br>
              <h2 style={{ color: '#000' }}>Login</h2>
              <form
                component="fieldset"
                dir="rtl" onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data">
                <InputLabel>User name</InputLabel>
                <Input
                  id="user_name"
                  value={FormState.user_name}
                  name="user_name"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <br />

                <InputLabel>Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.password}
                  name="password"
                  required
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  } />
                <br />
                <br />
                <Button type="submit" variant="contained" className={classes.button1}>Login</Button>
              </form>
            </div>
          </div>
        </React.Fragment>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user_store: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => {
      dispatch(login(body))
    },
    getProfile: () => {
      dispatch(profileMe());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);