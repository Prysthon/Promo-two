// src/services/authService.js
export const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://10.0.2.2:5001/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
  
      if (response.status === 200) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Erro na conexão com o servidor' };
    }
  };
  