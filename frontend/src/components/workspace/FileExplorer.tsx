import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';

const files = {
  src: {
    type: 'folder',
    children: {
      'App.tsx': { type: 'file' },
      'index.tsx': { type: 'file' },
      components: {
        type: 'folder',
        children: {
          'Header.tsx': { type: 'file' },
          'Button.tsx': { type: 'file' }
        }
      }
    }
  },
  'package.json': { type: 'file' },
  'tsconfig.json': { type: 'file' }
};

export function FileExplorer() {
  return (
    <div className="h-full border-r border-gray-800 p-4 overflow-auto">
      <div className="text-sm text-gray-400">
        <FileTree files={files} level={0} />
      </div>
    </div>
  );
}

function FileTree({ files, level }: { files: any; level: number }) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (name: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div style={{ paddingLeft: level * 12 }}>
      {Object.entries(files).map(([name, data]: [string, any]) => (
        <div key={name} className="py-1">
          {data.type === 'folder' ? (
            <div>
              <div
                className="flex items-center group cursor-pointer hover:text-white"
                onClick={() => toggleFolder(name)}
              >
                {expandedFolders[name] ? (
                  <ChevronDown className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1" />
                )}
                <Folder className="h-4 w-4 mr-1 text-blue-400" />
                <span>{name}</span>
              </div>
              {expandedFolders[name] && data.children && (
                <FileTree files={data.children} level={level + 1} />
              )}
            </div>
          ) : (
            <div className="flex items-center group cursor-pointer hover:text-white">
              <File className="h-4 w-4 mr-1 text-gray-500" />
              <span>{name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}