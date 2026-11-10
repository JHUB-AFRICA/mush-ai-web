import type { ReactNode } from "react";
import Link from "next/link";
import type { LegalDoc } from "@/lib/legal/types";

// Turns "**bold**" and "\n" inside a string into React nodes.
function renderInline(text: string): ReactNode[] {
  return text.split("\n").flatMap((line, lineIndex, lines) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${lineIndex}-${i}`} className="font-semibold text-on-surface">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
    return lineIndex < lines.length - 1 ? [...parts, <br key={`br-${lineIndex}`} />] : parts;
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const sections = doc.blocks.filter((b) => b.t === "h2") as { t: "h2"; x: string }[];

  return (
    <main className="w-full bg-surface text-on-surface">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          {doc.title}
        </h1>

        <a
          href={doc.downloadHref}
          download
          className="mt-4 inline-block rounded-full bg-surface-container px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-surface-container-high"
        >
          Download as Word document
        </a>

        {/* Table of contents */}
        <nav aria-label="Contents" className="mt-10 rounded-xl bg-surface-container-low p-5">
          <p className="mb-3 text-sm font-semibold text-primary">Contents</p>
          <ol className="grid gap-x-6 gap-y-1.5 text-sm text-on-surface-variant sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.x}>
                <a href={`#${slugify(s.x)}`} className="transition-colors hover:text-on-surface">
                  {s.x}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Body */}
        <div className="mt-10 space-y-4 text-base leading-7 text-on-surface-variant">
          {doc.blocks.map((block, i) => {
            switch (block.t) {
              case "h2":
                return (
                  <h2
                    key={i}
                    id={slugify(block.x)}
                    className="scroll-mt-24 pt-6 text-xl font-bold text-primary md:text-2xl"
                  >
                    {block.x}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={i} className="pt-2 text-lg font-semibold text-on-surface">
                    {block.x}
                  </h3>
                );
              case "ul":
                return (
                  <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-primary">
                    {block.x.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              default:
                return <p key={i}>{renderInline(block.x)}</p>;
            }
          })}
        </div>
      </div>
    </main>
  );
}
