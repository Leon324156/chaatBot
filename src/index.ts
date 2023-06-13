import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { kła, sendMessage } from './SendMess';
import axios from 'axios';

const app = express();
const PORT = 3000;
const VERIFY_TOKEN = '69420'; // Twój weryfikacyjny token
const PAGE_ACCESS_TOKEN = 'EAAcZC0M1Au8oBAP6Ai7SDVCJpCtKTJ8e8iZC3vEPUPzXd9bIJkqA0YCiqEfopOfJHQP8FwScz8022iPnHJvcuJTZBYW2t023IZBjHrRqTw7CbPuIvBTOcxMrTPNdjkuRZAoZAWFiZBOdovZCslaiVcuzmTptPtgignaUUPVleWnQMtYdvR6o7GrX'; // Twój Page access token

// Ustawienie parsera dla danych zapytania
app.use(json());

// Endpoint do obsługi webhooka
app.post('/webhook', (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      console.log("huj body webhook")
      kła()

      // Obsługa przychodzących zdarzeń z Facebook Messenger
      if (webhookEvent.message) {
        console.log("3232332")
        const senderId = webhookEvent.sender.id;
        const messageText = webhookEvent.message.text;

        // Odpowiedź na pierwszą wiadomość "Siemanko"
        if (webhookEvent.message.is_echo) {
          // Ignoruj echo (wiadomości wysłane przez samego bota)
          return;
        }

        senddMessage(senderId, 'Siemanko', PAGE_ACCESS_TOKEN);
        // Tutaj możesz implementować logikę obsługi wiadomości, przycisków itp.
        console.log('Otrzymano wiadomość:', messageText);
      }
    });
  } else {
    res.sendStatus(404);
  }

  res.status(200).send('EVENT_RECEIVED');
});


// Endpoint weryfikacyjny
app.get('/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Weryfikacja pomyślna!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});



function senddMessage(recipientId: string, messageText: string, PAGE_ACCESS_TOKEN: string) {
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
    console.log("czy wchodzi do sendMess")
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
