// services/loja.js
import WebSocketService from './websocket';

export class LojaWebSocketService extends WebSocketService {
  constructor() {
    super('ws://191.252.221.120/ws/loja/');
  }

  // Função para enviar uma mensagem específica da rota "loja"
  sendLojaMessage(message) {
    this.sendMessage(message);
  }

  // Qualquer outra função específica da rota loja
  sendOrder(orderData) {
    this.sendMessage(JSON.stringify({ type: 'order', data: orderData }));
  }

  // Função de exemplo para receber mensagens e lidar com o resultado
  onOrderResponse(callback) {
    this.onMessage(callback);
  }
}
