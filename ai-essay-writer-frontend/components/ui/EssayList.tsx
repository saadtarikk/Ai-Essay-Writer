// src/components/ui/EssayList.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { getEssays, deleteEssay } from '../../lib/api';
import { Essay } from '../../types';

const EssayList = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const essaysData = await getEssays();
        setEssays(essaysData);
      } catch (err) {
        setError('Failed to fetch essays. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteEssay(id);
      setEssays(essays.filter(essay => essay.id !== id));
    } catch (err) {
      setError('Failed to delete essay. Please try again.');
    }
  };

  if (loading) return <div>Loading essays...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Essay List</h1>
      {essays.length === 0 ? (
        <p>No essays found.</p>
      ) : (
        <ul>
          {essays.map(essay => (
            <li key={essay.id}>
              {essay.title} - {essay.topic}
              <button onClick={() => handleDelete(essay.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EssayList;