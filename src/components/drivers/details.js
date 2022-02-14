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
const { IMAGES_DRIVERS_API_URL, EDIT_DRIVER_ROUTE, DRIVERS_ROUTE } = require('../../constants/index');
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
              bigName={recordState.first_name && recordState.last_name ? recordState.first_name + " " + recordState.last_name : ""}
              smallName={recordState.status && recordState.transport_type ? recordState.transport_type + "-" + recordState.status : ""}
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
              {recordState.nick_name ?
                <div className={classes.labelDetails}><br />Nick name: {recordState.nick_name}</div>
                : <div></div>}
              {recordState.first_name ?
                <div className={classes.labelDetails}><br />First name: {recordState.first_name}</div>
                : <div></div>}
              {recordState.middle_name && expand ?
                <div className={classes.labelDetails}><br />Middle name: {recordState.middle_name}</div>
                : <div></div>}
              {recordState.last_name ?
                <div className={classes.labelDetails}><br />Last name: {recordState.last_name}</div>
                : <div></div>}
              {recordState.phone ?
                <div className={classes.labelDetails}><br />Phone: {recordState.phone}</div>
                : <div></div>}
              {recordState.status ?
                <div className={classes.labelDetails}><br />Status: {recordState.status}</div>
                : <div></div>}
              {recordState.shift_type ?
                <div className={classes.labelDetails}><br />Shift type: {recordState.shift_type}</div>
                : <div></div>}
              {recordState.transport_type ?
                <div className={classes.labelDetails}><br />Transport type: {recordState.transport_type}</div>
                : <div></div>}
              {recordState.visa_type && expand ?
                <div className={classes.labelDetails}><br />Visa type: {recordState.visa_type}</div>
                : <div></div>}
              {recordState.visa_expiry_date ?
                <div className={classes.labelDetails}><br />Visa expiry date: {recordState.visa_expiry_date}</div>
                : <div></div>}
              {recordState.user_name && expand ?
                <div className={classes.labelDetails}><br />User name: {recordState.user_name}</div>
                : <div></div>}
              {recordState.password && expand ?
                <div className={classes.labelDetails}><br />Password: {recordState.password}</div>
                : <div></div>}
              {recordState.address && expand ?
                <div className={classes.labelDetails}><br />Address: {recordState.address}</div>
                : <div></div>}
              {recordState.work_hours && expand ?
                <div className={classes.labelDetails}><br />Work hours: {recordState.work_hours}</div>
                : <div></div>}
              {recordState.salary && expand ?
                <div className={classes.labelDetails}><br />Salary: {recordState.salary}</div>
                : <div></div>}
              {recordState.experience_years && expand ?
                <div className={classes.labelDetails}><br />Experience years: {recordState.experience_years}</div>
                : <div></div>}
              {recordState.civil_id && expand ?
                <div className={classes.labelDetails}><br />Civil id: {recordState.civil_id}</div>
                : <div></div>}
              {recordState.birthdate && expand ?
                <div className={classes.labelDetails}><br />Birthdate: {recordState.birthdate}</div>
                : <div></div>}
              {recordState.service_start_date && expand ?
                <div className={classes.labelDetails}><br />Start date: {recordState.service_start_date}</div>
                : <div></div>}
              {recordState.service_end_date && expand ?
                <div className={classes.labelDetails}><br />End date: {recordState.service_end_date}</div>
                : <div></div>}
              {recordState.locationX && expand ?
                <div className={classes.labelDetails}><br />location X: {recordState.locationX}</div>
                : <div></div>}
              {recordState.locationY && expand ?
                <div className={classes.labelDetails}><br />location Y: {recordState.locationY}</div>
                : <div></div>}
              {recordState.notes && expand ?
                <div className={classes.labelDetails}><br />Notes: {recordState.notes}</div>
                : <div></div>}
              {expand && recordState.notes ? recordState.notes
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