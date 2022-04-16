import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Divider,
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
  Button,
  CircularProgress
} from '@material-ui/core';
import BaseDisplayImage from '../Base/BaseDisplayImage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
import { deleteClient } from '../../redux/clients/Actions';
import ListOrders from '../orders/list';
import BasicPagination from '../Base/BasicPagination';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersSuccessAction } from '../../redux/orders/Actions';
import { getChargesSuccessAction } from '../../redux/charges/Actions';
import ListCharges from '../charges/list';
//import Orders from '../orders';
const { IMAGES_CLIENTS_API_URL, EDIT_CLIENT_ROUTE, CLIENTS_ROUTE, EMIRATES } = require('../../constants/index');
const APIClient = require('../../redux/clients/API');
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 8px",
    display: 'flex',
    flexGrow: 1,
  },
  CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
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

function ClientDetails() {
  const classes = useStyles();
  const [client, setClient] = useState();
  const [currPage, setCurrPage] = useState(1);
  const waitText = 'Please wait'
  const [error, setError] = useState(waitText);
  const [srcImage, setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.webp');
  const location = useLocation();
  const [expand, setExpand] = React.useState(false);
  const orders = useSelector(state => state.Orders);
  const charges = useSelector(state => state.Charges);
  const [viewOrders, setViewOrders] = React.useState(false);
  const [viewCharges, setViewCharges] = React.useState(false);
  const dispatch = useDispatch()
  const [countInPage,] = useState(50);
  const [id, setId] = React.useState(false);
  useEffect(() => {
    var str = location.search;
    let id = new URLSearchParams(str).get("id")
    setId(id);
    let promise;
    promise = APIClient.getById(id);
    promise.then(res => {
      setClient(res.data.result);
      if (res.data.result.image) setSrcImage(IMAGES_CLIENTS_API_URL + '/' + res.data.result.image);
    }).catch(
      err => {
        setClient(undefined)
        setError("Network failed")
      }
    );
    const ordersPromise = APIClient.getOrders(id, 1, countInPage)
    ordersPromise.then(response => {
      const orders = response.data.result.result.map(item => { return { ...item, checked: false } });
      dispatch(getOrdersSuccessAction({ ...response.data.result, orders: orders }));
    })
    const chargesPromise = APIClient.getCharges(id, 1, countInPage)
    chargesPromise.then(response => {
      const records = response.data.result.records.map(item => { return { ...item, checked: false } });
      dispatch(getChargesSuccessAction({ ...response.data.result, records }));
    })
  }, [location, countInPage, dispatch]);
  const setOrdersByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    const ordersPromise = APIClient.getOrders(id, page, take)
    ordersPromise.then(response => {
      const orders = response.data.result.result.map(item => { return { ...item, checked: false } });
      dispatch(getOrdersSuccessAction({ ...response.data.result, orders: orders }));
    })
    setCurrPage(page)
  }
  const setChargesByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    const promise = APIClient.getCharges(id, page, take)
    promise.then(response => {
      const records = response.data.result.records.map(item => { return { ...item, checked: false } });
      dispatch(getChargesSuccessAction({ ...response.data.result, records }));
    })
    setCurrPage(page)
  }
  return <div className={classes.root}>

    {client !== undefined ?

      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <div>
            <BaseDisplayImage
              srcImage={srcImage}
              Id={id}
              smallName={(client.clientNameEnglish ? client.clientNameEnglish : "")}
              //userName={(client.userName ? client.userName : "")}
              bigName={client.companyNameEnglish}
              editRoute={EDIT_CLIENT_ROUTE}
              baseRoute={CLIENTS_ROUTE}
              deleteRecord={deleteClient}
            />
            <Divider variant="middle" />

            <div className={classes.card}>
              <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
                <Grid item xs={9} >
                  Client Details
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
              {client.userName ?
                <div className={classes.labelDetails}><br />User name: {client.userName}</div>
                : <div></div>}
              {client.emirate ?
                <div className={classes.labelDetails}><br />Emirate: {EMIRATES[client.emirate]}</div>
                : <div></div>}
              {client.city ?
                <div className={classes.labelDetails}><br />City: {client.city}</div>
                : <div></div>}
              {client.clientPhone ?
                <div className={classes.labelDetails}><br />Client phone: {client.clientPhone}</div>
                : <div></div>}
              {client.companyPhone ?
                <div className={classes.labelDetails}><br />Company phone: {client.companyPhone}</div>
                : <div></div>}
              {client.amount && expand ?
                <div className={classes.labelDetails}><br />Amount: {client.amount}</div>
                : <div></div>}
              {client.points && expand ?
                <div className={classes.labelDetails}><br />Points: {client.points}</div>
                : <div></div>}
              {client.companyTypeEnglish && expand ?
                <div className={classes.labelDetails}><br />Company type: {client.companyTypeEnglish}</div>
                : <div></div>}
              {client.contractDate && expand ?
                <div className={classes.labelDetails}><br />Contract date: {client.contractDate}</div>
                : <div></div>}
              {client.serviceStartDate && expand ?
                <div className={classes.labelDetails}><br />Service start date: {client.serviceStartDate}</div>
                : <div></div>}
              {client.serviceEndDate && expand ?
                <div className={classes.labelDetails}><br />Service end date: {client.serviceEndDate}</div>
                : <div></div>}
              {client.latitude && expand ?
                <div className={classes.labelDetails}><br />Latitude: {client.latitude}</div>
                : <div></div>}
              {client.longitude && expand ?
                <div className={classes.labelDetails}><br />Longitude: {client.longitude}</div>
                : <div></div>}
              {expand && client.notes ? client.notes
                : <div></div>}
            </div>

          </div>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => setViewOrders(!viewOrders)} startIcon={<FactCheckIcon />} className={classes.button1}>
            View orders
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => setViewCharges(!viewCharges)} startIcon={<FactCheckIcon />} className={classes.button1}>
            View charges
          </Button>
        </Grid>
        <Grid item xs={12}>
          {viewOrders ? !orders ?
            <div />
            :
            orders.loading && orders.orders.length <= 0 ?
              <div className={classes.CircularProgress}>
                <CircularProgress />
              </div>
              : orders.orders.length <= 0 ?
                <div>There is not orders</div>
                :
                <React.Fragment>
                  <ListOrders clientOrders={true} />
                  <br />
                  <BasicPagination
                    count={orders.pageCount}
                    page={currPage}
                    setPage={setOrdersByPage} />
                </React.Fragment>
            : <div />
          }
        </Grid>
        <Grid item xs={12}>
          {viewCharges ? !charges ?
            <div />
            :
            charges.loading && charges.records.length <= 0 ?
              <div className={classes.CircularProgress}>
                <CircularProgress />
              </div>
              : charges.records.length <= 0 ?
                <div>There is not charges</div>
                :
                <React.Fragment>
                  <ListCharges clientCharges={true} />
                  <br />
                  <BasicPagination
                    count={charges.pageCount}
                    page={currPage}
                    setPage={setChargesByPage} />
                </React.Fragment>
            : <div />
          }
        </Grid>
      </Grid>
      :
      <div>
        <BaseWaiting error={error} />

      </div>
    }
  </div>;
}
export default ClientDetails;