import { Link } from "react-router";
import type { Tool } from "../data/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to={tool.path}
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{tool.icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {tool.category}
        </span>
      </div>
    </Link>
  );
}
