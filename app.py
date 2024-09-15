from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)
global sacola

# Dicionário global para a sacola
sacola = {}  # Chave: sale_id, Valor: lista de itens de venda (SaleItem)

# Rota para o front-end
@app.route('/')
def index():
    return render_template('index.html')

# WebSocket - Eventos de conexão e desconexão
@socketio.on('connect')
def connect():
    print("Cliente conectado")
    emit('status', {'message': 'Conectado ao servidor WebSocket'})

@socketio.on('disconnect')
def disconnect():
    print("Cliente desconectado")

# Função única para obter produtos com base em filtros
@socketio.on('getProdutos')
def getProdutos(data):
    promotion = data.get('promotion', None)  # 'Sim' ou 'Nao'
    user_id = data.get('user_id', None)
    category = data.get('category', None)
    avaliable = data.get('avaliable', None)  # 'Sim' ou 'Nao'
    active = data.get('active', True)

    produtos = getProdutosDB(promotion, user_id, category, avaliable, active)
    emit('produtos', {'produtos': produtos})

# Funções de manipulação da sacola
@socketio.on('updateSacola')
def updSacola(data):
    action = data.get('action')  # 'add', 'remove', 'clear'
    sale_id = data.get('sale_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    price = data.get('price', 0.0)

    if action == 'add':
        addProdutoSacola(sale_id, product_id, quantity, price)
        message = f'Produto {product_id} adicionado à sacola da venda {sale_id}'
    elif action == 'remove':
        delProdutoSacola(sale_id, product_id)
        message = f'Produto {product_id} removido da sacola da venda {sale_id}'
    elif action == 'clear':
        delSacola(sale_id)
        message = f'Sacola da venda {sale_id} esvaziada'
    else:
        message = 'Ação inválida'

    emit('sacolaAtualizada', {'message': message})

# Funções de manipulação de endereço e token
@socketio.on('updEnderecoCliente')
def updEnderecoCliente(data):
    user_id = data.get('user_id')
    endereco = data.get('endereco')
    updEnderecoCliente(user_id, endereco)
    emit('enderecoAtualizado', {'message': 'Endereço atualizado com sucesso', 'endereco': endereco})

@socketio.on('saveTokenFirebase')
def saveTokenFirebase(data):
    user_id = data.get('user_id')
    token = data.get('token')
    saveTokenFirebaseCliente(user_id, token)
    emit('tokenSalvo', {'message': 'Token Firebase salvo com sucesso', 'token': token})

# Função saveChamado
@socketio.on('saveChamado')
def saveChamado(data):
    chamado_id = data.get('chamado_id')
    user_id = data.get('user_id')
    assunto = data.get('assunto')
    descricao = data.get('descricao')
    user_type = data.get('user_type', 'customer')
    status = data.get('status', 'aberto')
    resultado = saveChamadoCliente(chamado_id, user_id, assunto, descricao, user_type, status)
    emit('chamadoSalvo', {'message': resultado})

# Funções auxiliares
def getProdutosDB(promotion=None, user_id=None, category=None, avaliable=None, active=True):
    # Simula a obtenção de produtos com base nos filtros fornecidos
    produtos = [
        {
            'id': 1,
            'user_id': 1,
            'category': 'Eletrônicos',
            'image': 'products/produto_a.jpg',
            'name': 'Produto A',
            'description': 'Descrição do Produto A',
            'price': 100.00,
            'quantity': 10,
            'avaliable': 'Sim',
            'promotion': 'Nao',
            'commission': 10.00,
            'earnings': 90.00,
            'active': True
        },
        {
            'id': 2,
            'user_id': 2,
            'category': 'Livros',
            'image': 'products/produto_b.jpg',
            'name': 'Produto B',
            'description': 'Descrição do Produto B',
            'price': 50.00,
            'quantity': 5,
            'avaliable': 'Sim',
            'promotion': 'Sim',
            'commission': 5.00,
            'earnings': 45.00,
            'active': True
        },
        # Adicione mais produtos conforme necessário
    ]

    # Filtra os produtos com base nos parâmetros
    if promotion is not None:
        produtos = [p for p in produtos if p.get('promotion') == promotion]

    if user_id is not None:
        produtos = [p for p in produtos if p.get('user_id') == user_id]

    if category is not None:
        produtos = [p for p in produtos if p.get('category') == category]

    if avaliable is not None:
        produtos = [p for p in produtos if p.get('avaliable') == avaliable]

    produtos = [p for p in produtos if p.get('active') == active]

    return produtos

def addProdutoSacola(sale_id, product_id, quantity, price):
    # Adiciona o produto à sacola da venda especificada
    sale_item = {
        'sale_id': sale_id,
        'product_id': product_id,
        'quantity': quantity,
        'price': price
    }
    if sale_id not in sacola:
        sacola[sale_id] = []
    sacola[sale_id].append(sale_item)

def delProdutoSacola(sale_id, product_id):
    # Remove o produto da sacola da venda especificada
    if sale_id in sacola:
        sacola[sale_id] = [item for item in sacola[sale_id] if item['product_id'] != product_id]
        if not sacola[sale_id]:
            del sacola[sale_id]

def delSacola(sale_id):
    # Esvazia a sacola da venda especificada
    sacola.pop(sale_id, None)

def updEnderecoCliente(user_id, endereco):
    # Simula a atualização do endereço do cliente
    # Aqui você pode simular atualizando um dicionário ou simplesmente passar
    pass

def saveTokenFirebaseCliente(user_id, token):
    # Simula o salvamento do token Firebase do cliente
    # Aqui você pode simular atualizando um dicionário ou simplesmente passar
    pass

def saveChamadoCliente(chamado_id, user_id, assunto, descricao, user_type, status):
    # Simula o salvamento ou atualização de um chamado
    if chamado_id:
        return f'Chamado {chamado_id} atualizado com sucesso'
    else:
        novo_chamado_id = 123  # ID simulado para o novo chamado
        return f'Novo chamado criado com ID {novo_chamado_id}'

if __name__ == '__main__':
    socketio.run(app, debug=True)
