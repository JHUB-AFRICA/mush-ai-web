export type LegalBlock =
  | { t: "h2"; x: string }
  | { t: "h3"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; x: string[] };

export type LegalDoc = {
  title: string;
  /** Path of the downloadable Word file inside /public */
  downloadHref: string;
  blocks: LegalBlock[];
};
