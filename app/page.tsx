import ClientHome from "./ClientHome";

/**
 * The public page renders entirely from `app/content/site.ts`. There is no
 * network or database call on this path, so the page can never go blank or
 * revert to stale content.
 */
export default function Home() {
  return <ClientHome />;
}
