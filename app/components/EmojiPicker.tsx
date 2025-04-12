import { useState, useMemo } from "react";
import { Card } from "../components/ui/card";
import { Icons } from "../components/icons";
import { emojiCategories } from "../../lib/emoji-data";

export function EmojiPicker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    emojiCategories[0].id
  );
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [copiedEmojis, setCopiedEmojis] = useState<string[]>([]);

  const filteredEmojis = useMemo(() => {
    if (!searchQuery) {
      return (
        emojiCategories.find((cat) => cat.id === selectedCategory)?.emojis || []
      );
    }

    return emojiCategories.flatMap((cat) =>
      cat.emojis.filter((emoji) => emoji.includes(searchQuery))
    );
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setSelectedEmoji(emoji);
    setCopiedEmojis((prev) => [...prev, emoji]);
    setTimeout(() => setSelectedEmoji(""), 1000);
  };

  const copyAllEmojis = () => {
    const emojiText = copiedEmojis.join("");
    navigator.clipboard.writeText(emojiText);
  };

  const resetEmojis = () => {
    setCopiedEmojis([]);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이모지 검색..."
            className="flex-1 p-2 border rounded"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              {Icons.X({ className: "h-5 w-5" })}
            </button>
          )}
        </div>

        {copiedEmojis.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">복사된 이모지</h3>
              <div className="space-x-2">
                <button
                  onClick={copyAllEmojis}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  모두 복사
                </button>
                <button
                  onClick={resetEmojis}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  초기화
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded min-h-[100px] flex flex-wrap gap-2">
              {copiedEmojis.map((emoji, index) => (
                <span key={index} className="text-2xl">
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {emojiCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-3">
          {filteredEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => copyToClipboard(emoji)}
              className={`p-3 text-3xl rounded hover:bg-gray-100 ${
                selectedEmoji === emoji ? "bg-blue-100" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {selectedEmoji && (
          <div className="text-center text-sm text-gray-500">
            이모지가 클립보드에 복사되었습니다!
          </div>
        )}
      </div>
    </Card>
  );
}
