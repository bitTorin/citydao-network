'use client'

import {useEffect, useMemo, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Map, { 
    AttributionControl, 
    Layer, 
    Marker, 
    MapEvent,
    MapProvider, 
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    useMap,
    LineLayer,
} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import cities from '../data/dao_list.json';
import Pin from './pin';

const MAPBOX_TOKEN = "pk.eyJ1IjoiYml0dG9yaW4iLCJhIjoiY2xrdnl6bmxvMHQxMzNrcXRpcjNxbXEzcSJ9.IgFLq1EhdcwUTMPFRJo8JA";


export default function MapView() {

    const mapRef = useRef<mapboxgl.Map>();

    const handleLoad = (event: MapEvent) => {
        const { target } = event;
        mapRef.current = target;
        
    };

    const [popupInfo, setPopupInfo] = useState(null);

    // let userInteracting = false;
    // let spinEnabled = true;

    const pins = useMemo(
        () =>
          cities.map((city, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={city.Longitude}
              latitude={city.Latitude}
              anchor="top"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                reCenter(mapRef, {city.Longitude}, {city.Latitude});
                setPopupInfo(city);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
    );

    const animationLines: LineLayer = {
        id: 'lineAnimation',
        type: 'line',
        source: 'line',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#ed6498',
            'line-width': 5,
            'line-opacity': 0.8
        },
    };

      // Create a GeoJSON source with an empty lineString.
    const networkLines = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[0, 0]]
                }
            }
        ]
    };

    return (
        <MapProvider>
            <Map 
                initialViewState={{
                    longitude: -97.74076,
                    latitude: 30.26007,
                    zoom: 1,
                    pitch: 30,
                }}
                mapStyle={"mapbox://styles/bittorin/clkspy3qe01vd01p589qx5c2h"}
                mapboxAccessToken={MAPBOX_TOKEN}
                maxZoom={3}
                minPitch={30}
                maxPitch={30}
                antialias={true}
                customAttribution={"<a href='/'>citydao.network</a>"}
                hash={true}
                projection={"globe"}
                onLoad={handleLoad}
            >

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="bottom"
                        longitude={Number(popupInfo.Longitude)}
                        latitude={Number(popupInfo.Latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.Name}
                        </div>
                    </Popup>
                )}
                <Layer>
                    {/* {...animationLines} */}
                </Layer>
            </Map>
        </MapProvider>
    )
}


// function spinGlobe(map) {
//     const zoom = map.getZoom();
//     if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
//     let distancePerSecond = 360 / secondsPerRevolution;
//     if (zoom > slowSpinZoom) {
//     // Slow spinning at higher zooms
//     const zoomDif =
//     (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
//     distancePerSecond *= zoomDif;
//     }
//     const center = map.getCenter();
//     center.lng -= distancePerSecond;
//     // Smoothly animate the map over one second.
//     // When this animation is complete, it calls a 'moveend' event.
//     map.easeTo({ center, duration: 1000, easing: (n) => n });
//     }
// }

function reCenter(map, longitude, latitude) {
    map.current.flyTo(longitude,latitude)
}