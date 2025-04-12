export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: "utility" | "network" | "development" | "converter";
}

export const tools: Tool[] = [
  {
    id: "url-shortener",
    title: "단축 URL 생성기",
    description: "긴 URL을 짧고 기억하기 쉬운 URL로 변환합니다.",
    icon: "🔗",
    path: "/url-shortener",
    category: "utility",
  },
  {
    id: "cidr-calculator",
    title: "IP CIDR 범위 계산기",
    description: "CIDR 표기법을 IP 범위로 변환하고 계산합니다.",
    icon: "🌐",
    path: "/cidr-calculator",
    category: "network",
  },
  {
    id: "ip-checker",
    title: "IP 주소 확인",
    description: "현재 IP 주소와 위치 정보를 확인합니다.",
    icon: "📍",
    path: "/ip-checker",
    category: "network",
  },
  {
    id: "json-formatter",
    title: "JSON 포맷터",
    description: "JSON 데이터를 보기 좋게 포맷팅합니다.",
    icon: "📝",
    path: "/json-formatter",
    category: "development",
  },
  {
    id: "base64-converter",
    title: "Base64 변환기",
    description: "텍스트와 Base64를 상호 변환합니다.",
    icon: "🔄",
    path: "/base64-converter",
    category: "converter",
  },
  {
    id: "color-picker",
    title: "색상 선택기",
    description: "색상 코드를 추출하고 변환합니다.",
    icon: "🎨",
    path: "/color-picker",
    category: "utility",
  },
  {
    id: "password-generator",
    title: "비밀번호 생성기",
    description: "안전한 비밀번호를 생성합니다.",
    icon: "🔒",
    path: "/password-generator",
    category: "utility",
  },
  {
    id: "regex-tester",
    title: "정규식 테스터",
    description: "정규식을 테스트하고 디버깅합니다.",
    icon: "🔍",
    path: "/regex-tester",
    category: "development",
  },
];
