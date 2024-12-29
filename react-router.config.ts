import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  serverBuildFile: "assets/server-build.js",
  prerender: true,
} satisfies Config;
