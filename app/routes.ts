import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/url-shortener", "routes/url-shortener.tsx"),
  route("/cidr-calculator", "routes/cidr-calculator.tsx"),
  route("/ip-checker", "routes/ip-checker.tsx"),
  route("/domain-ip-checker", "routes/domain-ip-checker.tsx"),
  route("/password-generator", "routes/password-generator.tsx"),
] satisfies RouteConfig;
