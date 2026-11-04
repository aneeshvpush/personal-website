import Header from "@/components/Header";
import RoleList from "@/components/RoleList";
import ProjectCard from "@/components/ProjectCard";
import PhotoStrip from "@/components/PhotoStrip";
import Reveal from "@/components/Reveal";
import { now, previously, profile, projects } from "@/lib/content";

export default function Home() {
  return (
    <main className="flex flex-col items-center scroll-smooth">
      <div className="w-full max-w-5xl px-4 relative">
        <Header />
        <div className="pt-4 mx-auto w-full font-Poppins">
          <RoleList heading="NOW" roles={now} first />
          <RoleList heading="PREVIOUSLY" roles={previously} />
        </div>
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-10 pointer-events-none hero-lines" />
      </div>

      <div className="pt-12 max-w-5xl w-full">
        <Reveal>
          <div className="mx-auto px-4 flex items-center mb-6">
            <div>
              <h2 className="font-Poppins text-3xl font-medium text-white/90">Engineering</h2>
              <h2 className="font-Poppins text-lighttext2">Products that I&apos;ve launched.</h2>
            </div>
          </div>
        </Reveal>
        <div className="mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {projects.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center">
        <div className="relative z-10 w-full flex flex-col items-center">
          <PhotoStrip />
          <section className="max-w-5xl w-full px-4 py-12 font-Poppins">
            <Reveal>
              <div className="flex flex-col gap-3 text-lighttext3 md:text-sm text-xs text-left md:text-center md:items-center">
                <p>Want to build something together or just want to say hi?</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-neutral-200 underline decoration-neutral-300 decoration-[3px] underline-offset-4 whitespace-nowrap self-start md:self-center"
                >
                  Let&apos;s chat →
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </main>
  );
}
