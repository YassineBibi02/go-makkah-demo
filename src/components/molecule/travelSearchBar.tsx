// <SearchBarExact /> — popovers fully clickable, Enter-safe, with inline results option
"use client";
import React from "react";
import { Card, CardContent } from "@/components/atom/card";
import { Button } from "@/components/atom/button";

/** Toggle: show inline results under the bar (true) vs navigate to /recherche (false) */
const SHOW_INLINE_RESULTS = true;

/* ------------- helpers ------------- */
function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function addDays(d: Date, by: { days: number }) {
  const out = new Date(d);
  out.setDate(out.getDate() + by.days);
  return out;
}
function formatFR(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

/** Close when clicking outside any of the provided refs. */
function useOutsideClose(
  open: boolean,
  refs: ReadonlyArray<React.RefObject<HTMLElement | null>>,
  close: () => void
) {
  React.useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const inside = refs.some((r) => r.current && target && r.current.contains(target));
      if (!inside) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, refs]);
}

/** Stop outside-close and parent toggles for any interaction inside the popover */
const stopInsideCaptureProps = {
  onPointerDownCapture: (e: React.PointerEvent) => e.stopPropagation(),
  onMouseDownCapture: (e: React.MouseEvent) => e.stopPropagation(),
  onClickCapture: (e: React.MouseEvent) => e.stopPropagation(),
};

/* ------------- small UI bits ------------- */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-black">
      <span className="text-sm text-slate-700">{label}</span>
      {children}
    </div>
  );
}

