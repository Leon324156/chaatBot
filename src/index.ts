import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { sendMessage } from './SendMess';
import { ChatGPTHelper } from './GPT';

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN ||''
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || ''
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not defined in the environment variables.");
  process.exit(1); 
}


app.use(json());

const chatGPTHelper = new ChatGPTHelper(OPENAI_API_KEY);

app.post('/webhook', async (req: Request, res: Response) => { // zauważ, że dodaliśmy 'async'
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(async (entry: any) => { // zauważ, że dodaliśmy 'async'
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

        try {
          
          const gptResponse = await chatGPTHelper.getChatResponse(messageText);
         
          sendMessage(senderId, gptResponse, PAGE_ACCESS_TOKEN);
        } catch (error) {
          console.error('Wystąpił błąd podczas generowania odpowiedzi:', error);
          sendMessage(senderId, "Wystąpił błąd panie kolego", PAGE_ACCESS_TOKEN);
        }
      
        console.log('Otrzymano wiadomość:', messageText);
      }
    });
  } else {
    res.sendStatus(404);
  }

  res.status(200).send('EVENT_RECEIVED');
});


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






