import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("/play", "routes/play/play.tsx"),
] satisfies RouteConfig;
