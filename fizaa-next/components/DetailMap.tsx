"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export default function DetailMap({ lat, lng }: { lat: number; lng: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;
      mapRef.current = L.map(ref.current, { scrollWheelZoom: false }).setView([lat, lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 }).addTo(mapRef.current);
      const icon = L.divIcon({ className: "", html: '<span class="map-pin map-pin--active"></span>', iconSize: [26, 26], iconAnchor: [13, 26] });
      L.marker([lat, lng], { icon }).addTo(mapRef.current);
      setTimeout(() => mapRef.current?.invalidateSize(), 200);
    })();
    return () => { cancelled = true; };
  }, [lat, lng]);

  return <div ref={ref} className="h-[300px] rounded-xl2 overflow-hidden border border-line" />;
}
