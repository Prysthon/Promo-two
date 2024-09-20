
import io from 'socket.io-client';

// Conexão com o servidor WebSocket
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para escutar atualizações das lojas
export const subscribeToLojasAtualizadas = (callback) => {
  socket.on('lojasAtualizadas', callback);
};

// Função para obter as lojas disponíveis via WebSocket
export const getLojas = () => {
  return new Promise((resolve, reject) => {
    socket.emit('getLojas');
    // Escutando o evento 'lojas' para pegar a resposta do servidor
    socket.once('lojas', (data) => {
      if (data) {
        resolve(data);  // Passa as lojas para o frontend
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });
    
    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar lojas'));
    }, 20000);
  });
};

// Função para obter os produtos de uma loja específica
export const getProdutosLoja = (lojaId) => {
  return new Promise((resolve, reject) => {
    socket.emit('getProdutosLoja', { lojaId });

    // Escutando o evento 'produtosLoja' para pegar a resposta do servidor
    socket.once('produtosLoja', (data) => {
      if (data) {
        resolve(data);  // Passa os produtos da loja para o frontend
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });

    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar produtos da loja'));
    }, 5000);
  });
};
