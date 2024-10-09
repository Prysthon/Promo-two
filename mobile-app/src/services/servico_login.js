import { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";

// Hook personalizado para conectar e gerenciar o WebSocket
export const useWebSocket = (url, initialFunction, initialData) => {
  const [isOpen, setIsOpen] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // Cria a conexão WebSocket
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log("WebSocket conectado");
      setIsOpen(true);

      // Envia a função e os dados de usuário após a conexão
      const initialMessage = {
        funcao: initialFunction,
        ...initialData,
      };

      // Enviar os dados de função e usuário no momento da conexão
      socket.current.send(JSON.stringify(initialMessage));
      console.log("Função inicial e dados enviados:", initialMessage);
    };

    socket.current.onclose = () => {
      console.log("WebSocket desconectado");
      setIsOpen(false);
    };

    socket.current.onerror = (error) => {
      console.log("WebSocket erro: ", error);
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
    };

    // Limpeza da conexão ao desmontar o componente
    return () => {
      socket.current.close();
    };
  }, [url, initialFunction, initialData]);

  return { socket: socket.current, isOpen };
};

// Função de login para autenticar o cliente
export const loginCliente = (socket, username, password) => {
  return new Promise((resolve, reject) => {
    // Verifica se o WebSocket está conectado
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      reject("WebSocket não está conectado");
      return;
    }

    // Dados de login e a função (funcao + dados juntos)
    const loginData = {
      funcao: "getTokenCliente",
      username,
      password,
    };

    // Envia os dados de login para o servidor WebSocket
    socket.send(JSON.stringify(loginData));

    // Escuta a resposta do servidor
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Resposta do servidor:", response);

      // Valida a resposta do servidor
      if (response.sucesso) {
        resolve(response.token); // Sucesso, retorna o token
      } else {
        reject("Autenticação falhou. Verifique as credenciais.");
      }
    };

    // Tratamento de erro na comunicação WebSocket
    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      reject("Erro na comunicação com o servidor.");
    };
  });
};

// Exemplo de uso do hook useWebSocket e loginCliente
const ExampleComponent = () => {
  const initialFunction = "getTokenCliente";
  const initialData = { username: "usuario", password: "senha123" };

  // Aqui, você pode definir a função e os dados que precisam ser enviados no momento da conexão
  const { socket, isOpen } = useWebSocket("ws://localhost:8000/ws/cliente/", initialFunction, initialData);
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    if (isOpen) {
      loginCliente(socket, "usuario", "senha123")
        .then((token) => {
          setToken(token);
          console.log("Token recebido:", token);
        })
        .catch((error) => {
          Alert.alert("Erro de Login", error);
        });
    } else {
      Alert.alert("Erro", "Conexão WebSocket não está aberta.");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {token && <p>Token: {token}</p>}
    </div>
  );
};
