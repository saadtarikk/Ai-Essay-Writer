'use client'
import React from 'react';
import EssayList from './EssayList';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Essay Dashboard</h1>
      <EssayList />
    </div>
  );
};

export default Dashboard;