import React, { useEffect, useRef } from 'react';

const GlobeSpinner = ({ map, startRotation = true }) => {
    const userInteractingRef = useRef(false);
    const spinEnabledRef = useRef(startRotation);

    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    const spinGlobe = () => {
        const zoom = map.getZoom();
        if (spinEnabledRef.current && !userInteractingRef.current && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    };

    useEffect(() => {
        const handleMouseDown = () => userInteractingRef.current = true;
        const handleMouseUp = () => {
            userInteractingRef.current = false;
            spinGlobe();
        };
        const handleMoveEnd = () => spinGlobe();

        map.on('mousedown', handleMouseDown);
        map.on('mouseup', handleMouseUp);
        map.on('dragend', handleMouseUp);
        map.on('pitchend', handleMouseUp);
        map.on('rotateend', handleMouseUp);
        map.on('moveend', handleMoveEnd);

        // Cleanup event listeners on component unmount
        return () => {
            map.off('mousedown', handleMouseDown);
            map.off('mouseup', handleMouseUp);
            map.off('dragend', handleMouseUp);
            map.off('pitchend', handleMouseUp);
            map.off('rotateend', handleMouseUp);
            map.off('moveend', handleMoveEnd);
        };
    }, [map]);

    const toggleSpin = () => {
        spinEnabledRef.current = !spinEnabledRef.current;
        if (spinEnabledRef.current) {
            spinGlobe();
        } else {
            map.stop();
        }
    };

    
};

export default GlobeSpinner;
