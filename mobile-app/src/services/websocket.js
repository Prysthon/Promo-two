// services/websocket.js

export default class WebSocketService {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      console.log(`Conectado ao WebSocket: ${url}`);
    };

    this.ws.onclose = () => {
      console.log(`Conexão WebSocket fechada: ${url}`);
    };

    this.ws.onerror = (error) => {
      console.log(`Erro no WebSocket (${url}):`, error.message);
    };
  }

  // Função para enviar mensagens
  sendMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.log('Conexão WebSocket não está aberta.');
    }
  }

  // Função para adicionar um callback de mensagem recebida
  onMessage(callback) {
    this.ws.onmessage = (event) => {
      callback(event.data);
    };
  }

  // Fechar a conexão WebSocket
  closeConnection() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
