import { useState } from "react";

interface IpRange {
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  subnetMask: string;
}

export function CidrCalculator() {
  const [ip, setIp] = useState("");
  const [prefix, setPrefix] = useState("");
  const [ipRange, setIpRange] = useState<IpRange | null>(null);
  const [error, setError] = useState("");

  const isValidIp = (ip: string) => {
    const octets = ip.split(".");
    if (octets.length !== 4) return false;
    return octets.every((octet) => {
      const num = parseInt(octet);
      return num >= 0 && num <= 255;
    });
  };

  const isValidPrefix = (prefix: string) => {
    const num = parseInt(prefix);
    return num >= 0 && num <= 32;
  };

  const calculateIpRange = (ip: string, prefix: number): IpRange => {
    // IP를 32비트 이진수로 변환
    const ipBinary = ip
      .split(".")
      .map((octet) => parseInt(octet))
      .reduce((acc, curr) => (acc << 8) + curr, 0);

    // 서브넷 마스크 계산
    const mask = ~((1 << (32 - prefix)) - 1);

    // 네트워크 주소 계산
    const networkBinary = ipBinary & mask;

    // 브로드캐스트 주소 계산
    const broadcastBinary = networkBinary | ~mask;

    // 이진수를 IP 주소 형식으로 변환하는 함수
    const binaryToIp = (binary: number) =>
      [
        (binary >> 24) & 255,
        (binary >> 16) & 255,
        (binary >> 8) & 255,
        binary & 255,
      ].join(".");

    // 서브넷 마스크를 점 표기법으로 변환
    const subnetMask = binaryToIp(mask >>> 0);

    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = Math.max(0, totalHosts - 2); // /31과 /32는 특수한 경우

    return {
      networkAddress: binaryToIp(networkBinary >>> 0),
      broadcastAddress: binaryToIp(broadcastBinary >>> 0),
      firstUsableIp: binaryToIp((networkBinary + 1) >>> 0),
      lastUsableIp: binaryToIp((broadcastBinary - 1) >>> 0),
      totalHosts,
      usableHosts,
      subnetMask,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIpRange(null);

    if (!isValidIp(ip)) {
      setError("유효하지 않은 IP 주소입니다.");
      return;
    }

    if (!isValidPrefix(prefix)) {
      setError("유효하지 않은 프리픽스입니다. (0-32 사이의 값을 입력하세요)");
      return;
    }

    try {
      const result = calculateIpRange(ip, parseInt(prefix));
      setIpRange(result);
    } catch (err) {
      setError("계산 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        IP CIDR 범위 계산기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ip"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              IP 주소
            </label>
            <input
              type="text"
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="prefix"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              프리픽스 (CIDR)
            </label>
            <input
              type="number"
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="24"
              min="0"
              max="32"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          계산하기
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {ipRange && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">계산 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">네트워크 주소</p>
              <p className="font-mono">{ipRange.networkAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">브로드캐스트 주소</p>
              <p className="font-mono">{ipRange.broadcastAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">첫 번째 사용 가능한 IP</p>
              <p className="font-mono">{ipRange.firstUsableIp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">마지막 사용 가능한 IP</p>
              <p className="font-mono">{ipRange.lastUsableIp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">서브넷 마스크</p>
              <p className="font-mono">{ipRange.subnetMask}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">사용 가능한 호스트 수</p>
              <p className="font-mono">
                {ipRange.usableHosts.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
