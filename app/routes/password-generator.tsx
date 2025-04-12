import { PasswordGenerator } from "../components/PasswordGenerator";

export default function PasswordGeneratorPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">비밀번호 생성기</h1>
      <PasswordGenerator />
    </div>
  );
}
