import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../constants';

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const generateImage = async (prompt: string) => {
  if (!OPENAI_API_KEY) {
    return {};
  }
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024'
  });
  if (!response.data[0]?.url) {
    throw new Error('No image generated: ' + JSON.stringify(response));
  }
  return { url: response.data[0].url };
};
