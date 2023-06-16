import axios, { AxiosRequestConfig } from 'axios';
export async function sendMessage(recipientId: string, messageText: string, PAGE_ACCESS_TOKEN: string ) {
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
   
    const response = await axios.post('https://graph.facebook.com/v16.0/118138851298938/messages', requestBody, requestConfig);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error)
  }
}


// export const senddMessage = async (senderId: string, message: string,token: string): Promise<number> => {
//   const options: AxiosRequestConfig = {
//     method: 'POST',
//     url: `https://graph.facebook.com/v16.0/118138851298938/messages`,
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

// export async function sendMessage(pageAccessToken: string, recipientId: string, messageText: string): Promise<void> {
//   try {
//     const url = `https://graph.facebook.com/v16.0/118138851298938/messages?access_token=${pageAccessToken}`;
//     const payload = {
//       recipient: {
//         id: recipientId
//       },
//       message: {
//         text: messageText
//       }
//     };
    
//     await axios.post(url, payload);
//     console.log('Message sent successfully!');
//   } catch (error) {
//     console.error('An error occurred while sending the message:');
//   }
// }

