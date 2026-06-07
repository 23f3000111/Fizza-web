"use client";

import { useEffect, useRef } from "react";
import type { Listing } from "@/lib/types";
import { money, imgOf } from "@/lib/format";

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export default function ListingsMap({
  listings,
  focusId,
  onSelect,
}: {
  listings: Listing[];
  focusId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;
      mapRef.current = L.map(containerRef.current, { scrollWheelZoom: false }).setView([3.0, 101.6], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current);
      layerRef.current = L.layerGroup().addTo(mapRef.current);
      setTimeout(() => mapRef.current?.invalidateSize(), 200);
      update();
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings]);

  useEffect(() => {
    const L = LRef.current;
    if (!L || !focusId) return;
    const m = markersRef.current[focusId];
    if (m && mapRef.current) {
      mapRef.current.panTo(m.getLatLng());
      m.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId]);

  function update() {
    const L = LRef.current;
    if (!L || !layerRef.current || !mapRef.current) return;
    layerRef.current.clearLayers();
    markersRef.current = {};
    const pts: [number, number][] = [];
    listings.forEach((l) => {
      if (l.lat == null || l.lng == null) return;
      const icon = L.divIcon({ className: "", html: '<span class="map-pin"></span>', iconSize: [22, 22], iconAnchor: [11, 22], popupAnchor: [0, -20] });
      const html = `<div style="display:flex;gap:10px;width:210px"><div style="width:60px;height:60px;border-radius:8px;flex-shrink:0;background:#f0ece2 url('${imgOf(l)}') center/cover"></div><div><b style="font-size:13px;line-height:1.25">${esc(l.title)}</b><br><span style="font-size:12px;color:#7c837d">${esc(l.city)} · ${esc(money(l))}</span><br><a href="/listing/${esc(l.id)}" style="font-size:12px;color:#936c2c;font-weight:600">View details →</a></div></div>`;
      const m = L.marker([l.lat, l.lng], { icon }).bindPopup(html, { minWidth: 200 });
      m.on("click", () => onSelect && onSelect(l.id));
      layerRef.current.addLayer(m);
      markersRef.current[l.id] = m;
      pts.push([l.lat, l.lng]);
    });
    if (pts.length === 1) mapRef.current.setView(pts[0], 12);
    else if (pts.length) mapRef.current.fitBounds(pts, { padding: [44, 44], maxZoom: 12 });
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
