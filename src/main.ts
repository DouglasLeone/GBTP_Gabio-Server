import { ComunicadorServer } from "./Comunicacao/comunicadorServer";

const server = new ComunicadorServer();

server.setOnRequest((msg : string) => {
    
    console.log("Processando mensagem");

    return `STATUS:OK
    MESSAGE:Mensagem recebida
    BALANCE:0`;

})

server.startServer(8080);
