export type Tone = "cyan" | "violet" | "amber" | "green" | "blue" | "red";

/** 섹션 머리말. title 안의 accent 부분만 강조색으로 칠한다. "\n"은 줄바꿈 */
export type SectionCopy = {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
};

/** 메인 하단 경력 띠 한 칸: 역할을 크게, 아래에 디테일 */
export type HeroStep = {
  phase: string;
  tone: Tone;
  role: string;
  title: string;
  note?: string;
};

export type LogEvent = {
  time: string;
  type: string;
  message: string;
  tone: Tone;
};

export type Competency = {
  no: string;
  tone: Tone;
  title: string;
  summary: string;
  points: string[];
};

export type DomainNode = {
  code: string;
  label: string;
};

export type DomainFact = {
  value: string;
  label: string;
  description: string;
};

export type CareerGroup = {
  label: string;
  points: string[];
};

export type CareerStep = {
  id: string;
  phase: string;
  tone: Tone;
  role: string;
  position: string;
  start: string;
  end?: string;
  duration: string;
  title: string;
  summary: string;
  groups: CareerGroup[];
  results: string[];
  tech: string[];
};

export type Milestone = {
  date: string;
  label: string;
};

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  code: string;
  tag: string;
  tone: Tone;
  visual: "utilization" | "pipeline" | "rag" | "replay";
  title: string;
  problem: string;
  actions: string[];
  metrics: CaseMetric[];
};

export type SideProject = {
  name: string;
  tag: string;
  tone: Tone;
  description: string;
  tech: string[];
  href: string;
};

export type SkillGroup = {
  code: string;
  category: string;
  items: string[];
};

export type Education = {
  school: string;
  major: string;
  period: string;
  notes: string[];
};

export type Certification = {
  name: string;
  issuer: string;
};

export type Activity = {
  year?: string;
  title: string;
  description: string;
};

export type Resume = {
  name: string;
  nameEn: string;
  role: string;
  headline: string;
  headlineAccent: string;
  summary: string;
  email: string;
  github: string;
  company: {
    name: string;
    note: string;
    position: string;
    start: string;
    client: string;
  };
  sections: Record<"competency" | "domain" | "career" | "results" | "lab" | "skills" | "contact", SectionCopy>;
  heroSteps: HeroStep[];
  events: LogEvent[];
  competencies: Competency[];
  domain: { nodes: DomainNode[]; facts: DomainFact[] };
  career: CareerStep[];
  milestones: Milestone[];
  cases: CaseStudy[];
  projects: SideProject[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  focus: string[];
  activities: Activity[];
};
