import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { sendMessage } from './SendMess';


const app = express();
const PORT = 3000;
const VERIFY_TOKEN = '69420'; 
const PAGE_ACCESS_TOKEN = 'EAAcZC0M1Au8oBAEMBzTEGOZCglLoOFU253N37mUugtZCgDYZA0DW19mnZANSwIMCj0a7E0xlJgzUcfZCMaTx6CiqGbcZBgp7wndm1wokt5Q1NCgUTUBubnUpn6U3ll5ZCI9JfFZCOQ4w0uEAKpZCcvDAZAZCpF9iRVKWkU7rSykV2muZBS5VPZCbSK2AeZC'; // Twój Page access token


app.use(json());


app.post('/webhook', (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
      console.log("huj body webhook")
    
      
      if (webhookEvent.message) {
        console.log("3232332")
        const senderId = webhookEvent.sender.id;
        const messageText = webhookEvent.message.text;

       
        if (webhookEvent.message.is_echo) {
      
          return;
        }

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




