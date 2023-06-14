import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const openai = new OpenAIApi(configuration);

const chatCompletion = async (prompt: string) => {
  try {
    const request: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Jesteś pomocnym asystentem.' },
        { role: 'user', content: prompt },
      ],
    };

    const response = await openai.createChatCompletion(request);

    const content = response.data.choices[0].message.content;

    return {
      status: 1,
      response: content,
    };
  } catch (error) {
    return {
      status: 0,
      response: '',
    };
  }
};
