import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface PromptInputProps {
  onBuild: (prompt: string) => void;
}

export function PromptInput({ onBuild }: PromptInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuild(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Describe the website you want to build..."
          className="w-full px-4 py-4 pr-32 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Build
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-400">
        Try: "Create a portfolio website for a photographer with a dark theme"
      </p>
    </form>
  );
}