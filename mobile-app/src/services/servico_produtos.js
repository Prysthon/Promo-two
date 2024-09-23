// src/services/servico_produtos.js

export const getProdutos = async (category = null, avaliable = 'Sim', active = true) => {
    try {
      // Definindo a URL base
      let url = 'http://10.0.2.2:5001/api/products';
      
      // Verifica se há uma categoria e ajusta a URL
      let queryParams = [];
      if (category) {
        queryParams.push(`category=${encodeURIComponent(category)}`);
      }
      queryParams.push(`avaliable=${encodeURIComponent(avaliable)}`);
      queryParams.push(`active=${encodeURIComponent(active)}`);
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
  
      // Faz a requisição GET para o servidor Flask
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      // Verifica se a resposta foi bem-sucedida
      if (response.ok) {  // response.ok verifica se o status está entre 200 e 299
        return { success: true, produtos: data };
      } else {
        return { success: false, message: data.message || 'Erro ao obter produtos' };
      }
    } catch (error) {
      // Em caso de erro na requisição (ex: servidor indisponível)
      return { success: false, message: 'Erro na conexão com o servidor' };
    }
  };
  