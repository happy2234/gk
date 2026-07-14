import fs from "fs";
import path from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  year: number;
  github?: string;
  demo?: string;
  coverImage?: string;
  status: "active" | "archived";
  body?: string;
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status: "published" | "accepted" | "in-review" | "in-prep";
  pdfLink?: string;
  arxivLink?: string;
  codeLink?: string;
  doi?: string;
  bibtex?: string;
  abstract?: string;
  slug?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  excerpt: string;
  body?: string;
}

export interface CurrentlyItem {
  title: string;
  type: "paper" | "project" | "coursework" | "goal";
  status: "active" | "paused";
  note?: string;
  link?: string;
}

export interface Currently {
  items: CurrentlyItem[];
  updatedAt: string;
}

// ── New types added during content migration ──────────────────────────────────

export interface SocialLink {
  id: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface ResumeExperience {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface ResumeEducation {
  degree: string;
  org: string;
  year: string;
  detail: string;
}

export interface CurrentlyUsing {
  category: string;
  items: string[];
}

export interface OpenSourceEntry {
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface Resume {
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: Record<string, string[]>;
  certifications: { name: string; issuer: string }[];
  currentlyUsing: CurrentlyUsing[];
  openSource: OpenSourceEntry[];
}

export interface AboutTimeline {
  period: string;
  role: string;
  org: string;
  note?: string;
}

export interface About {
  bio: string[];
  education: AboutTimeline[];
  experience: AboutTimeline[];
  skills: Record<string, string[]>;
}

export interface ResearchInterest {
  area: string;
  description: string;
}

export interface Research {
  statement: string;
  interests: ResearchInterest[];
}

// ─── Content readers ─────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "content");

function parseJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function readJsonDir<T>(dir: string): T[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => parseJsonFile<T>(path.join(fullDir, f)));
}

// Projects
export function getAllProjects(): Project[] {
  return readJsonDir<Project>("projects").sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(n = 3): Project[] {
  return getAllProjects()
    .filter((p) => p.status === "active")
    .slice(0, n);
}

// Publications
export function getAllPublications(): Publication[] {
  return readJsonDir<Publication>("publications").sort((a, b) => b.year - a.year);
}

export function getRecentPublications(n = 2): Publication[] {
  return getAllPublications().slice(0, n);
}

export function getPublicationsByStatus(
  status: Publication["status"]
): Publication[] {
  return getAllPublications().filter((p) => p.status === status);
}

// Blog
export function getAllBlogPosts(): BlogPost[] {
  return readJsonDir<BlogPost>("blog").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

// Currently
export function getCurrently(): Currently {
  const filePath = path.join(contentDir, "currently.json");
  if (!fs.existsSync(filePath)) {
    return { items: [], updatedAt: new Date().toISOString() };
  }
  return parseJsonFile<Currently>(filePath);
}

// Site config (social links, name, contact info)
export function getSiteConfig(): SiteConfig {
  return parseJsonFile<SiteConfig>(path.join(contentDir, "site.json"));
}

// Resume (experience, education, skills, certifications, currentlyUsing, openSource)
export function getResume(): Resume {
  return parseJsonFile<Resume>(path.join(contentDir, "resume.json"));
}

// About (bio paragraphs, timeline, skills)
export function getAbout(): About {
  return parseJsonFile<About>(path.join(contentDir, "about.json"));
}

// Research (statement, interests)
export function getResearch(): Research {
  return parseJsonFile<Research>(path.join(contentDir, "research.json"));
}
