import { useState, useEffect } from "react";

interface IpInfo {
  ip: string;
  location?: {
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  isp?: string;
  timezone?: string;
}

export function IpChecker() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        // IP 주소 가져오기
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();

        // IP 위치 정보 가져오기
        const locationResponse = await fetch(
          `https://ipapi.co/${ipData.ip}/json/`
        );
        const locationData = await locationResponse.json();

        setIpInfo({
          ip: ipData.ip,
          location: {
            country: locationData.country_name,
            region: locationData.region,
            city: locationData.city,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          },
          isp: locationData.org,
          timezone: locationData.timezone,
        });
      } catch (err) {
        setError("IP 정보를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다!");
    } catch (err) {
      setError("클립보드 복사 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">IP 주소 확인</h1>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">IP 주소 확인</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {ipInfo && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  기본 정보
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">IP 주소</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono">{ipInfo.ip}</p>
                      <button
                        onClick={() => copyToClipboard(ipInfo.ip)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        복사
                      </button>
                    </div>
                  </div>
                  {ipInfo.isp && (
                    <div>
                      <p className="text-sm text-gray-600">ISP</p>
                      <p className="font-mono">{ipInfo.isp}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  위치 정보
                </h2>
                <div className="space-y-3">
                  {ipInfo.location && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">국가</p>
                        <p>{ipInfo.location.country}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">지역</p>
                        <p>{ipInfo.location.region}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">도시</p>
                        <p>{ipInfo.location.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">좌표</p>
                        <p className="font-mono">
                          {ipInfo.location.latitude},{" "}
                          {ipInfo.location.longitude}
                        </p>
                      </div>
                    </>
                  )}
                  {ipInfo.timezone && (
                    <div>
                      <p className="text-sm text-gray-600">시간대</p>
                      <p>{ipInfo.timezone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {ipInfo.location && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">지도에서 위치 보기</p>
              <a
                href={`https://www.google.com/maps?q=${ipInfo.location.latitude},${ipInfo.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Google 지도에서 열기 →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
