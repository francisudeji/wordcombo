import { createRequestHandler } from "react-router";

declare global {
  interface CloudflareEnvironment {
    WORDS_OF_THE_DAY: KVNamespace;
  }
}

declare module "react-router" {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string;
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env) {
    const todayUTC = new Date().toISOString().split("T")[0];
    const wordsOfTheDay = await env.WORDS_OF_THE_DAY.get(todayUTC, "text");
    return requestHandler(request, {
      VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare",
      VALUE_FROM_KV: wordsOfTheDay,
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
