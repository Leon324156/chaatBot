import axios from 'axios';

// export class ChatGPTHelper {
//   private apiKey: string;
//   private apiUrl: string;

//   constructor(apiKey: string) {
//     this.apiKey = apiKey || '';
//     this.apiUrl = 'https://api.openai.com/v1/chat/completions';
//   }

//   public async getChatResponse(message: string): Promise<string> {
//     try {
//       const requestBody = {
//         messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
//       };

//       const requestConfig = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${this.apiKey}`,
//         },
//       };

//       const response = await axios.post(this.apiUrl, requestBody, requestConfig);
//       const responseData = response.data;

//       if (responseData.choices && responseData.choices.length > 0) {
//         const chatResponse = responseData.choices[0].message.content;
//         return chatResponse;
//       } else {
//         throw new Error('No chat response received');
//       }
//     } catch (error) {
//       console.error('Error retrieving chat response:', error);
//       throw error;
//     }
//   }
// }


export async function getGpt3Response(message:string,OPENAI_API_KEY:string) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const requestBody = {
    model: 'gpt-3.5-turbo', 
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
    ],
};

  const requestConfig = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
  };
  console.log("FUNKCJA PRZED TRY (()**)")
  try {
      const response = await axios.post(apiUrl, requestBody, requestConfig);
      const responseData = response.data;

      if (responseData.choices && responseData.choices.length > 0) {
          const chatResponse = responseData.choices[0].message.content;
          return chatResponse;
      } else {
          throw new Error('No chat response received');
      }
  } catch (error) {
      console.error('Error retrieving chat response:', error);
      throw error;
  }
}

