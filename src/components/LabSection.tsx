import type { SectionCopy, SideProject } from "@/data/types";
import { Container, SectionHeader } from "./SectionHeader";
import { TONE } from "./tone";

export function LabSection({ copy, projects, github }: { copy: SectionCopy; projects: SideProject[]; github: string }) {
  return (
    <section id="lab" className="relative scroll-mt-16 border-b border-line py-24 sm:py-32">
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,transparent,black_30%,black_70%,transparent)]" />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader copy={copy} accentClass="text-violet" />
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="reveal inline-flex items-center gap-2 rounded-[10px] border border-line3 bg-panel/80 px-4 py-2.5 font-mono text-xs text-fg2 transition hover:border-cyan/50 hover:text-cyan"
          >
            github.com/devGWeloper ↗
          </a>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const tone = TONE[p.tone];
            return (
              <li key={p.name} className={`reveal ${i === 0 ? "lg:col-span-2" : ""}`}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line2 bg-panel/85 p-6 transition duration-300 hover:-translate-y-1 hover:border-line3 hover:bg-panel2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-mono text-[10.5px] tracking-[0.16em] ${tone.text}`}>{p.tag}</span>
                    <span className="font-mono text-xs text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan">
                      ↗
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg2">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-md border border-line2 bg-bg2 px-2 py-0.5 font-mono text-[10.5px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
