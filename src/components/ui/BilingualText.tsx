import type { ElementType, ReactNode } from "react";

import type { BilingualString } from "@/lib/types";

type Variant = "stacked" | "side-by-side";

const SIZE_FOR_BANGLA: Record<string, string> = {
  h1: "text-3xl sm:text-4xl",
  h2: "text-2xl sm:text-3xl",
  h3: "text-xl sm:text-2xl",
  h4: "text-lg sm:text-xl",
  p: "text-base",
  span: "text-base",
  div: "text-base",
};

export function BilingualText({
  content,
  as: Tag = "p" as ElementType,
  variant = "stacked",
  className = "",
  enClassName = "",
  bnClassName = "",
}: {
  content: BilingualString;
  as?: ElementType;
  variant?: Variant;
  className?: string;
  enClassName?: string;
  bnClassName?: string;
}) {
  const tagKey = typeof Tag === "string" ? Tag : "p";
  const banglaSize = SIZE_FOR_BANGLA[tagKey] ?? SIZE_FOR_BANGLA["p"];

  if (variant === "side-by-side") {
    return (
      <Tag className={`flex flex-wrap items-baseline gap-x-2 ${className}`.trim()}>
        <span lang="en" className={`font-sans ${enClassName}`.trim()}>
          {content.en}
        </span>
        <span
          lang="bn"
          className={`font-bangla text-brand-mute ${bnClassName}`.trim()}
          aria-label={`Bangla: ${content.bn}`}
        >
          {content.bn}
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span lang="en" className={`block font-sans ${enClassName}`.trim()}>
        {content.en}
      </span>
      <span
        lang="bn"
        className={`mt-1 block font-bangla text-brand-mute ${banglaSize} ${bnClassName}`.trim()}
      >
        {content.bn}
      </span>
    </Tag>
  );
}

export function isBilingualString(value: unknown): value is BilingualString {
  return (
    typeof value === "object" &&
    value !== null &&
    "en" in value &&
    "bn" in value &&
    typeof (value as { en: unknown }).en === "string" &&
    typeof (value as { bn: unknown }).bn === "string"
  );
}

export function bilingualChildren(
  bilingual: BilingualString,
): { en: ReactNode; bn: ReactNode } {
  return {
    en: <span lang="en" className="font-sans">{bilingual.en}</span>,
    bn: <span lang="bn" className="font-bangla">{bilingual.bn}</span>,
  };
}
