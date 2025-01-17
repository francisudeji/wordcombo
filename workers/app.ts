import { createRequestHandler } from "react-router";

declare global {
  interface CloudflareEnvironment {
    WORDS_OF_THE_DAY: KVNamespace;
  }
}

declare module "react-router" {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string;
    WORDS_OF_THE_DAY: { start: string; target: string };
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env) {
    const DEFAULT_WORDS_OF_THE_DAY = "GREAT,GREET";
    // "HELLO,WORLD";
    const todayUTC = new Date().toISOString().split("T")[0];

    const data = import.meta.env.DEV
      ? DEFAULT_WORDS_OF_THE_DAY
      : (await env.WORDS_OF_THE_DAY.get(todayUTC)) || DEFAULT_WORDS_OF_THE_DAY;
    const [start, target] = data.trim().split(",");

    return requestHandler(request, {
      VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare",
      WORDS_OF_THE_DAY: { start, target },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
