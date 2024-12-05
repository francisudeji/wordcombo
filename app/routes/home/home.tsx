import type { Route } from "./+types/home";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Word Combo" },
    { name: "description", content: "Welcome to Word Combo" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <p>hello{loaderData.message}</p>;
}
