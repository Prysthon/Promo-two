# Mock de produtos, conforme fornecido
produtos = [
  {
    'id': 1,
    'category': 'Elétricos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Lâmpada LED',
    'description': 'Lâmpada LED 12W',
    'price': 15.00,
    'quantity': 100,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.5,
    'distancia': '10 km'
  },
  {
    'id': 2,
    'category': 'Hidráulicos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Torneira',
    'description': 'Torneira de metal',
    'price': 30.00,
    'quantity': 50,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 20.00,
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.2,
    'distancia': '15 km'
  },
  {
    'id': 3,
    'category': 'Ferragens',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Martelo',
    'description': 'Martelo de aço',
    'price': 20.00,
    'quantity': 20,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.0,
    'distancia': '8 km'
  },
  {
    'id': 4,
    'category': 'Utensílios',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Panela',
    'description': 'Panela de ferro',
    'price': 120.00,
    'quantity': 10,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 100.00,
    'active': True,
    'tempo_entrega': '7 dias',
    'avaliacao': 4.8,
    'distancia': '20 km'
  },
  {
    'id': 5,
    'category': 'Roupas',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Camiseta',
    'description': 'Camiseta de algodão',
    'price': 35.00,
    'quantity': 200,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '4 dias',
    'avaliacao': 4.3,
    'distancia': '12 km'
  },
  {
    'id': 6,
    'category': 'Elétricos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Ferro de Passar',
    'description': 'Ferro de passar a vapor',
    'price': 80.00,
    'quantity': 30,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.6,
    'distancia': '10 km'
  },
  {
    'id': 7,
    'category': 'Elétricos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Liquidificador',
    'description': 'Liquidificador 500W',
    'price': 60.00,
    'quantity': 40,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 40.00,
    'active': True,
    'tempo_entrega': '4 dias',
    'avaliacao': 4.4,
    'distancia': '10 km'
  },
  {
    'id': 8,
    'category': 'Hidráulicos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Chuveiro Elétrico',
    'description': 'Chuveiro 5500W',
    'price': 150.00,
    'quantity': 25,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.1,
    'distancia': '15 km'
  },
  {
    'id': 9,
    'category': 'Hidráulicos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Caixa D’água',
    'description': 'Caixa d’água 300 litros',
    'price': 200.00,
    'quantity': 15,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 150.00,
    'active': True,
    'tempo_entrega': '6 dias',
    'avaliacao': 4.5,
    'distancia': '15 km'
  },
  {
    'id': 10,
    'category': 'Ferragens',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Parafusos',
    'description': 'Parafusos variados',
    'price': 10.00,
    'quantity': 500,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '1 dia',
    'avaliacao': 4.0,
    'distancia': '8 km'
  },
  {
    'id': 11,
    'category': 'Ferragens',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Chave de Fenda',
    'description': 'Chave de fenda Phillips',
    'price': 25.00,
    'quantity': 60,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 20.00,
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.2,
    'distancia': '8 km'
  },
  {
    'id': 12,
    'category': 'Utensílios',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Faca de Cozinha',
    'description': 'Faca de aço inox',
    'price': 50.00,
    'quantity': 80,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.7,
    'distancia': '20 km'
  },
  {
    'id': 13,
    'category': 'Utensílios',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Espátula',
    'description': 'Espátula de silicone',
    'price': 15.00,
    'quantity': 150,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 10.00,
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.3,
    'distancia': '20 km'
  },
  {
    'id': 14,
    'category': 'Roupas',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Calça Jeans',
    'description': 'Calça jeans masculina',
    'price': 80.00,
    'quantity': 120,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 15.00,
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.5,
    'distancia': '12 km'
  },
  {
    'id': 15,
    'category': 'Roupas',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Vestido',
    'description': 'Vestido de verão',
    'price': 100.00,
    'quantity': 70,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '4 dias',
    'avaliacao': 4.6,
    'distancia': '12 km'
  },
  {
    'id': 16,
    'category': 'Calçados',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Tênis',
    'description': 'Tênis esportivo',
    'price': 120.00,
    'quantity': 90,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 110.00,
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.4,
    'distancia': '14 km'
  },
  {
    'id': 17,
    'category': 'Calçados',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Sandália',
    'description': 'Sandália confortável',
    'price': 60.00,
    'quantity': 110,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '4 dias',
    'avaliacao': 4.2,
    'distancia': '14 km'
  },
  {
    'id': 18,
    'category': 'Acessórios',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Relógio',
    'description': 'Relógio analógico',
    'price': 250.00,
    'quantity': 40,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 150.00,
    'active': True,
    'tempo_entrega': '6 dias',
    'avaliacao': 4.7,
    'distancia': '18 km'
  },
  {
    'id': 19,
    'category': 'Acessórios',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Bolsa',
    'description': 'Bolsa de couro',
    'price': 180.00,
    'quantity': 35,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.5,
    'distancia': '18 km'
  },
  {
    'id': 20,
    'category': 'Alimentos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Arroz',
    'description': 'Arroz tipo 1 - 5kg',
    'price': 25.00,
    'quantity': 300,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.3,
    'distancia': '10 km'
  },
  {
    'id': 21,
    'category': 'Alimentos',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Feijão',
    'description': 'Feijão carioca - 1kg',
    'price': 8.00,
    'quantity': 500,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 1.00,
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.4,
    'distancia': '10 km'
  },
  {
    'id': 22,
    'category': 'Bebidas',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Cerveja',
    'description': 'Cerveja lata - 350ml',
    'price': 5.00,
    'quantity': 1000,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 1.00,
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.2,
    'distancia': '10 km'
  },
  {
    'id': 23,
    'category': 'Bebidas',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Suco de Laranja',
    'description': 'Suco natural - 1 litro',
    'price': 7.00,
    'quantity': 400,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.5,
    'distancia': '10 km'
  },
  {
    'id': 24,
    'category': 'Higiene',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Sabonete',
    'description': 'Sabonete líquido',
    'price': 3.50,
    'quantity': 600,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 2.00,
    'active': True,
    'tempo_entrega': '1 dia',
    'avaliacao': 4.0,
    'distancia': '10 km'
  },
  {
    'id': 25,
    'category': 'Higiene',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Shampoo',
    'description': 'Shampoo anticaspa',
    'price': 15.00,
    'quantity': 250,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '2 dias',
    'avaliacao': 4.3,
    'distancia': '10 km'
  },
  {
    'id': 26,
    'category': 'Beleza',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Batom',
    'description': 'Batom matte',
    'price': 20.00,
    'quantity': 180,
    'avaliable': 'Sim',
    'promotion': 'Sim',
    'promotion_price': 15.00,
    'active': True,
    'tempo_entrega': '3 dias',
    'avaliacao': 4.6,
    'distancia': '10 km'
  },
  {
    'id': 27,
    'category': 'Beleza',
    'imagem': 'https://via.placeholder.com/100',
    'name': 'Perfume',
    'description': 'Perfume importado - 100ml',
    'price': 150.00,
    'quantity': 50,
    'avaliable': 'Sim',
    'promotion': 'Nao',
    'active': True,
    'tempo_entrega': '5 dias',
    'avaliacao': 4.7,
    'distancia': '10 km'
  },
]

