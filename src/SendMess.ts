
import axios from 'axios';
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

    
    const response = await axios.post('https://graph.facebook.com/v17.0/me/messages', requestBody, requestConfig);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:');
  }
}
