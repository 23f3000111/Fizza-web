"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  lat: string;
  lng: string;
  onChange: (lat: string, lng: string) => void;
}

export default function AdminMapPicker({ lat, lng, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;

      const initLat = parseFloat(lat) || 3.1412;
      const initLng = parseFloat(lng) || 101.6866;

      const map = L.map(ref.current, { scrollWheelZoom: true }).setView([initLat, initLng], lat ? 13 : 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const pinIcon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;background:#B0863F;border:2px solid #fff;transform:rotate(-45deg);box-shadow:0 3px 8px rgba(0,0,0,.4)"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 22],
      });

      if (lat && lng) {
        markerRef.current = L.marker([initLat, initLng], { icon: pinIcon }).addTo(map);
      }

      map.on("click", (e: any) => {
        const { lat: la, lng: ln } = e.latlng;
        const laStr = la.toFixed(6);
        const lnStr = ln.toFixed(6);
        if (markerRef.current) {
          markerRef.current.setLatLng([la, ln]);
        } else {
          markerRef.current = L.marker([la, ln], { icon: pinIcon }).addTo(map);
        }
        onChange(laStr, lnStr);
      });

      mapRef.current = map;
      setTimeout(() => { map.invalidateSize(); setReady(true); }, 200);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to new lat/lng if changed externally (e.g. editing a saved listing)
  useEffect(() => {
    if (!mapRef.current || !lat || !lng) return;
    const la = parseFloat(lat);
    const ln = parseFloat(lng);
    if (!isNaN(la) && !isNaN(ln)) {
      mapRef.current.setView([la, ln], 13);
    }
  }, [lat, lng]);

  return (
    <div className="rounded-xl overflow-hidden border border-line">
      <div className="bg-navy-soft px-3 py-2 text-[12px] text-navy-2 font-medium flex items-center justify-between">
        <span>Click anywhere on the map to pin the location</span>
        {ready && <span className="text-mute text-[11px]">OpenStreetMap</span>}
      </div>
      <div ref={ref} style={{ height: 280 }} className="w-full" />
    </div>
  );
}