# Mock de lojas, cada loja com uma lista de produtos
lojas = [
    {
        'id': 1,
        'nome': 'Mega Loja',
        'categorias': ['Elétricos', 'Ferragens', 'Acessórios'],
        'produtos': [produtos[0], produtos[2], produtos[18], produtos[19], produtos[6]],
        'distancia': '5 km',
        'avaliacao': 4.8,
        'imagem': 'https://via.placeholder.com/150',
        'tempo_entrega': '30 min',
        'aberta': True
    },
    {
        'id': 2,
        'nome': 'Casa & Construção',
        'categorias': ['Hidráulicos', 'Utensílios'],
        'produtos': [produtos[1], produtos[7], produtos[11], produtos[12]],
        'distancia': '8 km',
        'avaliacao': 4.6,
        'imagem': 'https://via.placeholder.com/150',
        'tempo_entrega': '40 min',
        'aberta': True
    },
    {
        'id': 3,
        'nome': 'Loja Multi',
        'categorias': ['Roupas', 'Calçados', 'Beleza'],
        'produtos': [produtos[4], produtos[14], produtos[16], produtos[25], produtos[26]],
        'distancia': '10 km',
        'avaliacao': 4.9,
        'imagem': 'https://via.placeholder.com/150',
        'tempo_entrega': '25 min',
        'aberta': True
    },
    {
        'id': 4,
        'nome': 'Supermercado do Bairro',
        'categorias': ['Alimentos', 'Bebidas', 'Higiene'],
        'produtos': [produtos[20], produtos[21], produtos[22], produtos[24]],
        'distancia': '6 km',
        'avaliacao': 4.7,
        'imagem': 'https://via.placeholder.com/150',
        'tempo_entrega': '15 min',
        'aberta': True
    }
]

# Função que retorna as lojas simuladas
def get_lojas():
    return lojas