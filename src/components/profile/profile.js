import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE, PREFIX, RESET_EMAIL_ROUTE, RESET_PASSWORD_ROUTE } from '../../constants';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh',
        '& > *': {
            marginTop: theme.spacing(2),
        },    
        flexGrow: 1,
    },
    card: {
      padding:"25px",
      //marginTop:"0px",
      maxWidth:'500px',
      borderRadius:'25px',
      backgroundColor:'#ced2d8',
      textAlign:'center'
    },
    imgProfile:{
      width:'200px',
      height:'200px',
      margin:'10px 20px',
      borderRadius:'100px',
    },
    labelProfile:{
      fontSize:'2em',
      fontWeight:'bold',
      fontFamily:'Hind Guntur, sans-serif',
      color:'#054231'
    },
    labelDetails:{
      fontSize:'1em',
      fontFamily:'Hind Guntur, sans-serif',
      color:'#054231'
    },
    modal:{
        borderRadius:'100px',
    },
    hideText:{
        color:'white',
        border:'0px',
        height:'0.5px',
        width:'0.5px',
        margin:'0px',
        padding:'0px'
    },
    button: {
        backgroundColor: "#1a73e8",
        color: "white",
        textTransform: 'none',
        margin:'5px',
        "&:hover": {
          backgroundColor:"#1a73e8",
        }
      },
      
}));

const Profile=()=> {
    const user = useSelector(state => state.User);
    const classes = useStyles();
    let history = useHistory();
    return (<div  className={classes.root}>
        {!user.user.userName && !user.loading?history.push(LOGIN_ROUTE):
        <div>
        <div className={classes.card}>
        <div className={classes.labelProfile}>Profile</div>
                <div className={classes.labelDetails}><br />{user.user.userName}</div>
        </div>
        <div>
            {/* <Button
                size="small"
                variant="contained"
                className={classes.button}
                onClick={()=>{history.push(RESET_EMAIL_ROUTE);}}
                >Edit user name</Button> */}
            <Button
                variant="contained"
                className={classes.button}
                size="small"
                onClick={()=>{history.push(RESET_PASSWORD_ROUTE);}}
                >Edit Password</Button>
        </div>
        </div>
        }
        </div>);
    }
export default Profile;
