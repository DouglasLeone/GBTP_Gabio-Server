import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

export class ComunicadorServer {
    private onRequestCallback: ((msg: string) => string | Promise<string>) | null = null;

    public startServer(porta: number) {

        const httpServer: http.Server = http.createServer((req, res) => {

            res.writeHead(200, {
                'Content-Type': 'text/plain' 
            });
            
            res.end('GBTP Websocket Server is running');
        });

        const wss: WebSocketServer = new WebSocketServer({
            server: httpServer 
        });

        wss.on('connection', (ws: WebSocket) => {

            console.log('[CLIENTE] Novo cliente conectado');

            ws.on('message', async (data) => {
                
                const msg: string = data.toString();

                console.log('[RECEBIDO]');
                console.log(msg);

                if (!this.onRequestCallback) {
                    ws.send('ERROR: No handler configured');
                    return;
                }

                try {

                    const response = await this.onRequestCallback(msg);

                    if(!response || typeof response !== 'string') {
                        throw new Error('Resposta inválida');
                    }

                    console.log('[ENVIADO]');
                    console.log(response);

                    ws.send(response);

                } catch (error) {
                    console.error(
                        "[ERRO] Falha ao processar mensagem",
                        error
                    );

                    ws.send('ERROR:Internal server error');
                }
            });

            ws.on('close', () => {
                console.log('[CLIENTE] Cliente desconectado');
            });
            ws.on('error', (error) => {
                console.log('[WEBSOCKET ERROR]', error);
            });
        });

        httpServer.listen(porta, () => {
            console.log(`[SERVIDOR] Websocket ouvindo na porta ${porta}`);
        });
    }

    public setOnRequest(callback: (msg: string) => string | Promise<string>) : void {
        this.onRequestCallback = callback;
    }

}