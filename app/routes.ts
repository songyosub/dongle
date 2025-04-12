import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/url-shortener", "routes/url-shortener.tsx"),
  route("/cidr-calculator", "routes/cidr-calculator.tsx"),
] satisfies RouteConfig;
