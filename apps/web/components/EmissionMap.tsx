import L from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { Emission } from "../models/Emission";
function EmissionMap({ emission }: { emission: Emission[] }): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);
  const id = "map" + Math.random(); // Generate a unique id for the map

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const map = L.map("map", { attributionControl: false }).setView(
        [36.5, 127.5],
        7
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.control.attribution({ prefix: false }).addTo(map);
      emission.forEach((item) => {
        const circle = L.circle([item.latitude!, item.longitude!], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: item.emission * 100,
        }).addTo(map);

        circle.bindPopup(
          `<h1>${item.region}</h1><p>Emission: ${item.emission}</p>`
        );
      });
    }
  }, [isMounted]);

  return <div id={id} className="w-full h-full rounded-t-md"></div>;
}

export default EmissionMap;
