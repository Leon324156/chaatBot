import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { sendMessage } from './SendMess';
import axios from 'axios';


const app = express();
const PORT = 3000;
const VERIFY_TOKEN = '69420'; 
const PAGE_ACCESS_TOKEN = 'EAAcZC0M1Au8oBAG9SqYzUuep2YJcxWxNcCJW4bZBXuEzWb9neS7PgziRTBIfn7gJeil6ua7om6yevyC4EmV6gYgtH7HYZAIRwPtXIGFJfzKkPVQ0K22kdGp5r7FcH8ROIu4xhhOVMA97fv9hU9420qaFVn0X3MiQB9j0Pd2gHjlgZCOpXtgV'; // Twój Page access token


app.use(json());


// app.post('/webhook', (req: Request, res: Response) => {
//   const body = req.body;

//   if (body.object === 'page') {
//     body.entry.forEach((entry: any) => {
//       const webhookEvent = entry.messaging[0];
//       console.log(webhookEvent);
      
    
      
//       if (webhookEvent.message) {
//         const senderId = webhookEvent.sender.id;
//         const messageText = webhookEvent.message.text;
//         console.log(senderId,"senderId")
//         if (webhookEvent.message.is_echo) {
//           return;
//         }
//           console.log(PAGE_ACCESS_TOKEN,senderId,"token i ID");
//           sendMessage(senderId, "siemanko", PAGE_ACCESS_TOKEN);
      
//         console.log('Otrzymano wiadomość:', messageText);
//       }
//     });
//   } else {
//     res.sendStatus(404);
//   }

//   res.status(200).send('EVENT_RECEIVED');
// });


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



app.post('/webhook', async (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(async (entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      if (webhookEvent.message) {
        const senderId = webhookEvent.sender.id;
        const messageText = webhookEvent.message.text;
        console.log(senderId, "senderId");
        if (webhookEvent.message.is_echo) {
          return;
        }
        console.log(PAGE_ACCESS_TOKEN, senderId, "token and ID");

        try {
          const url = `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
          const payload = {
            recipient: {
              id: senderId
            },
            message: {
              text: 'Hello!'
            }
          };

          await axios.post(url, payload);
          console.log('Message sent successfully!');
        } catch (error) {
          console.error('An error occurred while sending the message:');
        }

        console.log('Received message:', messageText);
      }
    });
  } else {
    res.sendStatus(404);
  }

  res.status(200).send('EVENT_RECEIVED');
});



