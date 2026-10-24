import { CareerSection } from "@/components/CareerSection";
import { CompetencySection } from "@/components/CompetencySection";
import { ContactSection } from "@/components/ContactSection";
import { DomainSection } from "@/components/DomainSection";
import { EventTicker } from "@/components/EventTicker";
import { Hero } from "@/components/Hero";
import { LabSection } from "@/components/LabSection";
import { ResultsSection } from "@/components/ResultsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TopBar } from "@/components/TopBar";
import { resume } from "@/data/resume";

export default function Home() {
  const { sections } = resume;

  return (
    <>
      <TopBar name={resume.name} nameEn={resume.nameEn} />
      <main>
        <Hero resume={resume} />
        <EventTicker events={resume.events} />
        <CompetencySection copy={sections.competency} items={resume.competencies} />
        <DomainSection copy={sections.domain} domain={resume.domain} />
        <CareerSection copy={sections.career} company={resume.company} career={resume.career} milestones={resume.milestones} />
        <ResultsSection copy={sections.results} cases={resume.cases} />
        <LabSection copy={sections.lab} projects={resume.projects} github={resume.github} />
        <SkillsSection resume={resume} />
        <ContactSection resume={resume} />
      </main>
    </>
  );
}
