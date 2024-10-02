// src/services/servico_get_categorias.js
import io from 'socket.io-client';

// Conecte-se ao WebSocket do servidor
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para escutar atualizações de categorias (caso tenha alguma atualização em tempo real)
export const subscribeToCategoriaAtualizada = (callback) => {
  socket.on('categoriaAtualizada', callback);
};

// Função para obter as categorias via WebSocket
export const getCategorias = () => {
  return new Promise((resolve, reject) => {
    // Emitir o evento para buscar categorias
    socket.emit('getCategorias');

    // Escutando o evento 'categoriasResponse' para pegar a resposta do servidor
    socket.once('categoriasResponse', (data) => {
      if (data) {
        resolve({ success: true, categorias: data });
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });

    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar categorias'));
    }, 5000);
  });
};

// Função para adicionar uma nova categoria
export const addCategoria = (categoria) => {
  socket.emit('addCategoria', { categoria });
};

// Função para deletar uma categoria
export const deleteCategoria = (categoriaId) => {
  socket.emit('deleteCategoria', { categoriaId });
};

// Função para atualizar uma categoria existente
export const updCategoria = (categoria) => {
  socket.emit('updCategoria', { categoria });
};