function Stepper({
  value,
  setValue,
  min = 0,
  max = 12,
  "aria-label": ariaLabel,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
  "aria-label"?: string;
}) {
  return (
    <div className="inline-flex items-center rounded-md border" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className="px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40"
        onClick={() => setValue(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer"
      >
        −
      </button>
      <span className="px-3 py-1.5 min-w-[2ch] text-center text-sm" aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        className="px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40"
        onClick={() => setValue(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}

/** Mock inline results slot (replace with your real results list) */
function InlineResults({ query }: { query: URLSearchParams }) {
  const entries = Array.from(query.entries());
  return (
    <div className="mt-4 border border-slate-200 rounded-lg p-4">
      <div className="font-semibold mb-2 text-black">Résultats (démo)</div>
      <ul className="text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-y-1">
        {entries.map(([k, v]) => (
          <li key={k}>
            <span className="text-slate-500">{k}:</span> <span className="text-black">{v}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-3">Remplacez par votre composant de résultats.</p>
    </div>
  );
}

/* ------------- main component ------------- */
export default function SearchBarExact() {
  // state
  const [destination, setDestination] = React.useState("Antalya");
  const [arrive, setArrive] = React.useState(toISO(addDays(new Date(), { days: 14 })));
  const [depart, setDepart] = React.useState(toISO(addDays(new Date(), { days: 20 })));
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  // popovers
  const [openDest, setOpenDest] = React.useState(false);
  const [openArrive, setOpenArrive] = React.useState(false);
  const [openDepart, setOpenDepart] = React.useState(false);
  const [openGuests, setOpenGuests] = React.useState(false);

  // results
  const [showResults, setShowResults] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState<URLSearchParams | null>(null);

  const destinations = ["Antalya", "Istanbul", "Kuala Lumpur"];

  // refs (containers + popovers)
  const destFieldRef = React.useRef<HTMLDivElement | null>(null);
  const destPopoverRef = React.useRef<HTMLDivElement | null>(null);

  const arriveFieldRef = React.useRef<HTMLDivElement | null>(null);
  const arrivePopoverRef = React.useRef<HTMLDivElement | null>(null);

  const departFieldRef = React.useRef<HTMLDivElement | null>(null);
  const departPopoverRef = React.useRef<HTMLDivElement | null>(null);

  const guestsFieldRef = React.useRef<HTMLDivElement | null>(null);
  const guestsPopoverRef = React.useRef<HTMLDivElement | null>(null);

  useOutsideClose(openDest, [destFieldRef, destPopoverRef], () => setOpenDest(false));
  useOutsideClose(openArrive, [arriveFieldRef, arrivePopoverRef], () => setOpenArrive(false));
  useOutsideClose(openDepart, [departFieldRef, departPopoverRef], () => setOpenDepart(false));
  useOutsideClose(openGuests, [guestsFieldRef, guestsPopoverRef], () => setOpenGuests(false));

  const destId = React.useId();
  const arriveId = React.useId();
  const departId = React.useId();
  const guestsId = React.useId();

  function buildQuery(): URLSearchParams {
    return new URLSearchParams({
      destination,
      arrive,
      depart,
      rooms: String(rooms),
      adults: String(adults),
      children: String(children),
    });
  }

  function submitOrShow() {
    const arriveMs = new Date(arrive).setHours(0, 0, 0, 0);
    const departMs = new Date(depart).setHours(0, 0, 0, 0);
    if (arriveMs > departMs) {
      alert("La date de départ doit être après l’arrivée.");
      return;
    }
    const params = buildQuery();
    if (SHOW_INLINE_RESULTS) {
      setLastQuery(params);
      setShowResults(true);
      setOpenDest(false);
      setOpenArrive(false);
      setOpenDepart(false);
      setOpenGuests(false);
    } else {
      window.location.href = `/recherche?${params.toString()}`;
    }
  }

  /** Block native Enter submit; route to submitOrShow() instead (unless the submit button is focused). */
  function onFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    const isSubmit = (e.target as HTMLElement | null)?.closest("button[type='submit']");
    if (!isSubmit) {
      e.preventDefault();
      submitOrShow();
    }
  }

  return (
    <section className="hidden md:block">
      <Card className="w-full bg-white border border-[#bbbbbb] rounded-[5px]">
        <CardContent className="p-0">
          <form onKeyDown={onFormKeyDown} onSubmit={(e) => (e.preventDefault(), submitOrShow())} className="relative">
            {/* the row */}
            <div className="flex items-center h-20">
              {/* Destination (trigger on field container, NOT overlay button) */}
              <div
                ref={destFieldRef}
                className="relative flex-1 flex items-center px-4 pl-6 border-r border-[#d9d9d9] cursor-pointer"
                onClick={(e) => {
                  // Ignore clicks originating from popover
                  if ((e.target as HTMLElement).closest(".popover")) return;
                  setOpenDest((v) => !v);
                }}
                role="button"
                aria-haspopup="dialog"
                aria-expanded={openDest}
                aria-controls={destId}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenDest((v) => !v))}
              >
                <img className="w-[23px] h-[23px] object-cover mr-3" alt="Carte" src="/mapIcon.png" />
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold text-[#74747c] text-[11px] leading-[normal]">Où allez-vous?</div>
                  <div className="font-semibold text-black text-sm leading-[normal] truncate">{destination}</div>
                </div>

                {openDest && (
                  <div
                    ref={destPopoverRef}
                    id={destId}
                    role="dialog"
                    aria-label="Choisir la destination"
                    className="popover"
                    {...stopInsideCaptureProps}
                  >
                    <input
                      autoFocus
                      type="search"
                      placeholder="Rechercher une destination…"
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none text-black"
                      onChange={(e) => {
                        const q = e.target.value.toLowerCase();
                        const first = destinations.find((d) => d.toLowerCase().includes(q));
                        if (first) setDestination(first);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setOpenDest(false);
                        }
                      }}
                    />
                    <div className="mt-3 grid gap-2">
                      {destinations.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setDestination(d);
                            setOpenDest(false);
                          }}
                          className={`rounded-md px-3 py-2 text-left text-sm text-black hover:bg-slate-50 ${
                            d === destination ? "ring-1 ring-[#2163ae]" : ""
                          }`}
                          aria-current={d === destination ? "true" : undefined}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Arrivée */}
              <div
                ref={arriveFieldRef}
                className="relative flex-1 flex items-center px-4 border-r border-[#d9d9d9] cursor-pointer"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".popover")) return;
                  setOpenArrive((v) => !v);
                }}
                role="button"
                aria-haspopup="dialog"
                aria-expanded={openArrive}
                aria-controls={arriveId}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenArrive((v) => !v))}
              >
                <img className="w-7 h-7 object-cover mr-3" alt="Calendrier" src="/calenderIcon.png" />
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold text-[#74747c] text-[11px] leading-[normal]">Arrivées</div>
                  <div className="font-semibold text-black text-sm leading-[normal] truncate">{formatFR(arrive)}</div>
                </div>

                {openArrive && (
                  <div
                    ref={arrivePopoverRef}
                    id={arriveId}
                    role="dialog"
                    aria-label="Choisir la date d’arrivée"
                    className="popover"
                    {...stopInsideCaptureProps}
                  >
                    <input
                      type="date"
                      value={arrive}
                      onChange={(e) => setArrive(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none text-black"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), setOpenArrive(false))}
                    />
                    <div className="mt-3 flex justify-end">
                      <button type="button" className="btn" onClick={() => setOpenArrive(false)}>
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Départ */}
              <div
                ref={departFieldRef}
                className="relative flex-1 flex items-center px-4 border-r border-[#d9d9d9] cursor-pointer"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".popover")) return;
                  setOpenDepart((v) => !v);
                }}
                role="button"
                aria-haspopup="dialog"
                aria-expanded={openDepart}
                aria-controls={departId}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenDepart((v) => !v))}
              >
                <img className="w-7 h-7 object-cover mr-3" alt="Calendrier" src="/calenderIcon.png" />
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold text-[#74747c] text-[11px] leading-[normal]">Départ</div>
                  <div className="font-semibold text-black text-sm leading-[normal] truncate">{formatFR(depart)}</div>
                </div>

                {openDepart && (
                  <div
                    ref={departPopoverRef}
                    id={departId}
                    role="dialog"
                    aria-label="Choisir la date de départ"
                    className="popover"
                    {...stopInsideCaptureProps}
                  >
                    <input
                      type="date"
                      value={depart}
                      min={arrive}
                      onChange={(e) => setDepart(e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none text-black"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), setOpenDepart(false))}
                    />
                    <div className="mt-3 flex justify-end">
                      <button type="button" className="btn" onClick={() => setOpenDepart(false)}>
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Guests */}
              <div
                ref={guestsFieldRef}
                className="relative flex-1 flex items-center px-4 cursor-pointer"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".popover")) return;
                  setOpenGuests((v) => !v);
                }}
                role="button"
                aria-haspopup="dialog"
                aria-expanded={openGuests}
                aria-controls={guestsId}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenGuests((v) => !v))}
              >
                <img className="w-[29px] h-[29px] object-cover mr-3" alt="Invités" src="/peopleIcon.png" />
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold text-[#74747c] text-[11px] leading-[normal]">Chambres et invité</div>
                  <div className="font-semibold text-black text-sm leading-[normal] truncate">
                    {rooms} chambre{rooms > 1 ? "s" : ""}, {adults} adulte{adults > 1 ? "s" : ""}
                    {children ? `, ${children} enfant${children > 1 ? "s" : ""}` : ""}
                  </div>
                </div>

                {openGuests && (
                  <div
                    ref={guestsPopoverRef}
                    id={guestsId}
                    role="dialog"
                    aria-label="Modifier le nombre d’invités"
                    className="popover"
                    {...stopInsideCaptureProps}
                  >
                    <Row label="Chambres">
                      <Stepper value={rooms} setValue={setRooms} min={1} aria-label="Chambres" />
                    </Row>
                    <Row label="Adultes">
                      <Stepper value={adults} setValue={setAdults} min={1} aria-label="Adultes" />
                    </Row>
                    <Row label="Enfants">
                      <Stepper value={children} setValue={setChildren} min={0} aria-label="Enfants" />
                    </Row>
                    <div className="mt-3 flex justify-end">
                      <button type="button" className="btn" onClick={() => setOpenGuests(false)}>
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="h-[54px] bg-[#2163ae] text-white rounded-[5px] px-8 mx-4">
                <span className="font-semibold text-base leading-[normal]">Rechercher</span>
              </Button>
            </div>

            {/* styles */}
            <style jsx>{`
              .popover {
                position: absolute;
                left: 0;
                top: calc(100% + 8px);
                z-index: 40;
                width: min(360px, 90vw);
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
                padding: 12px;
              }
              .btn {
                background: #2163ae;
                color: #fff;
                border-radius: 6px;
                padding: 8px 12px;
                font-size: 0.875rem;
              }
            `}</style>
          </form>

          {/* Inline results */}
          {SHOW_INLINE_RESULTS && showResults && lastQuery && <InlineResults query={lastQuery} />}
        </CardContent>
      </Card>
    </section>
  );
}
