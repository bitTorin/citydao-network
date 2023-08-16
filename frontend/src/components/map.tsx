'use client'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
    Source,
} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import daos from '../data/dao_list.json';
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

    const initialViewState= {
        longitude: -97.74076,
        latitude: 30.26007,
        zoom: 1,
        pitch: 30,
    }

    const pins = useMemo(
        () =>
          daos.map((dao, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={dao.Longitude}
              latitude={dao.Latitude}
              anchor="center"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                console.log(dao.City);
                reCenter(mapRef, dao.Longitude, dao.Latitude);
                setPopupInfo(dao);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
    );

    // Create a GeoJSON source with an empty lineString.
    const networkLines = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [-97.7436995,30.2711286],
                        [-71.060511, 42.3554334]
                    ]
                }
            }
        ]
    };

    const animationLines: LineLayer = {
        id: 'lineAnimation',
        type: 'line',
        source: 'networkLines',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#ffffff',
            'line-width': 3,
            'line-opacity': 0.8
        },
    };

    const testLine = {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [[-97.7436995,30.2711286],[-71.060511, 42.3554334]]
        }
    }

    return (
        <MapProvider>
            <Map 
                initialViewState={initialViewState}
                mapStyle={"mapbox://styles/bittorin/clkspy3qe01vd01p589qx5c2h"}
                mapboxAccessToken={MAPBOX_TOKEN}
                maxZoom={3.2}
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
                <Source id="polylineLayer" type="geojson" data={testLine}>
                    <Layer 
                        id= 'lineLayer'
                        type= 'line'
                        // source= 'networkLines'
                        layout= {{
                            'line-cap': 'round',
                            'line-join': 'round'
                        }}
                        paint= {{
                            'line-color': '#ffffff',
                            'line-width': 2,
                            'line-opacity': 0.8
                        }}>
                    </Layer>
                </Source>
                
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

function reCenter(map:any, longitude:number, latitude:number) {
    map.current?.flyTo({center: [longitude, latitude], zoom: 3.2, duration: 2000});
}