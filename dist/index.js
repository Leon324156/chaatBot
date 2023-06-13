"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
const PORT = 3000;
// Ustawienie parsera dla danych zapytania
app.use((0, body_parser_1.json)());
// Endpoint do obsługi webhooka
app.post('/webhook', (req, res) => {
    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
            // Obsługa przychodzących zdarzeń z Facebook Messenger
            // Tutaj możesz implementować logikę obsługi wiadomości, przycisków itp.
        });
        res.status(200).send('EVENT_RECEIVED');
    }
    else {
        res.sendStatus(404);
    }
});
// Endpoint weryfikacyjny
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = '69420';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Weryfikacja pomyślna!');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }
});
// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
    console.log("test");
});
//# sourceMappingURL=index.js.map