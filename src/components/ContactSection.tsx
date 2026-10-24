import type { Resume } from "@/data/types";
import { Accent, Container } from "./SectionHeader";
import { Logo } from "./TopBar";

export function ContactSection({ resume }: { resume: Resume }) {
  const copy = resume.sections.contact;
  return (
    <section id="contact" className="relative isolate scroll-mt-16 overflow-clip py-28 sm:py-40">
      <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(62_224_255/0.14),rgb(169_139_255/0.08)_40%,transparent_70%)]" />

      <Container className="text-center">
        <p className="reveal font-mono text-[11px] tracking-[0.22em] text-cyan">
          {copy.index} — {copy.eyebrow}
        </p>
        <h2 className="reveal mx-auto mt-6 max-w-3xl text-3xl leading-[1.25] font-extrabold tracking-[-0.03em] whitespace-pre-line sm:text-5xl">
          <Accent text={copy.title} accent={copy.accent} className="text-gradient" />
        </h2>
        {copy.description && <p className="reveal mx-auto mt-6 max-w-xl leading-relaxed text-fg2 sm:text-lg">{copy.description}</p>}

        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3.5 font-bold text-bg shadow-[0_0_40px_rgb(62_224_255/0.35)] transition hover:shadow-[0_0_56px_rgb(62_224_255/0.55)]"
          >
            {resume.email}
          </a>
          <a
            href={resume.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border border-line3 bg-panel/80 px-6 py-3.5 font-semibold transition hover:border-cyan/50 hover:text-cyan"
          >
            GitHub ↗
          </a>
        </div>
      </Container>

      <footer className="mt-28 border-t border-line pt-8">
        <Container className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <span className="flex items-center gap-2">
            <Logo className="size-4" />
            © 2026 {resume.nameEn}
          </span>
          <span>FAB MES → Agentic AI · Built with Next.js</span>
        </Container>
      </footer>
    </section>
  );
}
