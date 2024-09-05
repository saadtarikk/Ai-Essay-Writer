// src/components/ui/EssayList.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { getEssays, deleteEssay } from '../../lib/api';
import { Essay } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const EssayList = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEssays();
  }, []);

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

  const handleDelete = async (id: number) => {
    try {
      await deleteEssay(id);
      setEssays(essays.filter(essay => essay.id !== id));
      if (selectedEssay?.id === id) {
        setSelectedEssay(null);
      }
    } catch (err) {
      setError('Failed to delete essay. Please try again.');
    }
  };

  if (loading) return <div>Loading essays...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <div className="w-1/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Your Essays</h2>
        {essays.length === 0 ? (
          <p>No essays found.</p>
        ) : (
          <ul className="space-y-2">
            {essays.map(essay => (
              <li key={essay.id} className="border p-2 rounded">
                <h3 className="font-semibold">{essay.title}</h3>
                <p className="text-sm text-gray-600">{essay.topic}</p>
                <div className="mt-2">
                  <Button onClick={() => setSelectedEssay(essay)} className="mr-2">View</Button>
                  <Button onClick={() => handleDelete(essay.id)} variant="destructive">Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-2/3 pl-4">
        {selectedEssay ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedEssay.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEssay.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        ) : (
          <p>Select an essay to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default EssayList;