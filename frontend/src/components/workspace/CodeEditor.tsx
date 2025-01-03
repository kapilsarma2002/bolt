import React from 'react';
import Editor from '@monaco-editor/react';

const defaultCode = `import React from 'react';

export function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="text-white">Hello World</h1>
    </div>
  );
}`;

export function CodeEditor() {
  return (
    <div className="flex-1 h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={defaultCode}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
