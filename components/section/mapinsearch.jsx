"use client";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapInSearch({ region, businesses }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (region) {
      if (map.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [region.longitude, region.latitude],
        zoom: 12,
      });

      {businesses.length > 0 && businesses.map((i) => {
        new mapboxgl.Marker()
          .setLngLat([i.coordinates.longitude, i.coordinates.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(i.name))
          .addTo(map.current);
      })}
    }
  }, [region, businesses]);

  return <div ref={mapContainer} className="map-container h-full w-full" />;
}
