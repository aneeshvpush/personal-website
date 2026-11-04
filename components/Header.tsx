import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Reveal from "./Reveal";
import { profile } from "@/lib/content";

const links = [
  { label: "LinkedIn", href: profile.socials.linkedin, icon: <FaLinkedinIn />, bg: "bg-[#0a66c2]" },
  { label: "GitHub", href: profile.socials.github, icon: <FaGithub />, bg: "bg-neutral-800" },
  { label: "Instagram", href: profile.socials.instagram, icon: <FaInstagram />, bg: "bg-gradient-to-br from-yellow-500 via-pink-600 to-purple-700" },
  { label: "X", href: profile.socials.x, icon: <FaXTwitter />, bg: "bg-black" },
];

export default function Header() {
  return (
    <div className="lg:pt-32 md:pt-20 pt-10 mx-auto w-full font-Poppins">
      <div className="flex items-center gap-2">
        <Reveal>
          {/* Placeholder avatar: drop your photo in /public and swap this for an <img>. */}
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-2xl font-medium text-neutral-300">
            {profile.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </div>
        </Reveal>
        <div className="flex flex-col justify-center flex-1">
          <Reveal>
            <h1 className="md:text-3xl text-2xl font-medium">{profile.name}</h1>
          </Reveal>
          <Reveal>
            <div className="flex md:text-base text-sm mb-1">
              <h3 className="flex row items-center">
                <span className="text-lighttext3">{profile.title}</span>
              </h3>
            </div>
          </Reveal>
          <Reveal>
            <span className="inline-flex items-center relative align-middle gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/icon relative inline-block transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
                >
                  <span
                    className={`${l.bg} w-6 h-6 rounded-lg inline-flex items-center justify-center text-white text-[13px] ring-1 ring-white/20`}
                  >
                    {l.icon}
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/icon:opacity-100 transition-opacity duration-150 z-50">
                    {l.label}
                  </span>
                </a>
              ))}
            </span>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
