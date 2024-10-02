// enderecosApi.js
import io from 'socket.io-client';

// Conecte-se ao WebSocket do servidor (você pode reutilizar o mesmo socket ou criar outro se necessário)
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para escutar atualizações de endereço
export const subscribeToEnderecoAtualizado = (callback) => {
  socket.on('enderecoAtualizado', callback);
};

// Função para obter os endereços de um cliente via WebSocket
export const getEnderecosCliente = (user_id) => {
  return new Promise((resolve, reject) => {
    socket.emit('getEnderecosCliente', { user_id });

    // Escutando o evento 'enderecosCliente' para pegar a resposta do servidor
    socket.once('enderecosCliente', (data) => {
      if (data) {
        resolve(data);  // Passa a resposta para o frontend
      } else {
        reject(new Error('Nenhuma resposta do servidor'));
      }
    });

    // Timeout caso a resposta demore mais de 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao buscar endereços do cliente'));
    }, 5000);
  });
};

// Função para adicionar um endereço
export const addEnderecoCliente = (user_id, endereco) => {
  socket.emit('addEnderecoCliente', {
    user_id,
    endereco
  });
};

// Função para deletar um endereço
export const deleteEnderecoCliente = (user_id, nome_endereco) => {
  socket.emit('deleteEnderecoCliente', {
    user_id,
    nome_endereco
  });
};

// Função para atualizar um endereço
export const updEnderecoCliente = (user_id, endereco) => {
  socket.emit('updEnderecoCliente', {
    user_id,
    endereco
  });
};
