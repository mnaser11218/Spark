import axios from 'axios';

const API_KEY = "";

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (prompt) => {
  const response = await openai.post('/completions', {
    // model: 'text-davinci-003',
    model: 'gpt-3.5-turbo',
    prompt: prompt,
    max_tokens: 100,
  });
  return response.data;
};

// console.log(API_KEY);