import type { Route } from "./+types/home";
import { tools } from "../data/tools";
import { ToolCard } from "../components/ToolCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dongle Tools - 웹 도구 모음" },
    { name: "description", content: "유용한 웹 도구 모음 서비스" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">웹 도구 모음</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
