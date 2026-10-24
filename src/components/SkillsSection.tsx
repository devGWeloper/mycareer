import type { Resume } from "@/data/types";
import { Container, SectionHeader } from "./SectionHeader";

const RACK_TONE = ["text-amber", "text-violet", "text-cyan", "text-blue", "text-green"];

function Card({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`reveal rounded-2xl border border-line2 bg-panel/80 p-6 ${className}`}>
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted">{label}</p>
      {children}
    </div>
  );
}

export function SkillsSection({ resume }: { resume: Resume }) {
  return (
    <section id="skills" className="scroll-mt-16 border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHeader copy={resume.sections.skills} />

        <div className="reveal mt-14 overflow-hidden rounded-2xl border border-line2 bg-panel/80">
          {resume.skills.map((g, i) => (
            <div key={g.code} className="grid gap-4 border-b border-line px-6 py-5 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-8">
              <div className="flex items-center gap-3">
                <span className={`size-2 rounded-full bg-current shadow-[0_0_10px_currentColor] ${RACK_TONE[i % RACK_TONE.length]}`} />
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{g.code}</span>
                <span className="font-semibold">{g.category}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line2 bg-bg2 px-3 py-1.5 text-sm text-fg2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card label="EDUCATION">
            {resume.education.map((e) => (
              <div key={e.school} className="mt-4">
                <p className="text-lg font-bold">{e.school}</p>
                <p className="mt-1 text-sm text-fg2">{e.major}</p>
                <p className="mt-1 font-mono text-xs text-muted">{e.period}</p>
                <ul className="mt-4 space-y-1.5">
                  {e.notes.map((n) => (
                    <li key={n} className="flex gap-2 text-sm leading-relaxed">
                      <span aria-hidden className="text-cyan">-</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          <Card label="CERTIFICATIONS">
            <ul className="mt-4 space-y-4">
              {resume.certifications.map((c) => (
                <li key={c.name}>
                  <p className="text-lg font-bold">{c.name}</p>
                  <p className="mt-0.5 text-sm text-fg2">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card label="RESEARCH FOCUS">
            <ul className="mt-4 space-y-3">
              {resume.focus.map((f) => (
                <li key={f} className="rounded-lg border border-violet/30 bg-violet/10 px-3 py-2.5 text-sm font-medium">
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card label="AWARDS · ACTIVITIES" className="mt-4">
          <ul className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {resume.activities.map((a) => (
              <li key={a.title}>
                <p className="flex items-baseline gap-2 font-semibold">
                  {a.year && <span className="font-mono text-xs text-amber">{a.year}</span>}
                  {a.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
