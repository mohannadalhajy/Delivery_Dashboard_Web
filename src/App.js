import './App.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "react-sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loadable from '@loadable/component'
import { initProfile, profileMe } from './redux/User/Actions';
import AuthRoute from './components/AuthRoute';
import {
  ADD_CHARGE_ROUTE,
  ADD_CLIENT_ACCOUNT_ROUTE,
  ADD_CLIENT_ROUTE,
  ADD_CUSTOMER_ROUTE,
  ADD_DRIVER_ACCOUNT_ROUTE,
  ADD_DRIVER_ROUTE,
  ADD_ORDER_ROUTE,
  CHARGES_ROUTE,
  CLIENTS_ACCOUNTS_ROUTE,
  CLIENTS_ROUTE,
  CLIENT_DETAILS_ROUTE,
  CUSTOMERS_ROUTE,
  DAILY_ORDERS_ROUTE,
  DASHBOARD_ROUTE,
  DRIVERS_ACCOUNTS_ROUTE,
  DRIVERS_ROUTE,
  DRIVER_DETAILS_ROUTE,
  EDIT_CHARGE_ROUTE,
  EDIT_CLIENT_ACCOUNT_ROUTE,
  EDIT_CLIENT_ROUTE,
  EDIT_DRIVER_ACCOUNT_ROUTE,
  EDIT_DRIVER_ROUTE,
  EDIT_ORDER_ROUTE,
  LOGIN_ROUTE,
  MAPS_ROUTE,
  ORDERS_ROUTE,
  ORDER_DETAILS_ROUTE,
  PREFIX_ROUTE,
  PROFILE_ROUTE,
  RESET_PASSWORD_ROUTE
} from './constants';
import { getClients } from './redux/clients/Actions';
import { getDailyOrders } from './redux/DailyOrders/Actions';
// import messaging from "./FirebaseConf";

