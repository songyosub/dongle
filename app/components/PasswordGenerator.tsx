"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Icons } from "../components/icons";
import { Slider } from "../components/ui/slider";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.includeUppercase) chars += uppercase;
    if (options.includeLowercase) chars += lowercase;
    if (options.includeNumbers) chars += numbers;
    if (options.includeSymbols) chars += symbols;

    if (chars === "") {
      alert("최소한 하나의 문자 유형을 선택해야 합니다.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-2 border rounded"
              placeholder="생성된 비밀번호가 여기에 표시됩니다"
            />
          </div>
          <button
            onClick={copyToClipboard}
            className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
            title="클립보드에 복사"
          >
            {Icons.Copy({ className: "h-5 w-5" })}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              비밀번호 길이: {options.length}
            </label>
            <Slider
              min={8}
              max={32}
              step={1}
              value={[options.length]}
              onValueChange={(value) =>
                setOptions({ ...options, length: value[0] })
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeUppercase: e.target.checked,
                  })
                }
                className="mr-2"
              />
              대문자 (A-Z)
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeLowercase: e.target.checked,
                  })
                }
                className="mr-2"
              />
              소문자 (a-z)
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeNumbers: e.target.checked,
                  })
                }
                className="mr-2"
              />
              숫자 (0-9)
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    includeSymbols: e.target.checked,
                  })
                }
                className="mr-2"
              />
              특수문자 (!@#$%^&* 등)
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          비밀번호 생성
        </button>
      </div>
    </Card>
  );
}
