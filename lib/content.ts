// All site copy lives here. Replace the placeholders with your own details.

export type Role = {
  title: string;
  org: string;
  href: string;
  detail?: string;
  color: string; // placeholder logo color, swap for a real logo later
  logo?: "block-i";
  image?: string; // path under /public, e.g. "/logo.png"
  bg?: string; // background color behind an image logo, so it stands out on the dark page
};

// One organization with several unrelated roles, shown as a header with the roles nested under it.
export type RoleGroup = {
  org: string;
  href: string;
  color: string;
  logo?: "block-i";
  image?: string; // path under /public, e.g. "/logo.png"
  roles: { title: string; detail?: string }[];
};

export type Entry = Role | RoleGroup;

export type Project = {
  name: string;
  role: string;
  year: string;
  href: string;
  description: string;
  from: string; // placeholder preview gradient
  to: string;
};

export const profile = {
  name: "Aneesh Pushparaj",
  title: "Aerospace Engineer and Computer Scientist",
  email: "you@example.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/aneesh-pushparaj/",
    github: "https://github.com/aneeshvpush",
  },
};

export const now: Entry[] = [
  { title: "Aerospace Engineering - 3.84/4.0 GPA", org: "University of Illinois Urbana-Champaign", href: "https://illinois.edu", color: "#FF5F05", logo: "block-i" },
  {
    org: "The Illinois Space Society",
    href: "https://www.illinoisspacesociety.org/",
    color: "#facc15",
    image: "/illinois-space-society.png",
    roles: [
      { title: "Treasurer" },
      { title: "Spaceshot High-Powered Rocketry Member" },
    ],
  },
  { title: "VP of Community and Outreach", org: "Science Olympiad at Illinois", href: "https://sciolyatillinois.org/", color: "#FF5F05", image: "/science-olympiad-illinois.webp", bg: "#ffffff" },
];

export const previously: Entry[] = [
  { title: "Founder", org: "Startup", href: "https://example.com", color: "#a855f7" },
  { title: "Software Engineer Intern", org: "Company Three", href: "https://example.com", detail: "Team or focus area", color: "#f97316" },
  { title: "Something you're proud of", org: "Platform", href: "https://example.com", color: "#e5e5e5" },
];

export const projects: Project[] = [
  { name: "Project One", role: "Software Engineer", year: "2026", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#1e3a8a", to: "#38bdf8" },
  { name: "Project Two", role: "Founder", year: "2026", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#14532d", to: "#a3e635" },
  { name: "Project Three", role: "Software Engineer Intern", year: "2026", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#7f1d1d", to: "#fb923c" },
  { name: "Project Four", role: "Solo Project", year: "2025", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#312e81", to: "#c084fc" },
  { name: "Project Five", role: "Software Engineer", year: "2025", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#134e4a", to: "#5eead4" },
  { name: "Project Six", role: "Solo Project", year: "2024", href: "https://example.com", description: "One sentence on what you built and the impact it had.", from: "#78350f", to: "#fde047" },
];

export const photoColors = ["#27272a", "#3f3f46", "#52525b", "#3f3f46", "#27272a"];
