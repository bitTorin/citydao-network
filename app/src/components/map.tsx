'use client'

import {useEffect, useRef, useState} from 'react';
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
    useMap
} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from './pin';

const MAPBOX_TOKEN = "pk.eyJ1IjoiYml0dG9yaW4iLCJhIjoiY2xrc3Q0Y2M3MDUwbzNybXl2dHlsNjh4MiJ9.9k9CGEqG0It-oPaM6ZwheQ";


export default function MapView() {

    const mapRef = useRef<mapboxgl.Map>();

    const handleLoad = (event: MapEvent) => {
        const { target } = event;
        mapRef.current = target;
        
    };

    const [popupInfo, setPopupInfo] = useState(null);

    // let userInteracting = false;
    // let spinEnabled = true;

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
                maxZoom={3.2}
                minPitch={30}
                maxPitch={30}
                antialias={true}
                customAttribution={"<a href='/'>citydao.network</a>"}
                hash={true}
                projection={"globe"}
                onLoad={handleLoad}
            >
                <Marker key={1} longitude={-97} latitude={30} anchor="bottom" color="blue" onClick={() => setPopupInfo(true)}>

                    
                </Marker>
                <Marker key={2} longitude={-101} latitude={31} anchor="bottom" color="blue">
                    
                </Marker>
                {popupInfo && (
                        <Popup
                            anchor="top"
                            longitude={-97}
                            latitude={30}
                            onClose={() => setPopupInfo(null)}
                        >
                            <div>
                            Austin, TX
                            <a
                                target="_new"
                                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=Austin,_Texas`}
                            >
                                Wikipedia
                            </a>
                            </div>
                        </Popup>
                    )}
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