const cors = require('cors')
const bodyParser = require('body-parser');
const app = require('express')();
const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';
const onMessage = require('./controllers/onMessege');

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
const port = process.env.PORT || 3001;

app.listen( port, () => {
    console.log(`server on ${port}`)
})

client.on('message', async (msg) => {
    let name;
    let cpf;
    let age;
    const from = msg.from;
    const message = msg.body;
    const existsClient = await onMessage.existsClientFromDb(msg);
    if(existsClient.data === null) {
        const result = await onMessage.verifyStepper(msg);
        const stepper = result.data
        console.log("stepper whatsapp: ", stepper)
        if(stepper == 0 && message != 1) {
            client.sendMessage(
                from,
                `Ola! Bem vindo a Santa Tinta Tatuagens.
Checamos aqui.. Você ainda não está cadastrado em nosso sistema.
Escolha uma das opções abaixo para continuar:
1) Cadastrar para agendar uma tatuagem.
2) Conhecer nossos serviços.
                `
            )
            return;
            
        }
        if(stepper == 0 && message == 1 ) {
            client.sendMessage(
                from,
                `Legal, para prosseguir-mos com o cadastro nos informe seu nome completo.`
            )
            await onMessage.updateStepper(msg);
            console.log("todas: ", name, cpf, age)
            return;
        }
        if(stepper == 0 && message == 2) {
            client.sendMessage(
                from,
                `Beleza, só acessar nosso insta @henrique_tatuagens, aproveite e começe a nos seguir ;D`
            );
            await onMessage.resetSteppper(msg);
            return;
        }
        if(stepper == 0 && message != 2) {
            client.sendMessage(
                from,
                `Desculpe, não intendemos oque você quer, escolha uma das opções abaixo:
1) Agendar uma tatuagem.
2) Conhecer nossos serviços.
                `
                )
                return;
        }
        if(stepper == 1) {
            const msgName = message.split(' ');
            name = message
            client.sendMessage(
                from,
                `${msgName[0]}, agora por favor nos informe seu cpf, somente números.`
            )
            await onMessage.updateStepper(msg, name);
            console.log("todas: ", name, cpf, age)
            return;
        }
        if(stepper == 2) {
            cpf = message
            client.sendMessage(
                from,
                `Perfeito! Para finalizar precisamos de sua data de nascimento ex: 20-12-1990`
            )
            await onMessage.updateStepper(msg, cpf);
            console.log("todas: ", name, cpf, age)
            return;
        }
        if(stepper == 3) {
            age = message
            client.sendMessage(
                from, 
                `Seu cadastro foi concluido com sucesso!
                Para continuar escolha uma das opções abaixo:
1) Continuar agendamento.
2) Conhecer nossos serviços.
                `
            )
            await onMessage.updateStepper(msg, age);
            console.log("todas: ", name, cpf, age)
            return;
        }
        if(stepper == 4 && message == 1) {
            client.sendMessage(
                from,
                `Para finalizar o agendamento, nos envie uma imagem da tatuagem que deseja.
Assim enviaremos um design dela remodelada para ser algo único no mesmo linhamento e ideia.
E entraremos em contato para combinarmos o dia e falarmos sobre preços`
            );
            return;
        }
        console.log("todas: ", name, cpf, age)
    }
 })