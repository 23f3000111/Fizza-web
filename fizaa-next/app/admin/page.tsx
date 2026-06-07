"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { fetchJSON } from "@/lib/clientApi";
import type { Listing, Meta, DocFile } from "@/lib/types";

const AdminMapPicker = dynamic(() => import("@/components/AdminMapPicker"), { ssr: false });

const keyOf = (label: string) => label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const emptyMeta: Meta = { categories: [], subCategories: [], filterFields: [], cities: [], states: [], propertyTypes: [], dealTypes: [], total: 0 };

type Tab = "listings" | "taxonomy" | "submissions";
type AttrRow = { k: string; v: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState<Tab>("listings");
  const [meta, setMeta] = useState<Meta>(emptyMeta);
  const [listings, setListings] = useState<Listing[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [toast, setToast] = useState<{ msg: string; bad?: boolean } | null>(null);

  // form
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [attrRows, setAttrRows] = useState<AttrRow[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [keptImages, setKeptImages] = useState<string[]>([]);
  const [newDocs, setNewDocs] = useState<File[]>([]);
  const [keptDocs, setKeptDocs] = useState<DocFile[]>([]);
  const [existingPdf, setExistingPdf] = useState("");
  const [mapLat, setMapLat] = useState("");
  const [mapLng, setMapLng] = useState("");
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchJSON<{ authenticated: boolean }>("/api/admin/me").then((r) => setAuthed(r.authenticated)).catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) refreshAll();
  }, [authed]);

  function flash(msg: string, bad = false) {
    setToast({ msg, bad });
    setTimeout(() => setToast(null), 3200);
  }

  async function refreshAll() {
    const [m, ls, lds, inq, con] = await Promise.all([
      fetchJSON<Meta>("/api/meta"),
      fetchJSON<Listing[]>("/api/admin/listings"),
      fetchJSON<any[]>("/api/admin/leads"),
      fetchJSON<any[]>("/api/admin/inquiries"),
      fetchJSON<any[]>("/api/admin/contacts"),
    ]);
    setMeta(m); setListings(ls); setLeads(lds); setInquiries(inq); setContacts(con);
  }
  async function refreshMeta() { setMeta(await fetchJSON<Meta>("/api/meta")); }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");
    try {
      await fetchJSON("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      setAuthed(true);
    } catch (err) { setLoginErr((err as Error).message); }
  }
  async function logout() { await fetchJSON("/api/admin/logout", { method: "POST" }); setAuthed(false); }

  /* ── listing form ── */
  function resetForm() {
    formRef.current?.reset();
    setEditId(null); setAttrRows([]); setNewImages([]); setKeptImages([]); setNewDocs([]); setKeptDocs([]); setExistingPdf("");
    setMapLat(""); setMapLng("");
  }
  function openNew() { resetForm(); setShowForm(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }

  function editListing(l: Listing) {
    resetForm();
    setEditId(l.id);
    setShowForm(true);
    setKeptImages([...(l.images || [])]);
    setKeptDocs([...(l.documents || [])]);
    setExistingPdf(l.pdfUrl || "");
    setAttrRows(Object.entries(l.attributes || {}).map(([k, v]) => ({ k: labelFromKey(k), v })));
    setTimeout(() => {
      const f = formRef.current; if (!f) return;
      const set = (n: string, val: any) => { const el = f.elements.namedItem(n) as HTMLInputElement; if (el) el.value = val ?? ""; };
      set("title", l.title); set("segment", l.segment || ""); set("dealType", l.dealType); set("propertyType", l.propertyType); set("status", l.status);
      set("categoryName", meta.categories.find((c) => c.id === l.categoryId)?.name || "");
      set("subCategoryName", meta.subCategories.find((s) => s.id === l.subCategoryId)?.name || "");
      set("city", l.city); set("state", l.state); set("address", l.address);
      set("lat", l.lat); set("lng", l.lng);
      setMapLat(l.lat != null ? String(l.lat) : "");
      setMapLng(l.lng != null ? String(l.lng) : "");
      set("price", l.price); set("priceLabel", l.priceLabel); set("priceUnit", l.priceUnit);
      set("size", l.size); set("sizeUnit", l.sizeUnit); set("beds", l.beds); set("baths", l.baths);
      set("shortDesc", l.shortDesc); set("description", l.description); set("specs", (l.specs || []).join("\n"));
      (f.elements.namedItem("featured") as HTMLInputElement).checked = !!l.featured;
      f.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
  function labelFromKey(k: string) {
    return meta.filterFields.find((f) => f.key === k)?.label || k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, " ");
  }

  async function submitListing(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData();
    ["title", "segment", "dealType", "propertyType", "status", "categoryName", "subCategoryName", "city", "state", "address",
      "lat", "lng", "price", "priceLabel", "priceUnit", "size", "sizeUnit", "beds", "baths", "shortDesc", "description"]
      .forEach((k) => fd.append(k, (f.elements.namedItem(k) as HTMLInputElement)?.value || ""));
    fd.append("featured", (f.elements.namedItem("featured") as HTMLInputElement).checked ? "true" : "false");
    fd.append("specs", JSON.stringify(((f.elements.namedItem("specs") as HTMLTextAreaElement).value || "").split("\n").map((s) => s.trim()).filter(Boolean)));
    const attrs: Record<string, string> = {};
    attrRows.forEach((r) => { const k = keyOf(r.k); if (k && r.v.trim()) attrs[k] = r.v.trim(); });
    fd.append("attributes", JSON.stringify(attrs));
    fd.append("existingImages", JSON.stringify(keptImages));
    fd.append("existingDocuments", JSON.stringify(keptDocs));
    fd.append("existingPdf", existingPdf);
    newImages.forEach((file) => fd.append("images", file));
    newDocs.forEach((file) => fd.append("documents", file));

    setSaving(true);
    try {
      await fetchJSON(editId ? `/api/admin/listings/${editId}` : "/api/admin/listings", { method: editId ? "PUT" : "POST", body: fd });
      flash("Listing saved");
      setShowForm(false);
      await refreshAll();
    } catch (err) { flash((err as Error).message, true); }
    finally { setSaving(false); }
  }

  async function deleteListing(id: string) {
    if (!confirm("Delete this listing?")) return;
    await fetchJSON(`/api/admin/listings/${id}`, { method: "DELETE" });
    await refreshAll(); flash("Listing deleted");
  }

  /* ── render ── */
  if (authed === null) return <div className="min-h-screen grid place-items-center text-mute">Loading…</div>;

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-[#F4F2EC]">
        <form onSubmit={login} className="bg-white border border-line rounded-xl2 shadow-lg2 p-9 w-full max-w-[380px] text-center">
          <div className="w-[52px] h-[52px] rounded-xl bg-navy text-white grid place-items-center font-serif italic text-[26px] mx-auto mb-4">F</div>
          <h1 className="font-serif text-2xl">Fizaa Admin</h1>
          <p className="text-mute text-sm mb-5">Manage listings, categories &amp; submissions</p>
          <div className="text-left mb-1"><label className="field-label">Password</label><input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter admin password" required /></div>
          {loginErr && <p className="text-sm text-bad my-2">{loginErr}</p>}
          <button className="btn btn-primary btn-block mt-3">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F2EC]">
      {toast && <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 rounded-full text-white text-sm shadow-lg2 ${toast.bad ? "bg-bad" : "bg-good"}`}>{toast.msg}</div>}

      <div className="bg-navy text-white sticky top-0 z-50">
        <div className="max-w-site mx-auto px-4 sm:px-8 py-3.5 flex items-center gap-4">
          <div className="font-serif text-[19px] flex items-center gap-2.5"><span className="w-8 h-8 rounded-lg bg-brass grid place-items-center italic">F</span> Fizaa Admin</div>
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[#cdd9e6] text-[13.5px] hover:text-white">View site ↗</a>
          <button onClick={logout} className="text-[#cdd9e6] text-[13.5px] hover:text-white">Log out</button>
        </div>
        <div className="max-w-site mx-auto px-4 sm:px-8 flex gap-1 border-t border-white/10">
          {(["listings", "taxonomy", "submissions"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3.5 text-sm font-medium border-b-2 ${tab === t ? "border-brass text-white font-semibold" : "border-transparent text-[#b9c7d8]"}`}>
              {t === "listings" ? "Listings" : t === "taxonomy" ? "Categories & Filters" : "Submissions"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-8 py-7 pb-20">
        {tab === "listings" && (
          <>
            <div className="flex items-center justify-between gap-3.5 mb-4 flex-wrap">
              <h2 className="font-serif text-2xl">Listings</h2>
              <button onClick={openNew} className="btn btn-brass">+ New listing</button>
            </div>

            {showForm && (
              <form ref={formRef} onSubmit={submitListing} className="bg-white border border-line rounded-xl2 p-6 mb-6">
                <h2 className="font-serif text-xl mb-1">{editId ? "Edit listing" : "Create listing"}</h2>
                <p className="text-mute text-[13.5px] mb-3">New categories, locations and &ldquo;Others&rdquo; fields you type here are saved as suggestions for next time.</p>

                <Legend>Basics</Legend>
                <Field label="Title" req><input className="input" name="title" required placeholder="e.g. New Detached Factory in Banting" /></Field>
                <Field label="Segment (Industrial / Commercial / Hotel)" req>
                  <select className="select" name="segment" required>
                    <option value="">Select segment…</option>
                    <option value="industrial">Industrial</option>
                    <option value="commercial">Commercial</option>
                    <option value="hotel">Hotel</option>
                  </select>
                </Field>
                <div className="grid sm:grid-cols-3 gap-3.5">
                  <Field label="Deal type"><select className="select" name="dealType"><option value="sale">For Sale</option><option value="rent">For Rent</option></select></Field>
                  <Field label="Property type"><input className="input" name="propertyType" list="dl_ptype" placeholder="e.g. Factory" /></Field>
                  <Field label="Status"><select className="select" name="status"><option value="active">Active (visible)</option><option value="hidden">Hidden</option></select></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <Field label="Category"><input className="input" name="categoryName" list="dl_cat" placeholder="e.g. Industrial" /></Field>
                  <Field label="Sub-category"><input className="input" name="subCategoryName" list="dl_sub" placeholder="e.g. Project" /></Field>
                </div>

                <Legend>Location</Legend>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <Field label="City"><input className="input" name="city" list="dl_city" placeholder="e.g. Banting" /></Field>
                  <Field label="State"><input className="input" name="state" list="dl_state" placeholder="e.g. Selangor" /></Field>
                </div>
                <Field label="Address"><input className="input" name="address" placeholder="Full address / area" /></Field>
                <div className="mb-4">
                  <AdminMapPicker
                    lat={mapLat}
                    lng={mapLng}
                    onChange={(la, ln) => {
                      setMapLat(la); setMapLng(ln);
                      const f = formRef.current;
                      if (f) {
                        (f.elements.namedItem("lat") as HTMLInputElement).value = la;
                        (f.elements.namedItem("lng") as HTMLInputElement).value = ln;
                      }
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3 mt-2.5">
                    <Field label="Latitude (auto-filled by map)">
                      <input className="input bg-cream" name="lat" placeholder="Click map above" value={mapLat}
                        onChange={(e) => setMapLat(e.target.value)} />
                    </Field>
                    <Field label="Longitude (auto-filled by map)">
                      <input className="input bg-cream" name="lng" placeholder="Click map above" value={mapLng}
                        onChange={(e) => setMapLng(e.target.value)} />
                    </Field>
                  </div>
                </div>

                <Legend>Pricing &amp; size</Legend>
                <div className="grid sm:grid-cols-3 gap-3.5">
                  <Field label="Price (number)"><input className="input" name="price" placeholder="e.g. 3500000" /></Field>
                  <Field label="Price label (shown)"><input className="input" name="priceLabel" placeholder="e.g. From RM 3.5M / Contact" /></Field>
                  <Field label="Price unit"><input className="input" name="priceUnit" defaultValue="MYR" /></Field>
                </div>
                <div className="grid sm:grid-cols-4 gap-3.5">
                  <Field label="Size"><input className="input" name="size" placeholder="e.g. 45936" /></Field>
                  <Field label="Size unit"><input className="input" name="sizeUnit" placeholder="sqft built-up" /></Field>
                  <Field label="Beds"><input className="input" name="beds" placeholder="—" /></Field>
                  <Field label="Baths"><input className="input" name="baths" placeholder="—" /></Field>
                </div>
                <label className="flex items-center gap-2.5 my-1.5 text-sm"><input type="checkbox" name="featured" className="w-4 h-4 accent-navy" /> Feature on home page</label>

                <Legend>Description</Legend>
                <Field label="Short description (cards)"><input className="input" name="shortDesc" placeholder="One-line summary" /></Field>
                <Field label="Full description"><textarea className="textarea" name="description" placeholder="Full property description…" /></Field>
                <Field label="Highlights / specs (one per line)"><textarea className="textarea" name="specs" placeholder={"45,936 sqft built-up\n10m eave height\n1,000 amp power"} /></Field>

                <Legend>&ldquo;Others&rdquo; — extra filterable attributes</Legend>
                <p className="text-xs text-mute mb-2.5">Anything that doesn&apos;t fit a category — e.g. Tenure: Freehold. These appear as filters on the listings page.</p>
                {attrRows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                    <input className="input" placeholder="Label (e.g. Tenure)" value={r.k} onChange={(e) => setAttrRows((a) => a.map((x, j) => j === i ? { ...x, k: e.target.value } : x))} />
                    <input className="input" placeholder="Value (e.g. Freehold)" value={r.v} onChange={(e) => setAttrRows((a) => a.map((x, j) => j === i ? { ...x, v: e.target.value } : x))} />
                    <button type="button" onClick={() => setAttrRows((a) => a.filter((_, j) => j !== i))} className="px-3 rounded-lg bg-cream border border-line text-bad">×</button>
                  </div>
                ))}
                <button type="button" onClick={() => setAttrRows((a) => [...a, { k: "", v: "" }])} className="btn btn-ghost btn-sm">+ Add attribute</button>

                <Legend>Media</Legend>
                <div className="mb-4">
                  <label className="field-label">Photos (images)</label>
                  <label className="block border border-dashed border-line-strong rounded-xl p-4 text-center text-[13.5px] text-mute cursor-pointer hover:border-navy hover:text-navy">
                    Click to upload images (JPG, PNG, WebP) — up to 12
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { setNewImages((arr) => [...arr, ...Array.from(e.target.files || [])]); e.target.value = ""; }} />
                  </label>
                  <div className="flex flex-wrap gap-2.5 mt-2.5">
                    {keptImages.map((url, i) => <Thumb key={"k" + i} src={url} onDel={() => setKeptImages((a) => a.filter((_, j) => j !== i))} />)}
                    {newImages.map((file, i) => <Thumb key={"n" + i} src={URL.createObjectURL(file)} onDel={() => setNewImages((a) => a.filter((_, j) => j !== i))} />)}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="field-label">Brochures &amp; documents (PDF, Word)</label>
                  <label className="block border border-dashed border-line-strong rounded-xl p-4 text-center text-[13.5px] text-mute cursor-pointer hover:border-navy hover:text-navy">
                    Click to upload documents (PDF, DOC, DOCX, XLS, XLSX) — multiple allowed
                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple className="hidden" onChange={(e) => { setNewDocs((arr) => [...arr, ...Array.from(e.target.files || [])]); e.target.value = ""; }} />
                  </label>
                  <div className="flex flex-col gap-1.5 mt-2.5">
                    {keptDocs.map((d, i) => <DocChip key={"kd" + i} name={d.name} onDel={() => setKeptDocs((a) => a.filter((_, j) => j !== i))} />)}
                    {newDocs.map((f, i) => <DocChip key={"nd" + i} name={f.name} onDel={() => setNewDocs((a) => a.filter((_, j) => j !== i))} />)}
                    {existingPdf && <DocChip name={"Brochure: " + (existingPdf.split("/").pop() || "PDF")} onDel={() => setExistingPdf("")} />}
                  </div>
                </div>

                <div className="flex gap-2.5 mt-5 pt-4 border-t border-line-2">
                  <button className="btn btn-brass" type="submit" disabled={saving}>{saving ? "Saving…" : "Save listing"}</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setShowForm(false)} disabled={saving}>Cancel</button>
                </div>
              </form>
            )}

            <div className="bg-white border border-line rounded-xl2 p-6 overflow-x-auto">
              {listings.length === 0 ? (
                <div className="text-center text-mute py-12">No listings yet. Click &ldquo;New listing&rdquo; to add your first one.</div>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="text-left text-[11.5px] uppercase tracking-wide text-mute">{["", "Title", "Segment", "Type", "Deal", "Price", "Status", ""].map((h, i) => <th key={i} className="px-3 py-2.5 border-b border-line">{h}</th>)}</tr></thead>
                  <tbody>
                    {[...listings].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).map((l) => (
                      <tr key={l.id} className="hover:bg-[#FAF8F3]">
                        <td className="px-3 py-3 border-b border-line-2">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={(l.images && l.images[0]) || "/img/placeholder.svg"} alt="" className="w-[52px] h-10 rounded-md object-cover bg-cream" /></td>
                        <td className="px-3 py-3 border-b border-line-2"><b>{l.title}</b><div className="text-xs text-mute">{[l.city, l.state].filter(Boolean).join(", ")}</div></td>
                        <td className="px-3 py-3 border-b border-line-2">{l.segment ? <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-navy-soft text-navy-2 capitalize">{l.segment}</span> : <span className="text-faint text-xs">—</span>}</td>
                        <td className="px-3 py-3 border-b border-line-2">{l.propertyType || "—"}</td>
                        <td className="px-3 py-3 border-b border-line-2"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${l.dealType === "rent" ? "bg-brass-soft text-brass-2" : "bg-navy-soft text-navy-2"}`}>{l.dealType === "rent" ? "Rent" : "Sale"}</span></td>
                        <td className="px-3 py-3 border-b border-line-2">{l.priceLabel || (l.price != null ? `${l.priceUnit || "MYR"} ${Number(l.price).toLocaleString("en-MY")}` : "—")}</td>
                        <td className="px-3 py-3 border-b border-line-2">{l.status === "hidden" ? <span className="text-mute text-xs">Hidden</span> : "Active"}{l.featured ? " ⭐" : ""}</td>
                        <td className="px-3 py-3 border-b border-line-2 whitespace-nowrap"><button onClick={() => editListing(l)} className="text-navy font-semibold text-[13px] px-2">Edit</button><button onClick={() => deleteListing(l.id)} className="text-bad font-semibold text-[13px] px-2">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === "taxonomy" && <Taxonomy meta={meta} refreshMeta={refreshMeta} flash={flash} />}

        {tab === "submissions" && (
          <>
            <Card title="Chatbot leads" action={<a href="/api/admin/leads?format=csv" className="btn btn-ghost btn-sm">Download CSV</a>}>
              <p className="text-mute text-[13.5px] mb-3">Captured by the website chatbot. A CSV of each day&apos;s leads is emailed to the client nightly at 1am.</p>
              <Table empty={leads.length === 0} head={["Date", "Name", "Phone", "Email", "Source"]} rows={leads.map((l) => [fmt(l.createdAt), l.name, l.phone, l.email || "—", l.source || ""])} />
            </Card>
            <Card title="Quote / inquiry requests">
              <Table empty={inquiries.length === 0} head={["Date", "Name", "Contact", "Looking for", "Message"]} rows={inquiries.map((i) => [fmt(i.createdAt), i.name || "—", `${i.mobile || ""} ${i.email || ""}`, [i.propertyType, i.listingTitle].filter(Boolean).join(" · ") || "—", (i.message || "").slice(0, 80)])} />
            </Card>
            <Card title="Contact messages">
              <Table empty={contacts.length === 0} head={["Date", "Name", "Email", "Message"]} rows={contacts.map((c) => [fmt(c.createdAt), `${c.firstName} ${c.lastName || ""}`, c.email, (c.message || "").slice(0, 90)])} />
            </Card>
          </>
        )}
      </div>

      {/* datalists */}
      <datalist id="dl_ptype">{meta.propertyTypes.map((t) => <option key={t} value={t} />)}</datalist>
      <datalist id="dl_cat">{meta.categories.map((c) => <option key={c.id} value={c.name} />)}</datalist>
      <datalist id="dl_sub">{[...new Set(meta.subCategories.map((s) => s.name))].map((n) => <option key={n} value={n} />)}</datalist>
      <datalist id="dl_city">{meta.cities.map((c) => <option key={c} value={c} />)}</datalist>
      <datalist id="dl_state">{(meta.states.length ? meta.states : ["Selangor", "Kuala Lumpur", "Negeri Sembilan", "Johor", "Penang"]).map((s) => <option key={s} value={s} />)}</datalist>
    </div>
  );
}

function fmt(s: string) { return new Date(s).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" }); }

function Legend({ children }: { children: React.ReactNode }) {
  return <div className="text-xs tracking-[0.1em] uppercase text-brass-2 font-bold mt-[18px] mb-3 pb-1.5 border-b border-line-2">{children}</div>;
}
function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return <div className="mb-4"><label className="field-label">{label} {req && <span className="text-brass-2">*</span>}</label>{children}</div>;
}
function Thumb({ src, onDel }: { src: string; onDel: () => void }) {
  return (
    <div className="relative w-[84px] h-16 rounded-lg overflow-hidden border border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover" />
      <button type="button" onClick={onDel} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white text-[13px] leading-none">×</button>
    </div>
  );
}
function DocChip({ name, onDel }: { name: string; onDel: () => void }) {
  return (
    <div className="flex items-center gap-2.5 bg-cream border border-line rounded-lg px-3 py-2 text-[13px]">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-brass-2 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
      <span className="flex-1 truncate">{name}</span>
      <button type="button" onClick={onDel} className="text-bad text-[15px] leading-none px-1">×</button>
    </div>
  );
}
function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-line rounded-xl2 p-6 mb-5 overflow-x-auto">
      <div className="flex items-center justify-between gap-3.5 mb-3 flex-wrap"><h2 className="font-serif text-xl">{title}</h2>{action}</div>
      {children}
    </div>
  );
}
function Table({ head, rows, empty }: { head: string[]; rows: React.ReactNode[][]; empty: boolean }) {
  if (empty) return <div className="text-center text-mute py-8">Nothing yet.</div>;
  return (
    <table className="w-full text-sm border-collapse">
      <thead><tr className="text-left text-[11.5px] uppercase tracking-wide text-mute">{head.map((h, i) => <th key={i} className="px-3 py-2.5 border-b border-line">{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i} className="hover:bg-[#FAF8F3]">{r.map((c, j) => <td key={j} className="px-3 py-3 border-b border-line-2 align-top">{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

function Taxonomy({ meta, refreshMeta, flash }: { meta: Meta; refreshMeta: () => Promise<void>; flash: (m: string, bad?: boolean) => void }) {
  const [catName, setCatName] = useState("");
  const [subName, setSubName] = useState("");
  const [subCat, setSubCat] = useState("");
  const [ffLabel, setFfLabel] = useState("");
  const [ffType, setFfType] = useState("text");
  const [ffOpts, setFfOpts] = useState("");

  async function del(url: string, msg: string) { await fetchJSON(url, { method: "DELETE" }); await refreshMeta(); flash(msg); }

  return (
    <>
      <Card title="Categories">
        <p className="text-mute text-[13.5px] mb-3">Top-level groups (e.g. Industrial, Commercial).</p>
        <form onSubmit={async (e) => { e.preventDefault(); if (!catName.trim()) return; try { await fetchJSON("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: catName }) }); setCatName(""); await refreshMeta(); flash("Category added"); } catch (err) { flash((err as Error).message, true); } }} className="flex gap-2 flex-wrap mb-4">
          <input className="input max-w-[280px]" value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="New category name" />
          <button className="btn btn-primary">Add category</button>
        </form>
        <Tags items={meta.categories.map((c) => ({ id: c.id, label: c.name }))} onDel={(id) => del(`/api/admin/categories/${id}`, "Category deleted")} empty="No categories yet." />
      </Card>

      <Card title="Sub-categories">
        <p className="text-mute text-[13.5px] mb-3">Belong to a category (e.g. Project, Rental, Subsale, Land, Hotel).</p>
        <form onSubmit={async (e) => { e.preventDefault(); if (!subName.trim() || !subCat) { flash("Pick a category and name", true); return; } await fetchJSON("/api/admin/subcategories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: subName, categoryId: subCat }) }); setSubName(""); await refreshMeta(); flash("Sub-category added"); }} className="flex gap-2 flex-wrap mb-4">
          <select className="select max-w-[220px]" value={subCat} onChange={(e) => setSubCat(e.target.value)}><option value="">Select category…</option>{meta.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <input className="input max-w-[240px]" value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="New sub-category name" />
          <button className="btn btn-primary">Add sub-category</button>
        </form>
        <Tags items={meta.subCategories.map((s) => ({ id: s.id, label: `${s.name} · ${meta.categories.find((c) => c.id === s.categoryId)?.name || "—"}` }))} onDel={(id) => del(`/api/admin/subcategories/${id}`, "Sub-category deleted")} empty="No sub-categories yet." />
      </Card>

      <Card title="“Others” filter fields">
        <p className="text-mute text-[13.5px] mb-3">Extra filters shown on the listings page (e.g. Tenure, Build Status).</p>
        <form onSubmit={async (e) => { e.preventDefault(); if (!ffLabel.trim()) return; await fetchJSON("/api/admin/filter-fields", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ label: ffLabel, type: ffType, options: ffOpts }) }); setFfLabel(""); setFfOpts(""); await refreshMeta(); flash("Filter field added"); }} className="flex gap-2 flex-wrap items-center mb-4">
          <input className="input max-w-[200px]" value={ffLabel} onChange={(e) => setFfLabel(e.target.value)} placeholder="Label (e.g. Tenure)" />
          <select className="select max-w-[150px]" value={ffType} onChange={(e) => setFfType(e.target.value)}><option value="text">Text</option><option value="select">Select (options)</option></select>
          <input className="input max-w-[280px]" value={ffOpts} onChange={(e) => setFfOpts(e.target.value)} placeholder="Options, comma-separated" />
          <button className="btn btn-primary">Add field</button>
        </form>
        <Tags items={meta.filterFields.map((f) => ({ id: f.id, label: `${f.label} · ${f.type}${f.options?.length ? " (" + f.options.join(", ") + ")" : ""}` }))} onDel={(id) => del(`/api/admin/filter-fields/${id}`, "Field deleted")} empty="No extra fields yet." />
      </Card>
    </>
  );
}

function Tags({ items, onDel, empty }: { items: { id: string; label: string }[]; onDel: (id: string) => void; empty: string }) {
  if (!items.length) return <span className="text-xs text-mute">{empty}</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span key={it.id} className="inline-flex items-center gap-2 bg-cream border border-line rounded-full pl-3.5 pr-2 py-1.5 text-[13px]">
          {it.label} <button onClick={() => onDel(it.id)} className="text-bad text-[15px] leading-none">×</button>
        </span>
      ))}
    </div>
  );
}
