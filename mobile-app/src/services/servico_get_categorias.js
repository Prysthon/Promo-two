// src/services/categoriaService.js
export const getCategorias = async () => {
  try {
    const response = await fetch('http://10.0.2.2:5001/api/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    const data = await response.json();

    if (response.status === 200) {
      return { success: true, categorias: data };
    } else {
      return { success: false, message: 'Erro ao buscar categorias' };
    }
  } catch (error) {
    return { success: false, message: 'Erro na conexão com o servidor' };
  }
};
