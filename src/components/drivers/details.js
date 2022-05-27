import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Divider,
  Grid,
  makeStyles,
  IconButton,
  Tooltip
} from '@material-ui/core';
import BaseDisplayImage from '../Base/BaseDisplayImage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
import { deleteDriver } from '../../redux/drivers/Actions';
const { IMAGES_DRIVERS_API_URL, EDIT_DRIVER_ROUTE, DRIVERS_ROUTE, VISA_TYPES, TRANSPORT_TYPES, SHIFT_TYPES, DRIVER_STATUS } = require('../../constants/index');
const API = require('../../redux/drivers/API');
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
  }
}));

function DriverDetails() {
  const classes = useStyles();
  const [recordState, setRecordState] = useState();
  const waitText = 'Please wait'
  const [error, setError] = useState(waitText);
  const [srcImage, setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.webp');
  const location = useLocation();
  const [expand, setExpand] = React.useState(false);
  const [id, setId] = React.useState(false);
  useEffect(() => {
    var str = location.search;
    let id = new URLSearchParams(str).get("id")
    setId(id);
    let promise;
    promise = API.getById(id);
    promise.then(res => {
      setRecordState(res.data.result);
      if (res.data.result.image) setSrcImage(IMAGES_DRIVERS_API_URL + '/' + res.data.result.image);
    }).catch(
      err => {
        setRecordState(undefined)
        setError("Network failed")
      }
    );
  }, [location]);


  return <div className={classes.root}>

    {recordState !== undefined ?

      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <div>
            <BaseDisplayImage
              srcImage={srcImage}
              Id={id}
              bigName={recordState.firstName && recordState.lastName ? recordState.firstName + " " + recordState.lastName : ""}
              smallName={recordState.status && recordState.transportType ? recordState.transportType + "-" + recordState.status : ""}
              editRoute={EDIT_DRIVER_ROUTE}
              baseRoute={DRIVERS_ROUTE}
              deleteRecord={deleteDriver}
            />
            <Divider variant="middle" />

            <div className={classes.card}>
              <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
                <Grid item xs={9} >
                  Driver Details
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
              {recordState.nickName ?
                <div className={classes.labelDetails}><br />Nick name: {recordState.nickName}</div>
                : <div></div>}
              {recordState.firstName ?
                <div className={classes.labelDetails}><br />First name: {recordState.firstName}</div>
                : <div></div>}
              {recordState.middleName && expand ?
                <div className={classes.labelDetails}><br />Middle name: {recordState.middleName}</div>
                : <div></div>}
              {recordState.lastName ?
                <div className={classes.labelDetails}><br />Last name: {recordState.lastName}</div>
                : <div></div>}
              {recordState.phone ?
                <div className={classes.labelDetails}><br />Phone: {recordState.phone}</div>
                : <div></div>}
              {recordState.status !== undefined ?
                <div className={classes.labelDetails}><br />Status: {DRIVER_STATUS[recordState.status]}</div>
                : <div></div>}
              {recordState.amount !== undefined ?
                <div className={classes.labelDetails}><br />Amount: {recordState.amount}</div>
                : <div></div>}
              {recordState.shiftType !== undefined ?
                <div className={classes.labelDetails}><br />Shift type: {SHIFT_TYPES[recordState.shiftType]}</div>
                : <div></div>}
              {recordState.transportType !== undefined ?
                <div className={classes.labelDetails}><br />Transport type: {TRANSPORT_TYPES[recordState.transportType]}</div>
                : <div></div>}
              {recordState.visaType !== undefined && expand ?
                <div className={classes.labelDetails}><br />Visa type: {VISA_TYPES[recordState.visaType]}</div>
                : <div></div>}
              {recordState.visaExpiryDate ?
                <div className={classes.labelDetails}><br />Visa expiry date: {recordState.visaExpiryDate}</div>
                : <div></div>}
              {recordState.userName && expand ?
                <div className={classes.labelDetails}><br />User name: {recordState.userName}</div>
                : <div></div>}
              {recordState.password && expand ?
                <div className={classes.labelDetails}><br />Password: {recordState.password}</div>
                : <div></div>}
              {recordState.address && expand ?
                <div className={classes.labelDetails}><br />Address: {recordState.address}</div>
                : <div></div>}
              {recordState.workHours && expand ?
                <div className={classes.labelDetails}><br />Work hours: {recordState.workHours}</div>
                : <div></div>}
              {recordState.salary && expand ?
                <div className={classes.labelDetails}><br />Salary: {recordState.salary}</div>
                : <div></div>}
              {recordState.experienceYears && expand ?
                <div className={classes.labelDetails}><br />Experience years: {recordState.experienceYears}</div>
                : <div></div>}
              {recordState.civilId && expand ?
                <div className={classes.labelDetails}><br />Civil id: {recordState.civilId}</div>
                : <div></div>}
              {recordState.birthdate && expand ?
                <div className={classes.labelDetails}><br />Birthdate: {recordState.birthdate}</div>
                : <div></div>}
              {recordState.serviceStartDate && expand ?
                <div className={classes.labelDetails}><br />Start date: {recordState.serviceStartDate}</div>
                : <div></div>}
              {recordState.serviceEndDate && expand ?
                <div className={classes.labelDetails}><br />End date: {recordState.serviceEndDate}</div>
                : <div></div>}
              {recordState.latitude && expand ?
                <div className={classes.labelDetails}><br />Latitude: {recordState.latitude}</div>
                : <div></div>}
              {recordState.longitude && expand ?
                <div className={classes.labelDetails}><br />Longitude: {recordState.longitude}</div>
                : <div></div>}
              {recordState.notes && expand ?
                <div className={classes.labelDetails}><br />Notes: {recordState.notes}</div>
                : <div></div>}
            </div>
          </div>
        </Grid>
      </Grid>

      :
      <div>
        <BaseWaiting error={error} />

      </div>
    }
  </div>;
}
export default DriverDetails;