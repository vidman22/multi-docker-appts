import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Locations from '../../Lists/Locations';
import fancyMapStyles from '../../MapStyle.json';


import './Map.css';

const locations = () => {
  let locations = [];
  for (const prop in Locations){
    locations.push({id: prop, location: Locations[prop]})
  }
  return locations;
}

let key = 'docker'

const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}`,
      loadingElement: <div style={{ height: `500px`  }} />,
      containerElement: <div className="MapContainerElement"  />,
      mapElement: <div style={{ height: `100%`, width: '100%', cursor: 'default'}} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => 
  
    <GoogleMap
      defaultZoom={10.4}
      defaultCenter={{ lat: 32.849264, lng: -117.210677 }}
      defaultOptions={{ styles: fancyMapStyles, gestureHandling: 'none', zoomControl: false, mapTypeControl: false }}
    >  
      {locations().map( ( loc ) => {
        return <Marker onClick={() => props.markerclicked(loc.location.name, loc.location.myChartID)} key={loc.id} position={{lat: loc.location.lat, lng: loc.location.lng }} />
      })}
      
    </GoogleMap>
  )

const Map = (props) => {
        return (
            <div className="MapWrapper">
                <MyMapComponent markerclicked={props.markerclicked} isMarkerShown/>
            </div>
        );
}

export default Map;
