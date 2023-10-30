"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl";

export default function MapInSearch({ region, businesses }) {
  const markerRef = useRef();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (region) {
      setLatitude(region.latitude);
      setLongitude(region.longitude);
    }
  }, [region, businesses]);

  const onMove = (e) => {
    console.log(e.originalEvent.type);
    if (e.originalEvent.type === "mousemove") {
      setLatitude(e.viewState.latitude);
      setLongitude(e.viewState.longitude);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        viewState={{
          latitude: latitude,
          longitude: longitude,
          zoom: 12,
        }}
        onMove={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: `100%`, height: `100%`, position: `relative` }}
      >
        {businesses.length > 0 &&
          businesses.map((i) => (
            <>
              <Marker longitude={i.coordinates.longitude} latitude={i.coordinates.latitude} color="red" ref={markerRef} popup={new mapboxgl.Popup().setText(i.name)} />
            </>
          ))}
      </Map>
    </div>
  );
}
