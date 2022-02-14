import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { getClients } from '../../redux/clients/Actions';
import { CircularProgress, makeStyles } from '@material-ui/core';
import ListClients from './list';
import BasicPagination from '../Base/BasicPagination';
const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
  },
}));
const Clients = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const clients = useSelector(state => state.Clients);
  const classes = useStyles();
  useEffect(() => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    dispatch(getClients({ page, take }));
    setCurrPage(page);
    setCountInPage(take);
  }, [location, dispatch, countInPage])

  const setClientsByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getClients({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!clients ? <div></div>
          : clients.loading && clients.clients.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : clients.clients.length <= 0 ? <div>There is not clients</div>
              :
              <React.Fragment>
                <ListClients />
                <br />
                <BasicPagination
                  count={clients.pageCount}
                  page={currPage}
                  setPage={setClientsByPage} />
              </React.Fragment>
        }
      </div>
    </div>
  );
}
export default Clients;