import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useRepoAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const analyze = async (url) => {
    if (!url.trim()) {
      setError('Please enter a GitHub repository URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setRepoData(null);
    setLoadingStep(0);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // Start the API call but don't await it immediately
      const apiPromise = axios.post(`${API_BASE}/api/repo/analyze`, { url });

      // Step 1: Connecting
      await delay(1200);
      setLoadingStep(1);

      // Step 2: Fetching
      await delay(1500);
      setLoadingStep(2);

      // Step 3: Reading
      await delay(1800);
      setLoadingStep(3);

      // Now wait for the API to actually finish if it hasn't yet
      const response = await apiPromise;

      // Step 4: Analysis with Gemini (give it a bit more time if it was fast)
      await delay(1000);
      setLoadingStep(4);

      // Step 5: Complete!
      await delay(800);
      
      setRepoData(response.data);
      setLoading(false);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        'Failed to connect to the server. Make sure the backend is running.';
      setError(message);
      setLoading(false);
    }
  };

  const askChatQuestion = async (question) => {
    if (!repoData) return null;
    
    setChatLoading(true);
    setChatError(null);
    
    try {
      const response = await axios.post(`${API_BASE}/api/repo/chat`, {
        repoContext: {
          name: repoData.repoInfo.name,
          description: repoData.repoInfo.description,
          language: repoData.repoInfo.language,
          stars: repoData.repoInfo.stars,
          forks: repoData.repoInfo.forks,
          readme: repoData.repoInfo.readme || "No readme content available", 
          fileTree: repoData.fileTree
        },
        question
      });
      
      return response.data.answer;
    } catch (err) {
      console.error('Chat error:', err);
      setChatError(err.response?.data?.error || 'Failed to get answer');
      return null;
    } finally {
      setChatLoading(false);
    }
  };

  return {
    analyze,
    askChatQuestion,
    loading,
    error,
    repoData,
    loadingStep,
    chatLoading,
    chatError,
    reset: () => {
      setRepoData(null);
      setError(null);
      setChatError(null);
      setLoadingStep(0);
    }
  };
};

export default useRepoAnalysis;
