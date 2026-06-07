"use client";

import { useCallback, useEffect, useState } from "react";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const imgs = images.length ? images : ["/img/placeholder.svg"];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const step = useCallback((d: number) => setIdx((i) => (i + d + imgs.length) % imgs.length), [imgs.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const openAt = (i: number) => { setIdx(i); setOpen(true); };

  return (
    <>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-3">
        <button onClick={() => openAt(0)} className="aspect-[16/10] rounded-xl2 overflow-hidden bg-cream cursor-zoom-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[0]} alt={title} className="w-full h-full object-cover" />
        </button>
        <div className="grid grid-cols-2 lg:grid-cols-1 grid-rows-2 gap-3">
          {[1, 2].map((i) => (
            <button key={i} onClick={() => openAt(Math.min(i, imgs.length - 1))} className="rounded-xl overflow-hidden bg-cream relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgs[i] || imgs[0]} alt="" className="w-full h-full object-cover" />
              {i === 2 && imgs.length > 3 && (
                <span className="absolute inset-0 bg-navy-2/60 text-white grid place-items-center font-semibold">+{imgs.length - 3} more</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }} className="fixed inset-0 z-[400] bg-[#08101a]/95 flex items-center justify-center">
          <button onClick={() => setOpen(false)} className="absolute top-5 right-5 w-[46px] h-[46px] rounded-full bg-white/15 text-white text-2xl">×</button>
          <button onClick={() => step(-1)} className="absolute left-5 top-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-white/15 text-white text-2xl">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[idx]} alt="" className="max-w-[92vw] max-h-[86vh] rounded-lg" />
          <button onClick={() => step(1)} className="absolute right-5 top-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-white/15 text-white text-2xl">›</button>
        </div>
      )}
    </>
  );
}
