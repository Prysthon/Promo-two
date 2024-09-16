// api.js
import io from 'socket.io-client';

// Conecte-se ao WebSocket do servidor
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para escutar atualizações da sacola
export const subscribeToSacolaAtualizada = (callback) => {
  socket.on('sacolaAtualizada', callback);
};

// Função para obter os produtos da sacola via WebSocket
export const getProdutosSacola = (sale_id) => {
  return new Promise((resolve, reject) => {
    socket.emit('getProdutosSacola', { sale_id });

    // Escutando o evento 'produtos' para pegar a resposta do servidor
    socket.once('produtos', (data) => {
      if (data) {
        resolve(data);  // Passa a resposta para o frontend
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });

    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar produtos da sacola'));
    }, 5000);
  });
};

// Função para adicionar um produto à sacola
export const addProdutoSacola = (sale_id, product_id, quantity, price) => {
  socket.emit('updateSacola', {
    action: 'add',
    sale_id,
    product_id,
    quantity,
    price
  });
};

// Função para remover um produto da sacola
export const removeProdutoSacola = (sale_id, product_id) => {
  socket.emit('updateSacola', {
    action: 'remove',
    sale_id,
    product_id
  });
};

// Função para limpar a sacola
export const clearSacola = (sale_id) => {
  socket.emit('updateSacola', {
    action: 'clear',
    sale_id
  });
};
