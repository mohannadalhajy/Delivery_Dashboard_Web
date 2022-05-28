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
const DriversWithVehicles = () => {
  const [countInPage, ] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const location = useLocation();
  const [drivers, setDrivers] = useState({
    drivers: [],
    pageCount: 1,
    count: 0,
    error: ""
  });
  const classes = useStyles();
  useEffect(() => {
    const promise = API.getDrivers(1,countInPage)
    promise.then(response => {
      setDrivers({ ...response.data.result });
    }).catch(err => {
      console.log("error", err)
    })
  }, [location, countInPage])

  const setDriversByPage = (page, take) => {
     if (take === undefined) take = countInPage;
     setCurrPage(page)
     const promise = API.getDrivers(page, take)
    promise.then(response => {
      setDrivers({ ...response.data.result });
    }).catch(err => {
      console.log("error", err)
    })
    // history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!drivers ? <div></div>
          : drivers.drivers.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : drivers.drivers.length <= 0 ? <div>There is not drivers</div>
              :
              <React.Fragment>
                <ListDriversVehicles records={drivers.drivers} />
                <br />
                <BasicPagination
                  count={drivers.pageCount}
                  page={currPage}
                  setPage={setDriversByPage} />
              </React.Fragment>
        }
      </div>
    </div>
  );
}
export default DriversWithVehicles;