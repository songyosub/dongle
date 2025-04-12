import { useState } from "react";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
      );
      const data = await response.json();

      console.info(data);
      console.info(data.shorturl);
      if (data.shorturl) {
        setshorturl(data.shorturl);
      } else {
        throw new Error("단축 URL 생성에 실패했습니다.");
      }
    } catch (err) {
      setError("URL 단축 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shorturl);
      alert("클립보드에 복사되었습니다!");
    } catch (err) {
      setError("클립보드 복사 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">단축 URL 생성기</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL 입력
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "생성 중..." : "단축 URL 생성"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {shorturl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            생성된 단축 URL
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shorturl}
              readOnly
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              복사
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
