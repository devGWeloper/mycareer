import type { LogEvent } from "@/data/types";
import { TONE } from "./tone";

function Row({ events, hidden }: { events: LogEvent[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {events.map((e) => (
        <li key={`${e.time}-${e.type}`} className="flex items-center gap-3 px-6 font-mono text-[12px] whitespace-nowrap">
          <span className="text-dim">[{e.time}]</span>
          <span className={`rounded border px-1.5 py-0.5 text-[10.5px] tracking-wider ${TONE[e.tone].text} ${TONE[e.tone].border} ${TONE[e.tone].bg}`}>
            {e.type}
          </span>
          <span className="text-fg2">{e.message}</span>
          <span className="ml-3 text-dim">›</span>
        </li>
      ))}
    </ul>
  );
}

/** 커리어를 MES 랏 이력(Lot History)처럼 흘려보내는 띠 */
export function EventTicker({ events }: { events: LogEvent[] }) {
  return (
    <div className="marquee-wrap relative overflow-hidden border-b border-line bg-panel/60 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center gap-2 bg-gradient-to-r from-bg via-bg to-transparent pr-10 pl-4 font-mono text-[10.5px] tracking-[0.18em] text-cyan sm:pl-6">
        <span className="dot-live size-1.5 rounded-full" />
        LOT HISTORY
      </div>
      <div className="marquee flex w-max">
        <Row events={events} />
        <Row events={events} hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