// messaging.onMessage(payload=>{
//   console.log("Notification\n",payload)
//   let audio = new Audio(`${process.env.PUBLIC_URL + '/audio.mkv'}`)
//     audio.play()
// })

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const dailyOrdersState = useSelector(state => state.DailyOrders)

  const toggle = () => {
    if(playing!==dailyOrdersState.notification)
    setPlaying(dailyOrdersState.notification)
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const login = loadable(() => import('./components/profile/login'));
const clients = loadable(() => import('./components/clients'));
const clientDetails = loadable(() => import('./components/clients/details'));
const editClient = loadable(() => import('./components/clients/edit'));
const addClient = loadable(() => import('./components/clients/add'));
const orders = loadable(() => import('./components/orders'));
const dailyOrders = loadable(() => import('./components/orders/daily'));
const orderDetails = loadable(() => import('./components/orders/details'));
const editOrder = loadable(() => import('./components/orders/edit'));
const addOrder = loadable(() => import('./components/orders/add'));
const charges = loadable(() => import('./components/charges'));
const editCharge = loadable(() => import('./components/charges/edit'));
const addCharge = loadable(() => import('./components/charges/add'));
const clientsAccounts = loadable(() => import('./components/clientsAccounts'));
const editClientAccount = loadable(() => import('./components/clientsAccounts/edit'));
const addClientAccount = loadable(() => import('./components/clientsAccounts/add'));
const driversAccounts = loadable(() => import('./components/driversAccounts'));
const editDriverAccount = loadable(() => import('./components/driversAccounts/edit'));
const addDriverAccount = loadable(() => import('./components/driversAccounts/add'));
const drivers = loadable(() => import('./components/drivers'));
const maps = loadable(() => import('./components/maps'));
const customers = loadable(() => import('./components/customers'));
const addCustomer = loadable(() => import('./components/customers/add'));
const driverDetails = loadable(() => import('./components/drivers/details'));
const editDriver = loadable(() => import('./components/drivers/edit'));
const addDriver = loadable(() => import('./components/drivers/add'));
const profile = loadable(() => import('./components/profile/profile'));
const resetPass = loadable(() => import('./components/profile/resetPass'));
// const vehicles = loadable(() => import('./components/vehicles'));
// const vehicleDetails = loadable(() => import('./components/vehicles/details'));
// const editVehicle = loadable(() => import('./components/vehicles/edit'));
// const addVehicle = loadable(() => import('./components/vehicles/add'));
// const addDriverVehicle = loadable(() => import('./components/driverVehicle/add'));
// const releaseVehicle = loadable(() => import('./components/driverVehicle/releaseVehicle'));
// const releaseDriver = loadable(() => import('./components/driverVehicle/releaseDriver'));
// const vehiclesDrivers = loadable(() => import('./components/driverVehicle/drivers'));
// const driversvehicles = loadable(() => import('./components/driverVehicle/vehicles'));
// const vehiclesTransactions = loadable(() => import('./components/driverVehicle/transactions'));
const dashboard = loadable(() => import('./components/Dashboard'));
const SideBarContent = loadable(() => import('./components/sidebar'));
const NavMenu = loadable(() => import('./components/NavMenu'));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">loading</div>
  </div>
);
function App() {
  // let audio = new Audio(`${process.env.PUBLIC_URL + '/audio.mp3'}`)'
  const url = `${process.env.PUBLIC_URL + '/audio.mp3'}`
  const [playing, toggle] = useAudio(url);
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const mql = window.matchMedia(`(min-width: 800px)`);
  const [collapsed, setCollapsed] = useState(false);
  const dailyOrdersState = useSelector(state => state.DailyOrders)
  // const [notification, setNotification] = useState(false)
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          dispatch(profileMe);
          dispatch(getClients({}));
          console.log("done")
          setOrders()
        } catch (error) {
          console.log("failed")
        }
      }
      else dispatch(initProfile);
    })();
  }, [dispatch]);
  const handle = () => {
    setCollapsed(!collapsed)
  }
  const setOrders = () => {
    dispatch(getDailyOrders({}));
    let myInterval = setInterval(() => {
      dispatch(getDailyOrders({}));
    }, 7 * 1000)
    return () => {
      clearInterval(myInterval);
    };
  }
  // const test = () => {
  //   console.log("rrrrr", audio.paused)
  //     if(audio.paused)
  //     audio.play()
  //     else 
  //     audio.pause()
  //     // audio.paused()
  // }
  return (
    <div>
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
      {console.log(dailyOrdersState.notification)}
      {toggle()}
      <Router>
        <React.Suspense fallback={loading}>
          {user.user.userName === undefined ? <React.Fragment /> :
            <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />}
          <Sidebar
            sidebar={<SideBarContent />}
            open={collapsed && user.user.userName !== undefined}
            docked={collapsed && mql.matches && user.user.userName !== undefined}
            onSetOpen={handle}
            styles={{ sidebar: { background: "white" }, root: { top: user.user.userName === undefined ? 0 : 60 } }}>
            <Switch>
              <Route exact path={LOGIN_ROUTE} component={login} />
              {/* <AuthRoute path={ADD_DRIVER_VEHICLE_ROUTE} component={addDriverVehicle} />
                <AuthRoute path={RELEASE_VEHICLE_ROUTE} component={releaseVehicle} />
                <AuthRoute path={RELEASE_DRIVER_ROUTE} component={releaseDriver} />
                <AuthRoute path={VEHICLES_DRIVERS_ROUTE} component={vehiclesDrivers} />
                <AuthRoute path={DRIVERS_VEHICLES_ROUTE} component={driversvehicles} />
                <AuthRoute path={VEHICLES_TRANSACTIONS_ROUTE} component={vehiclesTransactions} /> */}

              <AuthRoute path={DASHBOARD_ROUTE} component={dashboard} />

              <AuthRoute path={ADD_ORDER_ROUTE} component={addOrder} />
              <AuthRoute path={EDIT_ORDER_ROUTE} component={editOrder} />
              <AuthRoute path={ORDER_DETAILS_ROUTE} component={orderDetails} />
              <AuthRoute path={ORDERS_ROUTE} component={orders} />
              <AuthRoute path={DAILY_ORDERS_ROUTE} component={dailyOrders} />

              <AuthRoute path={CLIENTS_ACCOUNTS_ROUTE} component={clientsAccounts} />
              <AuthRoute path={EDIT_CLIENT_ACCOUNT_ROUTE} component={editClientAccount} />
              <AuthRoute path={ADD_CLIENT_ACCOUNT_ROUTE} component={addClientAccount} />

              <AuthRoute path={DRIVERS_ACCOUNTS_ROUTE} component={driversAccounts} />
              <AuthRoute path={EDIT_DRIVER_ACCOUNT_ROUTE} component={editDriverAccount} />
              <AuthRoute path={ADD_DRIVER_ACCOUNT_ROUTE} component={addDriverAccount} />

              <AuthRoute path={ADD_CHARGE_ROUTE} component={addCharge} />
              <AuthRoute path={EDIT_CHARGE_ROUTE} component={editCharge} />
              <AuthRoute path={CHARGES_ROUTE} component={charges} />

              <AuthRoute path={ADD_DRIVER_ROUTE} component={addDriver} />
              <AuthRoute path={EDIT_DRIVER_ROUTE} component={editDriver} />
              <AuthRoute path={DRIVER_DETAILS_ROUTE} component={driverDetails} />
              <AuthRoute path={DRIVERS_ROUTE} component={drivers} />
              <AuthRoute path={MAPS_ROUTE} component={maps} />


              {/* <AuthRoute path={ADD_VEHICLE_ROUTE} component={addVehicle} />
                <AuthRoute path={EDIT_VEHICLE_ROUTE} component={editVehicle} />
                <AuthRoute path={VEHICLE_DETAILS_ROUTE} component={vehicleDetails} />
                <AuthRoute path={VEHICLES_ROUTE} component={vehicles} /> */}

              <AuthRoute path={CUSTOMERS_ROUTE} component={customers} />
              <AuthRoute path={ADD_CUSTOMER_ROUTE} component={addCustomer} />

              <AuthRoute path={PROFILE_ROUTE} component={profile} />
              <AuthRoute path={RESET_PASSWORD_ROUTE} component={resetPass} />

              <AuthRoute path={ADD_CLIENT_ROUTE} component={addClient} />
              <AuthRoute path={EDIT_CLIENT_ROUTE} component={editClient} />
              <AuthRoute path={CLIENT_DETAILS_ROUTE} component={clientDetails} />
              <AuthRoute path={CLIENTS_ROUTE} component={clients} />
              <AuthRoute path={PREFIX_ROUTE} component={clients} />

            </Switch>
          </Sidebar>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;