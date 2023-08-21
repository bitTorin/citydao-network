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
import Link from 'next/link'
import Router from 'next/router'

import daos from '../data/dao_list.json';
import Pin from './ui/pin';

interface daoData {
    ID: number;
    Name: string;
    Longitude: number;
    Latitude: number;
  }

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


export default function MapView() {

    const mapRef = useRef<mapboxgl.Map>();

    const handleLoad = (event: MapEvent) => {
        const { target } = event;
        mapRef.current = target;
        
    };

    const [popupInfo, setPopupInfo] = useState<daoData | null>(null);

    // let userInteracting = false;
    // let spinEnabled = false;

    const initialViewState= {
        longitude: -97.74076,
        latitude: 30.26007,
        zoom: 2,
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
                reCenter(mapRef, dao.Longitude, dao.Latitude);
                setPopupInfo(dao);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
    );

    // Data Source for line drawing layer. 
    // Create a GeoJSON source with a lineString.
    // Next step is to dynamically update where the beginning and endpoints are for each line drawn.
    // const networkLines = {
    //     'type': 'FeatureCollection',
    //     'features': [
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'LineString',
    //                 'coordinates': [
    //                     [-97.7436995,30.2711286],
    //                     [-71.060511, 42.3554334]
    //                 ]
    //             }
    //         }
    //     ]
    // };

    // Pulsing dot. Mapbox example reference: https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/
    // Code saved for next iteration.
    //
    // const testDot = {
    //     'id': 'points',
    //     'type': 'symbol',
    //     'source': 'points',
    //     'layout': {
    //         'icon-image': 'pulsing-dot'
    //     }
    // }
    //
    // const pulseDot = {
    //     'type': 'Feature',
    //     'geometry': {
    //         'type': 'circle',
    //         'coordinates': [-112.07404,33.44838 ] //Phoenix, AZ as test site, no current cityDAO in AZ
    //     }
    // }

    return (
        <MapProvider>
            <Map
                initialViewState={initialViewState}
                mapStyle={"mapbox://styles/mapbox/light-v11"}
                //mapStyle={"mapbox://styles/bittorin/clkspy3qe01vd01p589qx5c2h"}
                mapboxAccessToken={mapboxToken}
                maxZoom={3.2}
                minPitch={30}
                maxPitch={30}
                antialias={true}
                attributionControl={false}
                customAttribution={"<a href='/'>citydao.network</a>"}
                hash={true}
                projection={{name: 'globe'}}
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
                            <Link href={`/directory#${popupInfo.ID}`} scroll={false}>{popupInfo.Name}</Link>
                        </div>
                    </Popup>
                )}

                {/* <Source id="polylineLayer" type="geojson" data={networkLines}> //Draw line on map
                    <Layer 
                        id= 'lineLayer'
                        type= 'line'
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
                </Source> */}

                {/* <Source id="dotLayer" type="geojson" data={pulseDot}> //Dot placement on map
                    <Layer>
                        {}
                    </Layer>
                </Source> */}
            </Map>
        </MapProvider>
    )
}

function reCenter(map:any, longitude:number, latitude:number) {
    map.current?.flyTo({center: [longitude, latitude], zoom: 3.2, duration: 2000});
}