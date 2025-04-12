import { useState } from "react";

interface DomainIpInfo {
  domain: string;
  ips: string[];
  nameservers: string[];
}

export function DomainIpChecker() {
  const [domain, setDomain] = useState("");
  const [ipInfo, setIpInfo] = useState<DomainIpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setIpInfo(null);

    try {
      // 도메인에서 프로토콜과 경로를 제거
      const cleanDomain = domain
        .replace(/^(https?:\/\/)?(www\.)?/, "")
        .split("/")[0];

      // DNS 조회를 위한 API 호출
      const response = await fetch(
        `https://dns.google/resolve?name=${cleanDomain}&type=A`
      );
      const data = await response.json();

      if (data.Answer && data.Answer.length > 0) {
        setIpInfo({
          domain: cleanDomain,
          ips: data.Answer.map((record: any) => record.data),
          nameservers: data.Authority?.map((ns: any) => ns.data) || [],
        });
      } else {
        throw new Error("도메인의 IP 주소를 찾을 수 없습니다.");
      }
    } catch (err) {
      setError("도메인 정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다!");
    } catch (err) {
      setError("클립보드 복사 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">도메인 IP 확인</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="domain"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            도메인 주소
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "확인 중..." : "확인"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {ipInfo && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  기본 정보
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">도메인</p>
                    <p className="font-mono">{ipInfo.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IP 주소</p>
                    <div className="space-y-2">
                      {ipInfo.ips.map((ip, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <p className="font-mono">{ip}</p>
                          <button
                            onClick={() => copyToClipboard(ip)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            복사
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {ipInfo.nameservers.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    네임서버
                  </h2>
                  <div className="space-y-2">
                    {ipInfo.nameservers.map((ns, index) => (
                      <div key={index} className="font-mono text-sm">
                        {ns}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">추가 정보</p>
            <a
              href={`https://mxtoolbox.com/SuperTool.aspx?action=a%3a${ipInfo.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              MX Toolbox에서 자세히 보기 →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
