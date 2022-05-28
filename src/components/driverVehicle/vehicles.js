import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { CircularProgress, makeStyles } from '@material-ui/core';
import BasicPagination from '../Base/BasicPagination';
import ListDriversVehicles from './listDrivers';
const API = require('../../redux/driverVehicle/API')
const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
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
const VehiclesWithDrivers = () => {
  const [countInPage, ] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const location = useLocation();
  const [vehicles, setVehicles] = useState({
    vehicles: [],
    pageCount: 1,
    count: 0,
    error: ""
  });
  const classes = useStyles();
  useEffect(() => {
    const promise = API.getVehicles(1, countInPage)
    promise.then(response => {
      setVehicles({ ...response.data.result });
    }).catch(err => {
      console.log("error", err)
    })
  }, [location, countInPage])

  const setVehiclesByPage = (page, take) => {
     if (take === undefined) take = countInPage;
     setCurrPage(page)
     const promise = API.getVehicles(page, take)
    promise.then(response => {
      setVehicles({ ...response.data.result });
    }).catch(err => {
      console.log("error", err)
    })
    // history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!vehicles ? <div></div>
          : vehicles.vehicles.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : vehicles.vehicles.length <= 0 ? <div>There is not vehicles</div>
              :
              <React.Fragment>
                <ListDriversVehicles records={vehicles.vehicles} />
                <br />
                <BasicPagination
                  count={vehicles.pageCount}
                  page={currPage}
                  setPage={setVehiclesByPage} />
              </React.Fragment>
        }
      </div>
    </div>
  );
}
export default VehiclesWithDrivers;