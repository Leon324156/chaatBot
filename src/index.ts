import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { sendMessage } from './SendMess';


const app = express();
const PORT = 3000;
const VERIFY_TOKEN = '69420'; 
const PAGE_ACCESS_TOKEN = 'EAAcZC0M1Au8oBAHO1AIoNSialpOKcfaXl2bnP0lDA3OGoZBJZAucIzY9EocqzJ6jDL3h9ZAQDDEr8isi9TUKeJFFmXtyeTxS57Y9XwLwf5dYi0EVPRTv5UdPD0pPySZBUnwWHLQNRVliflpfpqhoPbI7RboeocvhIwCu5RZBrDzQ62zwlnJi8f'; // Twój Page access token


app.use(json());


app.post('/webhook', (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      
    
      
      if (webhookEvent.message) {
        const senderId = webhookEvent.sender.id;
        const messageText = webhookEvent.message.text;
        console.log(senderId,"senderId")
        if (webhookEvent.message.is_echo) {
          return;
        }
          console.log(PAGE_ACCESS_TOKEN,senderId,"token i ID");
          sendMessage(senderId, 'Siemanko', PAGE_ACCESS_TOKEN);
      
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




