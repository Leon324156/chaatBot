// Importuj zależności
import axios from 'axios';

// Funkcja do wysyłania wiadomości za pomocą Page Access Token
export async function sendMessage(recipientId: string, messageText: string, PAGE_ACCESS_TOKEN: string) {
  try {
    // Konstruuj zapytanie API do wysłania wiadomości
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

    // Wyślij zapytanie POST do Messenger API
    const response = await axios.post('https://graph.facebook.com/v17.0/me/messages', requestBody, requestConfig);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:');
  }
}
