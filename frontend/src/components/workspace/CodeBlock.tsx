import React, { useState, useRef, useEffect } from 'react';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { Code2, Eye } from 'lucide-react';

export function CodeBlock() {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [explorerWidth, setExplorerWidth] = useState(250);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = explorerWidth;
    document.body.style.cursor = 'col-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const delta = e.clientX - startX.current;
      const newWidth = Math.max(150, Math.min(500, startWidth.current + delta));
      setExplorerWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-800 px-4">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center px-4 py-2 text-sm ${
            activeTab === 'code'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Code2 className="h-4 w-4 mr-2" />
          Code
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center px-4 py-2 text-sm ${
            activeTab === 'preview'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {activeTab === 'code' && (
          <>
            {isExplorerOpen && (
              <div style={{ width: explorerWidth }} className="flex-shrink-0">
                <FileExplorer />
              </div>
            )}
            <div
              className="w-1 cursor-col-resize hover:bg-blue-500 transition-colors"
              onMouseDown={handleMouseDown}
            />
            <CodeEditor />
          </>
        )}
        {activeTab === 'preview' && <Preview />}
      </div>
    </div>
  );
}
