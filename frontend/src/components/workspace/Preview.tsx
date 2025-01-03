import React from 'react';

export function Preview() {
  return (
    <div className="flex-1  h-[100vh-16px] bg-gray-900">
      <iframe
        title="Preview"
        className="w-full h-full border-none"
        src="about:blank"
      />
    </div>
  );
}
