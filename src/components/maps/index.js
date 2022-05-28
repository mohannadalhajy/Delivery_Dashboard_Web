import React, { Component, useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../../redux/drivers/Actions';
import { getClients } from '../../redux/clients/Actions';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = ({ google }) => {
  const [state, setState] = useState({
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  });
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.Drivers)
  const clients = useSelector(state => state.Clients)
  useEffect(() => {
    dispatch(getDrivers({})); 
    dispatch(getClients({}));
    let myInterval = setInterval(() => {
    dispatch(getDrivers({}));

    }, 5 * 1000)
    return () => {
      clearInterval(myInterval);
    };
  }, [dispatch])


  const onMarkerClick = (props, marker, e) =>
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  const onClose = props => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={
        {
          lat: 25.405235,
          lng: 55.513619
        }
      }
    >
      {drivers.drivers?.filter(driver => driver.latitude && driver.longitude).map((driver, index) => (
        <Marker
          // position={{
          //   lat: 25.405235+index-1,
          //   lng: 55.513619+index-1
          // }}
          icon={{
            // url: `${process.env.PUBLIC_URL + '/motorcycle.jpeg'}`,
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
          }}
          position={{ lat: driver.latitude, lng: driver.longitude }}
          onClick={onMarkerClick}
          name={driver.firstName + ' ' + driver.lastName}
        />
      ))}
      {clients.clients?.filter(driver => driver.latitude && driver.longitude).map((client, index) => (
        <Marker
        // icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'}
          icon={{
            url: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
            anchor: new google.maps.Point(24, 24),
            scaledSize: new google.maps.Size(48, 48)
          }}
          position={{ lat: client.latitude, lng: client.longitude }}
          onClick={onMarkerClick}
          name={client.companyNameEnglish + ' ' + client.companyTypeEnglish}
        />
      ))}
      <InfoWindow
        marker={state.activeMarker}
        visible={state.showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDVFvurJK6PyxOgj9jS54HDa6lvSbUlJfI'
})(MapContainer);
