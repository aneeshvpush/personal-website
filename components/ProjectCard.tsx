import { ArrowUpRight } from "lucide-react";
import DroneIcon from "./DroneIcon";
import ImageCarousel from "./ImageCarousel";
import SatelliteIcon from "./SatelliteIcon";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  const preview = project.images ? (
    <ImageCarousel images={project.images} />
  ) : (
    // Placeholder preview: replace with a screenshot or <video>.
    <div
      className="absolute inset-0 rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
      style={{ backgroundImage: `linear-gradient(135deg, ${project.from}, ${project.to})` }}
    />
  );
  const previewClass = "block w-full overflow-hidden rounded-md aspect-video relative";

  return (
    <div className="relative block h-full w-full">
      <div className="rounded-md h-full w-full overflow-hidden group duration-1000 relative z-20">
        <div className="relative z-50 flex flex-col h-full">
          {project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer" className={previewClass}>
              {preview}
            </a>
          ) : (
            <div className={previewClass}>{preview}</div>
          )}
          <div className="pt-3 pb-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="relative w-5 h-5 shrink-0 overflow-hidden">
                {project.icon === "drone" ? (
                  <DroneIcon className="absolute inset-0 w-5 h-5 text-red-500" />
                ) : project.icon === "satellite" ? (
                  <SatelliteIcon className="absolute inset-0 w-5 h-5 text-sky-400" />
                ) : (
                  <span
                    className="absolute inset-0 rounded-sm transition-all duration-300 ease-out group-hover:translate-x-full group-hover:opacity-0"
                    style={{ backgroundColor: project.to }}
                  />
                )}
                {project.href && !project.icon && (
                  <span className="absolute inset-0 flex items-center justify-center -translate-x-full opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4 text-neutral-100" />
                  </span>
                )}
              </span>
              <h4 className="text-neutral-100 font-Poppins font-medium text-lg tracking-wide shrink-0">
                {project.name}
              </h4>
              <span className="inline-flex items-center text-lighttext2 font-Poppins font-normal text-base tracking-wide shrink-0">
                - {project.role}
              </span>
              <span className="ml-auto text-lighttext2 font-Poppins tracking-wide text-sm shrink-0">
                {project.year}
              </span>
            </div>
            <p className="mt-1 text-lighttext2 font-Poppins tracking-wide text-sm">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
