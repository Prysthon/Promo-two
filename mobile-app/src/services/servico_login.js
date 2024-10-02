// servico_login.js
import io from 'socket.io-client';

// Conectar ao WebSocket do servidor
const socket = io('http://10.0.2.2:5001', {
  transports: ['websocket'],
  jsonp: false,
  autoConnect: true
});

// Função para fazer login via WebSocket
export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    // Emitir evento de login
    socket.emit('login', { username, password });

    // Escutar a resposta do servidor
    socket.once('login_response', (data) => {
      if (data.message === 'Conectado com sucesso!') {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: data.message });
      }
    });

    // Timeout se não houver resposta em 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao tentar login'));
    }, 5000);
  });
};

// Função para registrar um novo usuário via WebSocket
export const registerUser = (username, email, password, confirm_password) => {
  return new Promise((resolve, reject) => {
    // Emitir evento de registro
    socket.emit('register', { username, email, password, confirm_password });

    // Escutar a resposta do servidor
    socket.once('register_response', (data) => {
      if (data.message === 'Usuário cadastrado com sucesso!') {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: data.message });
      }
    });

    // Timeout se não houver resposta em 5 segundos
    setTimeout(() => {
      reject(new Error('Timeout ao tentar registrar'));
    }, 5000);
  });
};
