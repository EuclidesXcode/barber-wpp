const cors = require('cors')
const bodyParser = require('body-parser');
const app = require('express')();
const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';
const onMessage = require('./controllers/onMessege');
const { on } = require('nodemon');

let sessionData = require(SESSION_FILE_PATH);

const client = new Client({
    session: sessionData
});

client.initialize();

client.on('ready', () => {
    client.sendMessage('5511977982781@c.us', 'Server on');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`server on ${port}`)
})

client.on('message', async (msg) => {
    const from = msg.from;
    const message = msg.body;
    if (message === '1' || message === 1) {
        client.sendMessage(
            from,
            `Ok, vamos fazer seu cadastro
Me fala ai seu nome...`
        )
    } else if (message.length < 2 && message.length !== 11 && message.split('-').length !== 3) {
        let nome = message.split(' ')
        client.sendMessage(
            from,
            `Blz ${nome[0]}, vamos lá,
agora me fala ai seu CPF,
digita só numeros....`
        )
    } else if (message.length === 11) {
        const cpf = message;
        client.sendMessage(
            from,
            `Estamos indo bem.
Me fala agora sua data de nascimento.
Ex: 10-10-2000`
        )
    } else if (message.length === 10 && message.split('-').length === 3) {
        console.log("chemos no fim")
        client.sendMessage(
            from,
            `Blz, fiz aqui seu cadastro`
        )
    } else if(message) {
        const result = await onMessage.receiveMessage(msg)
        if(result.data == null) {
            client.sendMessage(
                from,
                `Vi aqui que vc não é cadastrado
Escolhe ai uma das opções:

1) Deseja agendar uma tattoo?
2) Deseja conhecer nossos trabalhos?`
            )
        }
    }
    console.log("verifyClient: ", result.data);
})