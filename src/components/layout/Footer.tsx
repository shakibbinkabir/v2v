import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { SiteCopy } from "@/lib/types";

import { Container } from "./Container";

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function Footer({ site }: { site: SiteCopy }) {
  const f = site.footer;
  return (
    <footer className="border-t border-brand-rule/60 bg-white text-brand-ink">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-sans text-base font-semibold text-brand-teal">
            V2V Bridge
          </p>
          <p className="mt-2 text-sm text-brand-mute">
            <span lang="en" className="font-sans">{f.tagline.en}</span>
          </p>
          <p className="mt-1 text-sm text-brand-mute">
            <span lang="bn" className="font-bangla">{f.tagline.bn}</span>
          </p>
        </div>

        <div>
          <p className="font-sans text-sm font-semibold uppercase tracking-wide text-brand-teal">
            <span lang="en">{f.aboutHeading.en}</span>
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-brand-teal">
                About / <span lang="bn" className="font-bangla">পরিচিতি</span>
              </Link>
            </li>
            <li>
              <Link href="/safeguarding" className="hover:text-brand-teal">
                <span lang="en" className="font-sans">{f.safeguardingLabel.en}</span>
              </Link>
            </li>
            <li>
              <Link href="/withdraw" className="hover:text-brand-teal">
                <span lang="en" className="font-sans">{f.withdrawLabel.en}</span>
              </Link>
            </li>
            <li>
              <Link href="/audit" className="text-brand-mute hover:text-brand-teal">
                <span lang="en" className="font-sans">{f.auditLabel.en}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-sm font-semibold uppercase tracking-wide text-brand-teal">
            <span lang="en">{f.listenHeading.en}</span>
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/podcasts" className="hover:text-brand-teal">Podcasts</Link>
            </li>
            <li>
              <Link href="/entrepreneurs" className="hover:text-brand-teal">Entrepreneurs</Link>
            </li>
            <li>
              <Link href="/reels" className="hover:text-brand-teal">Reels</Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-brand-teal">Resources</Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-rule/60 bg-brand-cream/40">
        <Container className="flex flex-col gap-2 py-6 text-xs text-brand-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span lang="en" className="font-sans">{f.planIbCredit.en}</span>
            <span aria-hidden="true"> · </span>
            <span lang="en" className="font-sans">{f.capecCredit.en}</span>
          </p>
          <p>
            <span lang="en" className="font-sans">{f.lastUpdatedLabel.en}: </span>
            <time dateTime={BUILD_DATE}>{formatDate(BUILD_DATE, "en")}</time>
          </p>
        </Container>
        <Container className="pb-6 text-xs text-brand-mute">
          <p>
            <span lang="en" className="font-sans">{f.copyright.en}</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
