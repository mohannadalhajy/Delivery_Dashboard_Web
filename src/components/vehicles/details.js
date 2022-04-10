import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
  Button
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
import EditIcon from '@material-ui/icons/Edit';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { EDIT_VEHICLE_ROUTE, TRANSPORT_TYPES, VEHICLES_ROUTE, VEHICLES_SERVICE_TYPES } from '../../constants';
const API = require('../../redux/vehicles/API');
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 8px",
    display: 'flex',
    flexGrow: 1,
  },
  labelDetails: {
    fontSize: '1em',
    fontFamily: 'Hind Guntur, sans-serif',
    color: '#054231'
  },
  card: {
    border: '1px solid #dadce0',
    borderRadius: "8px",
    marginBottom: "16px",
    maxWidth: '500px',
    padding: "20px",
    margin: "20px"
  },
  button1: {
    padding: '10px 16px',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    margin: '10px',
    fontSize: '16px',
    fontFamily: 'philosopher',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderColor: 'darkgray',
    border: '1px solid',
    "&:hover": {
      boxShadow: '0px 1px 3px 0px rgba(60,64,67,0.302),0 4px 8px 3px rgba(60,64,67,0.149)',
    }
  }
}));

function VehicleDetails() {
  const classes = useStyles();
  const [recordState, setRecordState] = useState();
  const waitText = 'Please wait'
  const [error, setError] = useState(waitText);
  const location = useLocation();
  const [expand, setExpand] = React.useState(false);
  useEffect(() => {
    var str = location.search;
    let id = new URLSearchParams(str).get("id")
    let promise;
    promise = API.getById(id);
    promise.then(res => {
      setRecordState(res.data.result);
    }).catch(
      err => {
        setRecordState(undefined)
        setError("Network failed")
      }
    );
  }, [location]);


  return <div className={classes.root}>

    {recordState !== undefined ?

      <Grid container direction="row" alignItems="stretch">
        <Grid item xs={12}>
          <div className={classes.card}>
            <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
              <Grid item xs={9} >
                Vehicle Details
              </Grid>
              <Grid item xs={3} >
                <IconButton
                  size="small"
                  onClick={() => { setExpand(!expand) }}
                >
                  {expand ?
                    <Tooltip title="Show less">
                      <ExpandLessIcon />
                    </Tooltip> :
                    <Tooltip title="Show more">
                      <ExpandMoreIcon />
                    </Tooltip>}
                </IconButton>
              </Grid>
            </Grid>

            {recordState.name ?
              <div className={classes.labelDetails}><br />Name: {recordState.name}</div>
              : <div></div>}

            {recordState.type !== undefined ?
              <div className={classes.labelDetails}><br />Type: {TRANSPORT_TYPES[recordState.type]}</div>
              : <div></div>}
            {recordState.serviceType !== undefined ?
              <div className={classes.labelDetails}><br />Service type: {VEHICLES_SERVICE_TYPES[recordState.type]}</div>
              : <div></div>}

            {recordState.number !== undefined !== null ?
              <div className={classes.labelDetails}><br />Number: {recordState.number}</div>
              : <div></div>}
            {recordState.model !== undefined ?
              <div className={classes.labelDetails}><br />Model: {recordState.model}</div>
              : <div></div>}
            {recordState.rentCost !== undefined && expand && recordState.serviceType !== undefined && recordState.serviceType !== 0?
              <div className={classes.labelDetails}><br />Rent cost: {recordState.rentCost}</div>
              : <div></div>}
            {recordState.startCounter !== null && expand ?
              <div className={classes.labelDetails}><br />Start counter: {recordState.startCounter}</div>
              : <div></div>}
            {recordState.endCounter !== null && expand ?
              <div className={classes.labelDetails}><br />End counter: {recordState.endCounter}</div>
              : <div></div>}
            {recordState.startDate && expand ?
              <div className={classes.labelDetails}><br />Start date: {recordState.startDate}</div>
              : <div></div>}
            {recordState.endDate && expand ?
              <div className={classes.labelDetails}><br />End date: {recordState.endDate}</div>
              : <div></div>}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Link style={{ color: 'inherit', textDecoration: 'inherit', marginLeft: '12px' }} to={VEHICLES_ROUTE}>
            <Button startIcon={<FactCheckIcon />} className={classes.button1}>
              Vehicles
            </Button>
          </Link>
          <Link style={{ color: 'inherit', textDecoration: 'inherit', marginLeft: '12px' }} to={EDIT_VEHICLE_ROUTE + '?' + recordState.id}>
            <Button startIcon={<EditIcon />} className={classes.button1}>
              Edit vehicle
            </Button>
          </Link>
        </Grid>
      </Grid>

      :
      <div>
        <BaseWaiting error={error} />

      </div>
    }
  </div>;
}
export default VehicleDetails;