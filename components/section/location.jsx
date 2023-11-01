"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Button from "../ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Location({ business }) {
  const markerRef = useRef();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (business) {
      setLatitude(business.coordinates.latitude);
      setLongitude(business.coordinates.longitude);
    }
  }, [business]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="w-full aspect-video">
        <div className="w-full h-full relative">
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import("mapbox-gl")}
            viewState={{
              latitude: latitude,
              longitude: longitude,
              zoom: 12,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            style={{ width: `100%`, height: `100%`, position: `relative` }}
          >
            <Marker
              longitude={business?.coordinates?.longitude || 0}
              latitude={business?.coordinates?.latitude || 0}
              color="red"
              ref={markerRef}
              popup={new mapboxgl.Popup().setText(business?.name)}
            />
          </Map>
        </div>
      </div>
      <div>
        {business?.location?.display_address?.map((i) => (
          <p key={i}>{i}</p>
        ))}
        <a className="mt-4 shrink-0 bg-amaranth border border-amaranth-700 hover:bg-amaranth-600 h-12 px-6 text-white font-bold rounded inline-flex items-center gap-2 transition-all active:scale-95 hover:shadow" href={`http://maps.google.com/maps?z=12&t=m&q=loc:${latitude}+${longitude}`} target="_blank">
          <ArrowUpRight />
          Get Direction
        </a>
      </div>
    </div>
  );
}
