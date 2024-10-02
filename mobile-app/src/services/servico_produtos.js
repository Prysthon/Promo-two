// src/services/servico_produtos.js
import io from 'socket.io-client';

// Conecte-se ao WebSocket do servidor
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para obter os produtos via WebSocket
export const getProdutos = (category, avaliable, active) => {
  return new Promise((resolve, reject) => {
    // Emitir o evento para buscar produtos, enviando os parâmetros necessários
    socket.emit('getProdutosCategoria', { category, avaliable, active });

    // Escutando o evento 'produtosResponse' para pegar a resposta do servidor
    socket.once('produtosResponse', (data) => {
      if (data) {
        resolve({ success: true, produtos: data });
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });

    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar produtos'));
    }, 5000);
  });
};

// Função para adicionar um novo produto
export const addProduto = (produto) => {
  socket.emit('addProduto', { produto });
};

// Função para deletar um produto
export const deleteProduto = (produtoId) => {
  socket.emit('deleteProduto', { produtoId });
};

// Função para atualizar um produto existente
export const updProduto = (produto) => {
  socket.emit('updProduto', { produto });
};

  