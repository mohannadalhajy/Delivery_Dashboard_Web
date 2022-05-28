import React from 'react';
import {
  makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  
    card:{
        border:'1px solid #dadce0',
        borderRadius:"8px",
        marginBottom:"16px",
        maxWidth:'500px',
        padding:"20px",
        margin:"20px"
    },
    labelProfile:{
        fontSize:'2em',
        fontWeight:'bold',
        fontFamily:'Hind Guntur, sans-serif',
        color:'#054231'
    },
}));

function BaseWaiting({error}) {
  const classes = useStyles();



  return (
    <div className={classes.card}>
        <div className={classes.labelProfile}>
            {error?error:"Please wait"}
        </div>
    </div>
  );
}


export default BaseWaiting;