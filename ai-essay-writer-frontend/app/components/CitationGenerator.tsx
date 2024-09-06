// app/components/CitationGenerator.tsx
import { useState } from 'react';
import { OpenAIService } from '../services/openai.service';

export const CitationGenerator = () => {
  const [source, setSource] = useState('');
  const [style, setStyle] = useState('APA');
  const [citation, setCitation] = useState('');

  const handleGenerate = async () => {
    const generatedCitation = await OpenAIService.generateCitation(source, style);
    setCitation(generatedCitation);
  };

  return (
    <div>
      <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Enter source" />
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="APA">APA</option>
        <option value="MLA">MLA</option>
        {/* Add more options */}
      </select>
      <button onClick={handleGenerate}>Generate Citation</button>
      {citation && <div>{citation}</div>}
    </div>
  );
};