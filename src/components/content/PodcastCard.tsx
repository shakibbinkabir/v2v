import Link from "next/link";

import { formatDuration } from "@/lib/format";
import type { PodcastEpisode } from "@/lib/types";

import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";

export function PodcastCard({
  podcast,
  sectorLabel,
}: {
  podcast: PodcastEpisode;
  sectorLabel?: string;
}) {
  const href = `/podcasts/${podcast.id}`;
  return (
    <Card className="p-5">
      <p className="font-sans text-xs uppercase tracking-wider text-brand-coral">
        Episode {podcast.episodeNumber}
      </p>

      <h3 className="mt-2 font-sans text-lg font-semibold text-brand-teal">
        <Link href={href} className="hover:underline focus-visible:underline">
          <span lang="en">{podcast.title.en}</span>
        </Link>
      </h3>
      <p className="mt-1 font-bangla text-base text-brand-mute">
        <span lang="bn">{podcast.title.bn}</span>
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {sectorLabel ? <Tag>{sectorLabel}</Tag> : null}
        <span className="font-sans text-xs text-brand-mute">
          {formatDuration(podcast.durationSeconds)}
        </span>
      </div>

      <Link
        href={href}
        className="mt-5 inline-flex items-center font-sans text-sm font-medium text-brand-teal hover:underline"
      >
        Listen →
      </Link>
    </Card>
  );
}
