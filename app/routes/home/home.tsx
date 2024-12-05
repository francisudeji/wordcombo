import { Link, NavLink } from "react-router";
import type { Route } from "./+types/home";

export function meta(): Route.MetaDescriptors {
  return [{ title: "WordCombo" }];
}

export function loader({ context }: Route.LoaderArgs) {
  return {
    message: context.VALUE_FROM_CLOUDFLARE,
    title: "WordCombo",
    description: "An online word game inspired by Wordle",
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { title, description } = loaderData;
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="font-semibold text-lg text-neutral-950">{title}</h1>
      <p className="text-neutral-600">{description}</p>

      <div className="flex items-center space-x-2">
        <NavLink to="/play" className="mt-4 hover:underline text-blue-500">
          Play
        </NavLink>
        <span className="text-neutral-600 inline-flex self-end">|</span>
        <Link
          to="https://github.com/francisudeji/wordcombo"
          className="mt-4 hover:underline text-blue-500"
        >
          Source
        </Link>
      </div>
    </div>
  );
}
