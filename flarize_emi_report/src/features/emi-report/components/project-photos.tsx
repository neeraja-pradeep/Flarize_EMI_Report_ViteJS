import Image from "next/image";

import { SectionTitle } from "@/ui/section-title";

import type { ReportContent } from "../schemas/emi-report.schema";

interface ProjectPhotosProps {
  projects: ReportContent["projects"];
}

export function ProjectPhotos({ projects }: ProjectPhotosProps) {
  return (
    <section>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <SectionTitle>{projects.heading}</SectionTitle>
        <span className="text-[11px] font-semibold">{projects.countLabel}</span>
      </div>
      <ul className="grid grid-cols-4 gap-2">
        {projects.photos.map((photo) => (
          <li key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={640}
              height={480}
              sizes="160px"
              className="block h-32 w-full rounded-lg object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
