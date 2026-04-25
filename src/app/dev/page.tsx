import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EntrepreneurCard } from "@/components/content/EntrepreneurCard";
import { PodcastCard } from "@/components/content/PodcastCard";
import { ReelCard } from "@/components/content/ReelCard";
import { FacebookEmbed } from "@/components/embeds/FacebookEmbed";
import { InstagramEmbed } from "@/components/embeds/InstagramEmbed";
import { SpotifyEmbed } from "@/components/embeds/SpotifyEmbed";
import { TikTokEmbed } from "@/components/embeds/TikTokEmbed";
import { BilingualText } from "@/components/ui/BilingualText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/ui/Hero";
import { Prose } from "@/components/ui/Prose";
import { Tag } from "@/components/ui/Tag";
import {
  _getAllPodcastsRaw,
  _getAllReelsRaw,
  getAllEntrepreneurs,
} from "@/lib/content";

export const metadata = {
  title: "Stage 2 dev verification",
  description: "Internal page that renders one of each Stage 2 primitive.",
  robots: { index: false, follow: false },
};

export default function DevPage() {
  const entrepreneurs = getAllEntrepreneurs({ includeUnpublished: true });
  const podcasts = _getAllPodcastsRaw().sort(
    (a, b) => b.episodeNumber - a.episodeNumber,
  );
  const reels = _getAllReelsRaw();

  const sampleEnt = entrepreneurs[0];
  const sampleEntNoPhoto = entrepreneurs.find((e) => !e.photoConsent);
  const samplePodcast = podcasts[0];
  const reelByPlatform = {
    instagram: reels.find((r) => r.platform === "instagram"),
    tiktok: reels.find((r) => r.platform === "tiktok"),
    facebook: reels.find((r) => r.platform === "facebook"),
  };

  if (!sampleEnt || !samplePodcast) {
    return (
      <Container>
        <p className="py-20 text-center font-sans text-brand-mute">
          No seed content found. Did Stage 2 seed JSON load?
        </p>
      </Container>
    );
  }

  return (
    <>
      <Hero
        title={{
          en: "Stage 2 primitive showcase",
          bn: "স্টেজ ২ প্রিমিটিভ প্রদর্শন",
        }}
        kicker={{ en: "Internal /_dev route", bn: "অভ্যন্তরীণ /_dev রুট" }}
        intro={{
          en: "Every Stage 2 primitive renders below — Stages 3 to 6 should consume them, not reinvent them.",
          bn: "নিচে স্টেজ ২-এর প্রতিটি প্রিমিটিভ রেন্ডার করছে — স্টেজ ৩ থেকে ৬ এগুলি ব্যবহার করবে, পুনরায় তৈরি করবে না।",
        }}
        actions={
          <>
            <Button href="/" variant="secondary">Back to home</Button>
            <Button href="#cards">Jump to cards</Button>
          </>
        }
      />

      <Section tone="white">
        <h2 className="font-sans text-2xl font-semibold text-brand-teal">BilingualText</h2>
        <div className="mt-6 space-y-4">
          <BilingualText
            content={{
              en: "Default stacked variant — English on top, Bangla below.",
              bn: "ডিফল্ট স্ট্যাকড রূপ — উপরে ইংরেজি, নিচে বাংলা।",
            }}
          />
          <BilingualText
            variant="side-by-side"
            content={{ en: "Sector", bn: "পেশা" }}
            as="span"
          />
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="font-sans text-2xl font-semibold text-brand-teal">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Primary sm</Button>
          <Button variant="primary" size="md">Primary md</Button>
          <Button variant="primary" size="lg">Primary lg</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="link" href="/about">Link variant →</Button>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-sans text-2xl font-semibold text-brand-teal">Tags</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <Tag>tailoring</Tag>
          <Tag variant="teal">Satkhira</Tag>
          <Tag variant="neutral">draft</Tag>
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="font-sans text-2xl font-semibold text-brand-teal">Card + Prose</h2>
        <Card className="mt-6 p-6">
          <Prose>
            <h2>Section heading</h2>
            <p>
              Prose uses the brand fonts and a max-w-prose width to keep
              long-form bilingual content readable. The Card primitive wraps
              it with the project&apos;s standard border, hover, and cream
              background.
            </p>
            <h3>Sub-heading</h3>
            <p>
              Stages 3–5 should reach for these two together when rendering
              page-copy sections.
            </p>
          </Prose>
        </Card>
      </Section>

      <Section tone="white" className="scroll-mt-20">
        <div id="cards">
          <h2 className="font-sans text-2xl font-semibold text-brand-teal">Content cards</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PodcastCard
              podcast={samplePodcast}
              sectorLabel={sampleEnt.sector}
            />
            <EntrepreneurCard entrepreneur={sampleEnt} />
            {sampleEntNoPhoto ? (
              <EntrepreneurCard entrepreneur={sampleEntNoPhoto} />
            ) : null}
            {reelByPlatform.instagram ? (
              <ReelCard reel={reelByPlatform.instagram} />
            ) : null}
            {reelByPlatform.tiktok ? (
              <ReelCard reel={reelByPlatform.tiktok} linkTo="platform" />
            ) : null}
            {reelByPlatform.facebook ? (
              <ReelCard reel={reelByPlatform.facebook} />
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="font-sans text-2xl font-semibold text-brand-teal">Embeds</h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-brand-mute">
          Spotify renders inline; Instagram, TikTok, and Facebook lazy-mount
          when scrolled into view, with a fallback shown until then.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SpotifyEmbed
            embedId={samplePodcast.embed.embedId}
            title={samplePodcast.title.en}
          />
          {reelByPlatform.instagram ? (
            <InstagramEmbed embedUrl={reelByPlatform.instagram.embedUrl} />
          ) : null}
          {reelByPlatform.tiktok ? (
            <TikTokEmbed embedUrl={reelByPlatform.tiktok.embedUrl} />
          ) : null}
          {reelByPlatform.facebook ? (
            <FacebookEmbed embedUrl={reelByPlatform.facebook.embedUrl} />
          ) : null}
        </div>
      </Section>
    </>
  );
}
