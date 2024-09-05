'use client';

import React, { useEffect, useState } from 'react';
import { getEssays } from '@/lib/api';
import { Essay } from '@/types';
import { Citation } from '@/components/ui/Citation';
import EssayList from '@/components/ui/EssayList';


/*const EssaysPage = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const fetchedEssays = await getEssays();
        setEssays(fetchedEssays);
      } catch (err) {
        setError('Failed to fetch essays. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  if (loading) return <div>Loading essays...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Essays</h1>
      {essays.length === 0 ? (
        <p>No essays found.</p>
      ) : (
        <ul>
          {essays.map((essay) => (
            <li key={essay.id}>{essay.title}</li>
          ))}
        </ul>
        
      )}
      <Citation />
    </div>
  );
};

*/

const EssaysPage = () => {
  return (
    <div>
      <EssayList />
      <Citation />
    </div>
  );
};

export default EssaysPage;