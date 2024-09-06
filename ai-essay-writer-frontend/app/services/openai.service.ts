// app/services/openai.service.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const OpenAIService = {
  generateCitation: async (source: string, style: string) => {
    const response = await axios.post(`${API_URL}/essays/generate-citation`, { source, style });
    return response.data.citation;
  },

  autocomplete: async (prompt: string) => {
    const response = await axios.post(`${API_URL}/essays/autocomplete`, { prompt });
    return response.data.completion;
  },

  generateFromFile: async (fileContent: string, prompt: string) => {
    const response = await axios.post(`${API_URL}/essays/generate-from-file`, { fileContent, prompt });
    return response.data.content;
  },

  generateEssay: async (topic: string, pages: string, paperType: string, writerModel: string, subjectArea: string, instructions: string) => {
    const session = await getSession();
    if (!session) {
      throw new Error('No active session');
    }
    const response = await axios.post(`${API_URL}/essays/generate`, {
      topic,
      pages,
      paperType,
      writerModel,
      subjectArea,
      instructions
    }, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    });
    return response.data.essay;
  },

  // Add more methods for other features...
};