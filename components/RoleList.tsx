import { CornerDownRight } from "lucide-react";
import Reveal from "./Reveal";
import type { Role } from "@/lib/content";

function RoleRow({ role }: { role: Role }) {
  return (
    <Reveal>
      <div className="flex row items-start md:text-base text-sm">
        <CornerDownRight className="mr-2 w-4 h-4 text-lighttext shrink-0 mt-1" />
        <h3 className="text-lighttext3">
          {role.title}{" "}
          <span className="inline-flex items-center align-middle whitespace-nowrap gap-x-1">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0"
              style={{ backgroundColor: role.color }}
            />
            <a
              href={role.href}
              target="_blank"
              rel="noreferrer"
              className="relative text-neutral-200 hover:underline underline-offset-4"
            >
              {role.org}
            </a>
          </span>
          {role.detail ? ` - ${role.detail}` : null}
        </h3>
      </div>
    </Reveal>
  );
}

export default function RoleList({ heading, roles, first }: { heading: string; roles: Role[]; first?: boolean }) {
  return (
    <>
      <Reveal>
        <div className="justify-between flex md:text-base text-sm">
          <h1 className={`text-neutral-200 ${first ? "" : "mb-2 mt-4"}`}>{heading}</h1>
        </div>
      </Reveal>
      {roles.map((r) => (
        <RoleRow key={r.org + r.title} role={r} />
      ))}
    </>
  );
}
