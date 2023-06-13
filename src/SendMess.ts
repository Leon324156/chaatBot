// Importuj zależności
import axios from 'axios';

// Funkcja do wysyłania wiadomości za pomocą Page Access Token
export function sendMessage(recipientId: string, messageText: string, PAGE_ACCESS_TOKEN: string) {
  // Konstruuj zapytanie API do wysłania wiadomości
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      access_token: PAGE_ACCESS_TOKEN,
    },
  };

  const requestBody = {
    messaging_type: 'RESPONSE',
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };

  // Wyślij zapytanie POST do Messenger API
  axios
    .post('https://graph.facebook.com/v14.0/me/messages', requestBody, requestConfig)
    .then((response) => {
      console.log('Message sent successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error sending message:', error.response.data);
    });
}
