const cors = require('cors')
const bodyParser = require('body-parser');
const app = require('express')();
const routers = require('./routers');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.json';

let sessionData = require(SESSION_FILE_PATH);

const client = new Client({
    session: sessionData
});

client.initialize();

client.on('ready', () => {
    if(data.sendTo !== null) {
      client.sendMessage('5511977982781@c.us', 'Server on');
    }
});

console.log("client: ", client );

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);
const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`server on ${port}`)
})

// module.exports = clt;