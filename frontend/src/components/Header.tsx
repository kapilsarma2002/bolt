import React from 'react';
import { Code2, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Code2 className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">WebCraft</span>
          </div>
          <a 
            href="https://github.com" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <Github className="h-5 w-5 mr-2" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}