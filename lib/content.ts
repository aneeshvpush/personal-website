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
  href?: string; // omit when there's nothing to link to
  description: string;
  from: string; // placeholder preview gradient
  to: string;
  images?: MediaItem[]; // shown as a gallery instead of the gradient
  icon?: "drone" | "satellite" | "arm";
};

// A path under /public for an image, or { video } for a hover-to-play video.
// thumb is the second of the video shown while it rests (defaults to the first frame).
export type MediaItem = string | { video: string; thumb?: number };

export const profile = {
  name: "Aneesh Pushparaj",
  title: "Student, Engineer, Researcher",
  email: "aneeshvpushparaj@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/aneesh-pushparaj/",
    github: "https://github.com/aneeshvpush",
  },
};

export const now: Entry[] = [
  { title: "Aerospace Engineering - 3.84/4.00 GPA", org: "University of Illinois Urbana-Champaign", href: "https://illinois.edu", color: "#FF5F05", logo: "block-i" },
  {
    org: "The Illinois Space Society",
    href: "https://www.illinoisspacesociety.org/",
    color: "#facc15",
    image: "/illinois-space-society.png",
    roles: [
      { title: "Treasurer" },
      { title: "Spaceshot High-Powered Rocketry Structures & Analysis Member" },
    ],
  },
  { title: "VP of Community and Outreach", org: "Science Olympiad at Illinois", href: "https://sciolyatillinois.org/", color: "#FF5F05", image: "/science-olympiad-illinois.webp", bg: "#ffffff" },
];

export const previously: Entry[] = [
  { title: "Sustainability Product Intern", org: "Marketing Card Technology", href: "https://www.mctechnology.com/", color: "#07225e", image: "/mct.png" },
  { title: "Engineering Team Lead", org: "NASA L'SPACE", href: "https://lspace.asu.edu/", color: "#000000", image: "/lspace.png" },
  { title: "RASC-AL Manufacturing and Construction Member", org: "The Illinois Space Society", href: "https://www.illinoisspacesociety.org/", color: "#facc15", image: "/illinois-space-society.png" },
  { title: "Community Outreach Director", org: "UChicago Science Olympiad", href: "https://uchicagoscio.github.io/", color: "#800000", image: "/uchicago.png", bg: "#ffffff" },
];

export const projects: Project[] = [
  {
    name: "Quadcopter Drone CAD Design",
    role: "Solo Project",
    year: "2026",
    description: "Designed a 4S quadcopter in CAD, from its carbon-fiber frame to the stacked electronics and battery mount.",
    from: "#7f1d1d",
    to: "#ef4444",
    icon: "drone",
    images: ["/projects/drone-side.jpg", "/projects/drone-top.jpg", "/projects/drone-under.jpg", "/projects/drone-detail.jpg"],
  },
  {
    name: "LISA-T CubeSat CAD Design",
    role: "Solo Project",
    year: "2026",
    description: "Modeled a NASA LISA-T-inspired CubeSat in CAD with all of its components, from the deployable solar array and antenna to the avionics stack and batteries.",
    from: "#0c1a3a",
    to: "#38bdf8",
    icon: "satellite",
    images: [
      { video: "/projects/lisa-t-deploy.mp4", thumb: 6 },
      "/projects/lisa-t-deployed.jpg",
      "/projects/lisa-t-cutaway-1.jpg",
      "/projects/lisa-t-cutaway-2.jpg",
    ],
  },
  {
    name: "Mechanical Robotic Arm",
    role: "Solo Project",
    year: "2026",
    description: "Designed a servo-driven robotic arm in CAD, with a rotating base, jointed links, and a geared gripper.",
    from: "#78350f",
    to: "#fbbf24",
    icon: "arm",
    images: [
      { video: "/projects/arm-animation.mp4" },
      "/projects/arm-hero.jpg",
      "/projects/arm-side.jpg",
      "/projects/arm-gripper.jpg",
    ],
  },
];
