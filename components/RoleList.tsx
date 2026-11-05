import { CornerDownRight } from "lucide-react";
import BlockI from "./BlockI";
import Reveal from "./Reveal";
import type { Entry, Role, RoleGroup } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Logo({ logo, color, image, bg }: { logo?: "block-i"; color: string; image?: string; bg?: string }) {
  if (image) {
    return (
      <span
        className={`w-[18px] h-[18px] rounded-[3px] overflow-hidden shrink-0 inline-flex items-center justify-center ${
          bg ? "p-[1px]" : "[filter:drop-shadow(0_0_0.5px_rgba(255,255,255,0.7))]"
        }`}
        style={bg ? { backgroundColor: bg } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${basePath}${image}`} alt="" className="w-full h-full object-contain" />
      </span>
    );
  }
  // Block I keeps its navy background so it stands out.
  return logo === "block-i" ? (
    <span className="w-[18px] h-[18px] rounded-[3px] bg-[#13294B] p-[2px] shrink-0 inline-flex">
      <BlockI className="w-full h-full" />
    </span>
  ) : (
    <span className="w-3.5 h-3.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
  );
}

function OrgLink({ org, href }: { org: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative text-neutral-200 hover:underline underline-offset-4"
    >
      {org}
    </a>
  );
}

// A role nested one level beneath its organization or parent row.
function SubRow({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex row items-start md:text-base text-sm ml-6">
      <CornerDownRight className="mr-2 w-4 h-4 text-lighttext shrink-0 mt-1" />
      <h3 className="text-lighttext3">
        {title}
        {detail ? ` - ${detail}` : null}
      </h3>
    </div>
  );
}

function RoleRow({ role }: { role: Role }) {
  return (
    <Reveal>
      <div className="flex row items-start md:text-base text-sm">
        <CornerDownRight className="mr-2 w-4 h-4 text-lighttext shrink-0 mt-1" />
        <h3 className="text-lighttext3">
          {role.title}{" "}
          <span className="inline-flex items-center align-middle whitespace-nowrap gap-x-1">
            <Logo logo={role.logo} color={role.color} image={role.image} bg={role.bg} />
            <OrgLink org={role.org} href={role.href} />
          </span>
          {role.detail ? ` - ${role.detail}` : null}
        </h3>
      </div>
      {role.sub?.map((s) => (
        <SubRow key={s.title} title={s.title} detail={s.detail} />
      ))}
    </Reveal>
  );
}

// Organization on its own line, with each unrelated role nested beneath it.
function GroupRow({ group }: { group: RoleGroup }) {
  return (
    <Reveal>
      <div className="flex row items-start md:text-base text-sm">
        <CornerDownRight className="mr-2 w-4 h-4 text-lighttext shrink-0 mt-1" />
        <h3 className="inline-flex items-center gap-x-1">
          <Logo logo={group.logo} color={group.color} image={group.image} />
          <OrgLink org={group.org} href={group.href} />
        </h3>
      </div>
      {group.roles.map((r) => (
        <SubRow key={r.title} title={r.title} detail={r.detail} />
      ))}
    </Reveal>
  );
}

export default function RoleList({ heading, roles, first }: { heading: string; roles: Entry[]; first?: boolean }) {
  return (
    <>
      <Reveal>
        <div className="justify-between flex md:text-base text-sm">
          <h1 className={`text-neutral-200 ${first ? "" : "mb-2 mt-4"}`}>{heading}</h1>
        </div>
      </Reveal>
      {roles.map((r) =>
        "roles" in r ? <GroupRow key={r.org} group={r} /> : <RoleRow key={r.org + r.title} role={r} />
      )}
    </>
  );
}
