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
Precisamos que se cadastre em nosso sistema por motivo de segurança,
so iremos pedir seu nome e data de nascimento para confirmarmos sua idade.

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
                `${msgName[0]}, Para finalizar precisamos de sua data de nascimento ex: 20-12-1990.`
                )
            await onMessage.updateStepper(msg, name);
            return;
        }
        if(stepper == 2) {
            age = message
            await onMessage.updateStepper(msg, age);
            client.sendMessage(
                from, 
                `Seu cadastro foi concluido com sucesso!
                Agora podemos continuar lhe atendendo e agendar sua tatuagem!
                
                Para prosseguir responda *Voltar ao menu*
                `
            )
            console.log("todas: ", name, cpf, age)
            return;
        }
        return;
    } 
    if(existsClient.data) {
        const clientSelected = existsClient.data;
        if(message!= 1 && message != 2 && message != 3 && message != 4 && message != 5 && message != 6 && message.toLocaleLowerCase() == 'voltar ao menu' ) {

            client.onMessage(
                from,
                `Olá ${clientSelected.name}, Santa Tinta agradeçe o contato, com oque podemos ajudar?
                Escolha uma das opções abaixo.
                1) Vizualizar tatuagem agendada.
                2) Cancelar tatuagens agendadas.
                3) Alterar tatuagem agendada.
                4) Agendar uma tatuagem.
                5) Falar com algum atendente.
                6) Finalizar atendimento.
                `
            );
            return;
        }
        if(message == 1) {
            client.onMessage(
                from,
                `${tatto,length > 0 ?tatto.map(el=>{
                    el.day + '-' + el.date +'-'+ el.hour
                }): 'Não há nenhuma tatuagem agendada.'}
                
                Para voltar ao inicio, Responda *Voltar ao menu*
                
                `

            );
            return;
        }
        if(message == 2) {
            client.onMessage(
                from,
                `
                Que pena que deseja cancelar o serviço :C, para confirmar o cancelamento responda *Cancelar*.
                
                Caso não queira realmente cancelar, responda *manter agendamento*

                Para voltar ao inicio, Responda *Voltar ao menu*
                
                `
            );
            return;
        }
        if(message.toLowerCase() == 'cancelar') {
            client.onMessage(
                from,
                `
                Seu pedido de cancelamento foi enviado com sucesso, em breve entramos em contato.

                Para voltar ao inicio, Responda *Voltar ao menu*
                
                `
            );
            return;
        }
        if(message == '3') {
            client.onMessage(
                from,
                `
                Deseja alterar o modelo que nos enviou ? responda *alterar modelo enviado*.
                Deseja alterar o modelo modificado que enviamos ? responda *alterar modelo recebido*.

                Para voltar ao inicio, Responda *Voltar ao menu*
                
                `
            );
            return;
        }
        if(message.toLowerCase() == 'alterar modelo enviado') {
            client.onMessage(
                from,
                `
               Tudo bem ! Então nos envie um novo modelo novo agora beleza?.

               Para voltar ao inicio, Responda *Voltar ao menu*

                
                `
            );
            return;
        }
        if(message == '4') {
            client.onMessage(
                from,
                `
               Opa, para agendar sua nova tatuagem, primeiro precisamos que nos envie um modelo, por aqui mesmo nos envie uma imagem doque deseja.

               Para voltar ao inicio, Responda *Voltar ao menu*

                
                `
            );
            return;
        }
        if(message == 'imagem') {
            client.onMessage(
                from,
                `
               Deseja fazer exatamente igual a imagem enviada ou quer que modificamos algo ?
               
               Se quiser deixar por nossa conta a modificação responda *modifiquem*

               Caso queira dar alguma ideia responda *CONCLUIR*, volte ao menu inicial e solicite uma conversa com um atendente.

               Para cancelar e voltar ao inicio, Responda *Voltar ao menu*

                
                `
            );
            return;
        }
        if(message == 'modifiquem') {
            client.onMessage(
                from,
                `
               Perfeito! Seu modelo esta sendo analisado.
               Iremos modificar e enviar um novo modelo em breve,
               e assim enviaremos os dias disponiveis em nossa agenda caso goste do novo modelo para concluirmos o serviço.

               Fique atento que talvez um de nossos atendentes entrem em contato!

               Para voltar ao inicio, Responda *Voltar ao menu*

                
                `
            );
            return;
        }
        if(message == 5) {
            client.onMessage(
                from,
                `
               Tudo bem! Aguarde um momento que em breve um de nossos atendentes entrara em contato.

               Para voltar ao inicio, Responda *Voltar ao menu*

                
                `
            );
            return;
        }
        return;
    }
 })