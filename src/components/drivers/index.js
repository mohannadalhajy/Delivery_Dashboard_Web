import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getDrivers } from '../../redux/drivers/Actions';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import ListDrivers from './list';
import BasicPagination from '../Base/BasicPagination';
import { ADD_DRIVER_ROUTE } from '../../constants';
import AddIcon from '@material-ui/icons/Add';
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
const Drivers = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const drivers = useSelector(state => state.Drivers);
  const classes = useStyles();
  useEffect(() => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    if (!page || page <= 0) page = 1
    if (!take || take <= 0) take = countInPage
    dispatch(getDrivers({ page, take }));
    setCurrPage(page);
    setCountInPage(take);
  }, [location, dispatch, countInPage])

  const setDriversByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getDrivers({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!drivers ? <div></div>
          : drivers.loading && drivers.drivers.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : drivers.drivers.length <= 0 ? <div>There is not drivers</div>
              :
              <React.Fragment>
                <ListDrivers />
                <br />
                <BasicPagination
                  count={drivers.pageCount}
                  page={currPage}
                  setPage={setDriversByPage} />
              </React.Fragment>
        }
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_DRIVER_ROUTE}>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add driver
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Drivers;