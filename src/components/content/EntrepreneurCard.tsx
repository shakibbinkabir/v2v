import Image from "next/image";
import Link from "next/link";

import type { Entrepreneur } from "@/lib/types";

import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";

import { SectorIcon } from "./SectorIcon";

function excerpt(text: string, max = 140): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export function EntrepreneurCard({
  entrepreneur,
}: {
  entrepreneur: Entrepreneur;
}) {
  const href = `/entrepreneurs/${entrepreneur.id}`;
  const showPhoto = entrepreneur.photoConsent && Boolean(entrepreneur.photo);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-brand-cream">
        {showPhoto && entrepreneur.photo ? (
          <Image
            src={entrepreneur.photo}
            alt={`Portrait of ${entrepreneur.displayName}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <SectorIcon
              sector={entrepreneur.sector}
              className="h-32 w-32"
              title={`${entrepreneur.sector} sector icon (no photo)`}
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-sans text-lg font-semibold text-brand-teal">
          <Link href={href} className="hover:underline focus-visible:underline">
            {entrepreneur.displayName}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <Tag>{entrepreneur.sector}</Tag>
          <Tag variant="teal">{entrepreneur.district}</Tag>
        </div>

        <p className="mt-3 font-sans text-sm text-brand-ink/85">
          <span lang="en">{excerpt(entrepreneur.summary.en)}</span>
        </p>

        <Link
          href={href}
          className="mt-4 inline-flex items-center font-sans text-sm font-medium text-brand-teal hover:underline"
        >
          Read story →
        </Link>
      </div>
    </Card>
  );
}
