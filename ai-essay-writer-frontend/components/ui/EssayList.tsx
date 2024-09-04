// src/components/ui/EssayList.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { getEssays, deleteEssay } from '../../lib/api';
import { Essay } from '../../types';

const EssayList = () => {
  const [essays, setEssays] = useState<Essay[]>([]);

  useEffect(() => {
    const fetchEssays = async () => {
      const essaysData = await getEssays();
      setEssays(essaysData);
    };

    fetchEssays();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEssay(id);
    setEssays(essays.filter(essay => essay.id !== id));
  };

  return (
    <div>
      <h1>Essay List</h1>
      <ul>
        {essays.map(essay => (
          <li key={essay.id}>
            {essay.title} - {essay.topic}
            <button onClick={() => handleDelete(essay.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EssayList;