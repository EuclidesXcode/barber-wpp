const api = require('./config/index')
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

//   const existe = await api.post('/clients/filter', {
//     from: from[0]
//   });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`server on ${port}`)
})

client.on('message', async (msg) => {
  console.log("funcionou", msg)
    onMessage.receiveMessage(msg)
})