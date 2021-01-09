const api = require('../config/index')
const client = require('../app.js');

console.log("client: ", client )

// client.on('message', async (msg) => {
//   console.log("funcionou", msg)
// })

// client.on('message', async msg => {
//   console.log("msg: ", msg);
//   const from = msg.from.split("@");
//   const existe = await api.post('/clients/filter', {
//     from: from[0]
//   });
//   client.sendMessage(msg.from, existe);
//   if(msg.body !== '1' || msg.body !== '2' || msg.body !== null) {
//   client.sendMessage(from,
//       `Selecione uma das opções abaixo
// 1) Deseja agendar um horario?
// 2) Deseja Conhecer nossos Serviços?`);
//   } else if(msg.body == '1') {
//     console.log('agendar um horário');
//     client.sendMessage(from, 'agendar um horário');
//   } else if(msg.body == '2') {
//     console.log('conhecer nossos serviços');
//     client.sendMessage(from, 'conhecer nossos serviços');
//   }
// })