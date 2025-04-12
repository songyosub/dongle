import { EmojiPicker } from "../components/EmojiPicker";

export default function EmojiPickerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">이모지 선택기</h1>
      <EmojiPicker />
    </div>
  );
}
