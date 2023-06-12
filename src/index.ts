import express, { Request, Response } from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = 3000;

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
      // Tutaj możesz implementować logikę obsługi wiadomości, przycisków itp.
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Endpoint weryfikacyjny
app.get('/webhook', (req: Request, res: Response) => {
  const VERIFY_TOKEN = 'twój_token_weryfikacyjny';
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Weryfikacja pomyślna!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});