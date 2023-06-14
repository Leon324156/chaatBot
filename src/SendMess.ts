import axios, { AxiosRequestConfig } from 'axios';
export async function sendMessage(recipientId: string, messageText: string, PAGE_ACCESS_TOKEN: string) {
  try {
    
    const requestBody = {
      messaging_type: 'RESPONSE',
      recipient: {
        id: recipientId,
      },
      message: {
        text: messageText,
      },
    };

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        access_token: PAGE_ACCESS_TOKEN,
      },
    };

    
    const response = await axios.post('https://graph.facebook.com/v17.0/118138851298938/messages', requestBody, requestConfig);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:');
  }
}


// export const sendMessage = async (senderId: string, message: string,token: string): Promise<number> => {
//   const options: AxiosRequestConfig = {
//     method: 'POST',
//     url: `https://graph.facebook.com/v11.0/118138851298938/messages`,
//     params: {
//       access_token: token,
//       recipient: JSON.stringify({ 'id': senderId }),
//       messaging_type: 'RESPONSE',
//       message: JSON.stringify({ 'text': message })
//     }
//   };

//   const response = await axios.request(options);

//   if (response.status === 200 && response.statusText === 'OK') {
//     return 1;
//   } else {
//     return 0;
//   }
// };