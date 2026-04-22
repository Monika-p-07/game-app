import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4005/api';

export const saveGame = async (gameData: unknown) => {
  const response = await axios.post(`${API_URL}/games`, gameData);
  return response.data;
};

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};
