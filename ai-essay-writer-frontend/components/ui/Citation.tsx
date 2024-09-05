import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';

const citationStyles = ['APA', 'MLA', 'IEEE', 'Chicago', 'Harvard'];

export function Citation() {
  const [source, setSource] = useState('');
  const [style, setStyle] = useState('APA');
  const [citation, setCitation] = useState('');

  const generateCitation = async () => {
    // TODO: Implement API call to generate citation
    const response = await fetch('/api/generate-citation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, style }),
    });
    const data = await response.json();
    setCitation(data.citation);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter source information"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {citationStyles.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <Button onClick={generateCitation}>Generate Citation</Button>
      {citation && <div className="mt-4 p-2 bg-gray-100 rounded">{citation}</div>}
    </div>
  );
}