import type { Route } from "./+types/url-shortener";
import { UrlShortener } from "../components/UrlShortener";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "단축 URL 생성기 - Dongle Tools" },
    {
      name: "description",
      content: "긴 URL을 짧고 기억하기 쉬운 URL로 변환합니다.",
    },
  ];
}

export default function UrlShortenerPage() {
  return <UrlShortener />;
}
