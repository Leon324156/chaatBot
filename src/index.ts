import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { sendMessage } from './SendMess';

const app = express();
const PORT = 3000;
const VERIFY_TOKEN = '69420'; // Twój weryfikacyjny token
const PAGE_ACCESS_TOKEN = 'EAAcZC0M1Au8oBAJxACsicPm67T3UNkVuv3qoQQu2pXQiTnKhc4QQpzmQcmbGk79uYI2TbDqWFeYAop27pY4JRx2NZA9JO4HDoQ8QVKYdZCWC0naoDwZAQBIHwwdmvwY5zFo77GLYSfOYWzYslkqE8mry8nz06Q8NKlpNIbJS9JZAFJIN2ay16'; // Twój Page access token

// Ustawienie parsera dla danych zapytania
app.use(json());

// Endpoint do obsługi webhooka
app.post('/webhook', (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Obsługa przychodzących zdarzeń z Facebook Messenger
      if (webhookEvent.message) {
        const senderId = webhookEvent.sender.id;
        const messageText = webhookEvent.message.text;

        // Odpowiedź na pierwszą wiadomość "Siemanko"
        if (webhookEvent.message.is_echo) {
          // Ignoruj echo (wiadomości wysłane przez samego bota)
          return;
        }
        if (webhookEvent.message.sequence === 1) {
          sendMessage(senderId, 'Siemanko',PAGE_ACCESS_TOKEN);
          return;
        }
        
        // Tutaj możesz implementować logikę obsługi wiadomości, przycisków itp.
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
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
