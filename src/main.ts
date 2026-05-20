import { ComunicadorServer } from "./Comunicacao/comunicadorServer";
import { GbtpRequestParser } from "./Protocolo/GBTParser";
import { GbtpResponseBuilder } from "./Protocolo/GBTPResponse";
import { ProcessAccountUseCase } from "./RegrasNegocio/ProcessAccountUseCase";
import { AccountRepository } from "./RegrasNegocio/Account";
import { GbtpRequest } from "./Protocolo/types";
import { GbtpResponse } from "./Protocolo/types";

const server = new ComunicadorServer();
const account = new AccountRepository();

const accountUseCase = new ProcessAccountUseCase(account);


server.setOnRequest((msg : string) => {
    try {
        const parseMsg: GbtpRequest = GbtpRequestParser.parse(msg);

        const processUseCase = accountUseCase.processar(parseMsg)

        const requestMsg = GbtpResponseBuilder.stringifyResponse(processUseCase)

        return requestMsg;

    } catch (error) {

    }
})

server.startServer(8080);
