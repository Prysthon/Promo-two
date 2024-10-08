from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
import eventlet
import eventlet.green.socket  # Necessário para compatibilidade com Eventlet

from mocks.enderecos import enderecos
from mocks.produtos import produtos  # Importando o mock dos produtos
from mocks.categorias import categories # Importando o mock das categorias
from mocks.lojas import get_lojas # Importando os mocks das lojas e produtos
from mocks.usuarios import usuarios

# Aplicação Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua_chave_secreta_aqui'  # Substitua por uma chave secreta segura

# Inicialização do SocketIO com Eventlet
socketio = SocketIO(
    app,
    async_mode='eventlet',
    cors_allowed_origins="*",  # Permite conexões de qualquer origem. Ajuste conforme necessário.
    logger=True,               # Habilita logs do SocketIO
    engineio_logger=True
)

# Dicionário global para a sacola
sacola = {
    1: [  # Simulação de uma sacola com sale_id = 1
        {'sale_id': 1, 'produto_id': 1000, 'quantity': 2, 
         'price': 100.00, 'nome': 'teste1', 'imagem': 'https://via.placeholder.com/100' 
        },
        {'sale_id': 1, 'produto_id': 2000, 'quantity': 1, 
         'price': 50.00, 'nome': 'teste2', 'imagem': 'https://via.placeholder.com/100'
        }
    ]
}

# Nova rota HTTP para acessar as lojas
@socketio.on('getLojas')
def api_get_lojas():
    # Retorna as lojas simuladas do mock
    emit ('lojas', {'data': get_lojas()})

# Rota para acessar os produtos de uma loja específica
@socketio.on('getProdutosLoja')
def handle_getProdutosLoja(lojaId):
    lojas = get_lojas()
    loja = next((l for l in lojas if l['id'] == lojaId["lojaId"]), None)
    
    if loja:
        emit('produtosLoja', { 'produtosLoja': loja })
    else:
        emit('ProdutosNaoEncontrados', {'message': 'enderecos_cliente'})

# Filtro de produtos por categoria
@app.route('/api/produtos', methods=['GET'])
def api_get_produtos_categoria():
    categoria = request.args.get('categoria')
    lojas = get_lojas()

    produtos_filtrados = []
    for loja in lojas:
        produtos_filtrados.extend([p for p in loja['produtos'] if p['category'] == categoria])

    if produtos_filtrados:
        return jsonify(produtos_filtrados), 200
    else:
        return jsonify({'error': 'Nenhum produto encontrado para essa categoria'}), 404

@socketio.on('getCategorias')
def handle_get_categorias():
    socketio.emit('categoriasResponse', categories)

# Evento WebSocket para obter produtos
@socketio.on('getProdutosCategoria')
def handle_get_produtos(data):
    print('OIAAAAAAA')
    category = data.get('category')
    avaliable = data.get('avaliable', 'Sim')
    active = data.get('active', True)
    
    # Filtrar os produtos de acordo com os parâmetros
    produtos_filtrados = getProdutosDB(category=category, avaliable=avaliable, active=active)
    
    # Emitir a resposta com os produtos filtrados
    emit('produtosResponse', produtos_filtrados)

# Função auxiliar para buscar produtos
def getProdutosDB(category=None, avaliable=None, active=True):
    produtos_filtrados = produtos
    if category:
        produtos_filtrados = [p for p in produtos_filtrados if p.get('category') == category]
    if avaliable:
        produtos_filtrados = [p for p in produtos_filtrados if p.get('avaliable') == avaliable]
    if active is not None:
        produtos_filtrados = [p for p in produtos_filtrados if p.get('active') == active]
    
    return produtos_filtrados

# Login WebSocket
@socketio.on('login')
def handle_login(data):
    username = data.get('username')
    password = data.get('password')

    # Verifica se o usuário e a senha são corretos
    user = next((user for user in usuarios if user['username'] == username and user['password'] == password), None)

    if user:
        emit('login_response', {'message': 'Conectado com sucesso!'}, broadcast=False)
    else:
        emit('login_response', {'message': 'Usuário ou senha inválidos'}, broadcast=False)

# Cadastro WebSocket
@socketio.on('register')
def handle_register(data):
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Verificar se as senhas coincidem
    if password != confirm_password:
        emit('register_response', {'message': 'As senhas não coincidem.'}, broadcast=False)
        return

    # Verificar se o usuário ou e-mail já existe
    if any(user['username'] == username for user in usuarios):
        emit('register_response', {'message': 'Nome de usuário já existe.'}, broadcast=False)
        return
    if any(user['email'] == email for user in usuarios):
        emit('register_response', {'message': 'E-mail já cadastrado.'}, broadcast=False)
        return

    # Adicionar novo usuário ao "banco de dados"
    new_user = {
        'username': username,
        'email': email,
        'password': password  # Não recomendado armazenar a senha diretamente; use hashing!
    }
    usuarios.append(new_user)

    emit('register_response', {'message': 'Usuário cadastrado com sucesso!'}, broadcast=False)

# Rota para o front-end
# @app.route('/')
# def index():
#     return render_template('index.html')

# Eventos de conexão e desconexão
@socketio.on('connect')
def handle_connect():
    print("Cliente conectado")
    emit('status', {'message': 'Conectado ao servidor WebSocket'})

@socketio.on('disconnect')
def handle_disconnect():
    print("Cliente desconectado")

# Evento para obter produtos com base em filtros
@socketio.on('getProdutos')
def handle_getProdutos(data):
    promotion = data.get('promotion')      # 'Sim' ou 'Nao'
    user_id = data.get('user_id')
    category = data.get('category')
    avaliable = data.get('avaliable')      # 'Sim' ou 'Nao'
    active = data.get('active', True)

    emit('produtos', {'produtos': produtos})

# Eventos para manipulação da sacola
@socketio.on('getProdutosSacola')
def handle_getProdutosSacola(data):
    sale_id = data.get('sale_id')
    if sale_id in sacola:
        emit('produtos', {'success': True, 'produtos': sacola[sale_id]})
    else:
        emit('produtos', {'success': False, 'produtos': []})

@socketio.on('updateSacola')
def handle_updateSacola(data):
    action = data.get('action')           # 'add', 'remove', 'clear'
    sale_id = data.get('sale_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    price = data.get('price', 0.0)
    nome = data.get('nome', 'não encontrado')
    imagem = data.get('imagem', '')
    if action == 'add':
        addProdutoSacola(sale_id, product_id, quantity, price, nome, imagem)
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

# Eventos para pegar, adicionar e retirar endereco(s)
@socketio.on('getEnderecosCliente')
def handle_getEnderecosCliente(data):
    user_id = data.get('user_id')
    enderecos_cliente = enderecos.get(user_id, [])
    
    if not enderecos_cliente:
        emit('enderecoNaoEncontrado', {'message': 'Nenhum endereço encontrado para este usuário.'})
    else:
        emit('enderecosCliente', {'enderecos': enderecos_cliente})

@socketio.on('deleteEnderecoCliente')
def handle_deleteEnderecoCliente(data):
    user_id = data.get('user_id')
    nome_endereco = data.get('nome_endereco')

    if user_id not in enderecos:
        emit('erroDelecaoEndereco', {'message': 'Usuário não encontrado.'})
        return
    
    enderecos_cliente = enderecos[user_id]
    endereco_encontrado = False

    for endereco in enderecos_cliente:
        if endereco['nome'] == nome_endereco:
            enderecos_cliente.remove(endereco)
            endereco_encontrado = True
            break
    
    if endereco_encontrado:
        emit('enderecoDeletado', {'message': 'Endereço deletado com sucesso.'})
    else:
        emit('erroDelecaoEndereco', {'message': 'Endereço não encontrado.'})

@socketio.on('addEnderecoCliente')
def handle_addEnderecoCliente(data):
    user_id = data.get('user_id')
    novo_endereco = data.get('endereco')

    if not novo_endereco:
        emit('erroAdicaoEndereco', {'message': 'Dados de endereço inválidos.'})
        return

    if user_id not in enderecos:
        enderecos[user_id] = []

    # Adiciona o novo endereço
    enderecos[user_id].append(novo_endereco)
    
    emit('enderecoAdicionado', {'message': 'Endereço adicionado com sucesso.', 'endereco': novo_endereco})

# Eventos para manipulação de endereço e token
@socketio.on('updEnderecoCliente')
def handle_updEnderecoCliente(data):
    user_id = data.get('user_id')
    endereco = data.get('endereco')
    updEnderecoCliente(user_id, endereco)
    emit('enderecoAtualizado', {'message': 'Endereço atualizado com sucesso', 'endereco': endereco})

@socketio.on('saveTokenFirebase')
def handle_saveTokenFirebase(data):
    user_id = data.get('user_id')
    token = data.get('token')
    saveTokenFirebaseCliente(user_id, token)
    emit('tokenSalvo', {'message': 'Token Firebase salvo com sucesso', 'token': token})

# Evento para salvar chamados
@socketio.on('saveChamado')
def handle_saveChamado(data):
    chamado_id = data.get('chamado_id')
    user_id = data.get('user_id')
    assunto = data.get('assunto')
    descricao = data.get('descricao')
    user_type = data.get('user_type', 'customer')
    status = data.get('status', 'aberto')
    resultado = saveChamadoCliente(chamado_id, user_id, assunto, descricao, user_type, status)
    emit('chamadoSalvo', {'message': resultado})

def addProdutoSacola(sale_id, product_id, quantity, price, nome, imagem):
    # Adiciona ou atualiza o produto à sacola da venda especificada
    sale_item = {
        'sale_id': sale_id,
        'produto_id': product_id,
        'quantity': quantity,
        'price': price,
        'nome': nome,
        'imagem': imagem
    }
    if sale_id not in sacola:
        sacola[sale_id] = []
    # Verifica se o produto já existe na sacola
    for item in sacola[sale_id]:
        if item['produto_id'] == product_id:
            # Atualiza a quantidade do produto
            item['quantity'] = quantity
            return  # Sai da função, pois o produto foi atualizado
    # Se o produto não existir, adiciona o produto à sacola
    sacola[sale_id].append(sale_item)

def delProdutoSacola(sale_id, product_id):
    # Remove o produto da sacola da venda especificada
    if sale_id in sacola:
        sacola[sale_id] = [item for item in sacola[sale_id] if item['produto_id'] != product_id]
        if not sacola[sale_id]:
            del sacola[sale_id]

def delSacola(sale_id):
    # Esvazia a sacola da venda especificada
    sacola.pop(sale_id, None)

def updEnderecoCliente(user_id, endereco):
    # Simula a atualização do endereço do cliente
    # Aqui você pode simular atualizando um dicionário ou integrar com um banco de dados real
    pass

def saveTokenFirebaseCliente(user_id, token):
    # Simula o salvamento do token Firebase do cliente
    # Aqui você pode simular atualizando um dicionário ou integrar com um banco de dados real
    pass

def saveChamadoCliente(chamado_id, user_id, assunto, descricao, user_type, status):
    # Simula o salvamento ou atualização de um chamado
    if chamado_id:
        return f'Chamado {chamado_id} atualizado com sucesso'
    else:
        novo_chamado_id = 123  # ID simulado para o novo chamado
        return f'Novo chamado criado com ID {novo_chamado_id}'

# Execução do Servidor
if __name__ == '__main__':
    # Executa o servidor SocketIO com Eventlet
    socketio.run(app, host='127.0.0.1', port=5001, debug=False)




# Usar os mesmos nomes das tabelas do banco de dados abaixo.

# from django.contrib.auth.models import AbstractUser
# from django.db import models

# # from django.db.models import JSONField
# # from django_jsonfield_backport.models import JSONField

# USER_TYPE_CHOICES = (
#     ('store_owner', 'Lojista'),
#     ('deliveryman', 'Entregador'),
#     ('customer', 'Cliente')
# )


# class CustomUser(AbstractUser):
#     user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
#     isAdmin = models.BooleanField(default=False)
#     active = models.BooleanField(default=True)
#     avaliable = models.BooleanField(default=False)
#     banned = models.BooleanField(default=False)
#     token = models.CharField(max_length=255, blank=True, null=True)


# # print({'user':request.user,
# #                 'category':categoria,
# #                 'image':None,
# #                 'name':nomeProduto,
# #                 'description':descricao,
# #                 'price':preco_total,
# #                 'quantity':quantidade,
# #                 'avaliable':disponivel,
# #                 'promotion':promocao,
# #                 'commission' : comissao,
# #                 'earnigs' : preco})
# class Product(models.Model):
#     AVALIABLE_CHOICES = (
#         ('Sim', 'Sim'),
#         ('Nao', 'Nao'),
#     )
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     category = models.CharField(max_length=100, default='Outros')
#     image = models.ImageField(upload_to='products/', default=None)
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     quantity = models.PositiveIntegerField()
#     avaliable = models.CharField(max_length=3, choices=AVALIABLE_CHOICES, default='nao')
#     promotion = models.CharField(max_length=3)
#     commission = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     earnigs = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     active = models.BooleanField(default=True)
#     # Adicione mais campos conforme necessário


# class CashFlow(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     entry = models.DecimalField(max_digits=10, decimal_places=2)
#     exit = models.DecimalField(max_digits=10, decimal_places=2)
#     balance = models.DecimalField(max_digits=10, decimal_places=2)
#     timestamp = models.DateTimeField(auto_now_add=True)

#     # Adicione mais campos conforme necessário


# class Call(models.Model):
#     USER_TYPE_CHOICES = (
#         ('store_owner', 'Lojista'),
#         ('deliveryman', 'Entregador'),
#         ('customer', 'Cliente'),
#     )

#     STATUS_CHOICES = (
#         ('em_andamento', 'Em Andamento'),
#         ('concluido', 'Concluído'),
#         ('aberto', 'Aberto'),
#     )

#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     assunto = models.CharField(max_length=200)
#     descricao = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='customer')
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberto')

#     def __str__(self):
#         return f"Chamado de {self.user.username} - {self.assunto}"


# class UserProfile(models.Model):
#     USER_TYPE_CHOICES = (
#         ('store_owner', 'Lojista'),
#         ('deliveryman', 'Entregador'),
#         ('customer', 'Cliente'),
#     )
#     user = models.OneToOneField('core.CustomUser', on_delete=models.CASCADE)
#     user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='customer')

#     # Adicione mais campos de perfil do usuário, se necessário

#     def __str__(self):
#         return self.user.username


# class UserFeatures(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     nome = models.CharField(max_length=100)
#     cpf = models.CharField(max_length=14)
#     street = models.CharField(max_length=200, null=True, blank=True)
#     bairro = models.CharField(max_length=50, null=True, blank=True)
#     numero = models.CharField(max_length=10, null=True, blank=True)
#     complemento = models.CharField(max_length=200, null=True, blank=True)
#     referencia = models.CharField(max_length=200, null=True, blank=True)
#     telefone = models.CharField(max_length=20, null=True, blank=True)
#     zip_code = models.CharField(max_length=10, null=True, blank=True)
#     latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     estado = models.CharField(max_length=50)
#     cidade = models.CharField(max_length=50)
#     estado_civil = models.CharField(max_length=20)
#     quantidade_filhos = models.PositiveIntegerField()

#     def __str__(self):
#         return self.nome


# class Sale(models.Model):
#     CHOICES_PAYMENT = (
#         ('pendente', 'Pendente'),
#         ('pedido aceito', 'Pedido Aceito'),
#         ('pedido recusado', 'Pedido Recusado'),
#         ('entrega aceita', 'Entrega Aceita'),
#         ('entrega recusada', 'Entrega Recusada'),
#         ('entrega realizada', 'Entrega Realizada'),
#         ('pago', 'Pago'),
#     )
#     CHOICES_ORDER = (
#         ('aceito', 'Aceito'),
#         ('recusado', 'Recusado'),
#         ('pendente', 'Pendente'),
#     )
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     seller = models.ForeignKey(CustomUser, related_name='sales', on_delete=models.CASCADE, null=True, blank=True)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     status = models.CharField(max_length=20, choices=CHOICES_PAYMENT, default='pendente')
#     status_order = models.CharField(max_length=20, choices=CHOICES_ORDER, default='pendente')
#     response = models.CharField(max_length=25, null=True, blank=True)
#     id_deliveryman = models.PositiveIntegerField(default=0)
#     paid = models.DateTimeField(null=True, blank=True)
#     store_accepted = models.DateTimeField(null=True, blank=True)
#     deliveryman = models.CharField(max_length=10, null=True, blank=True)
#     deliveryman_accepted = models.DateTimeField(null=True, blank=True)
#     deliveryman_left_store = models.DateTimeField(null=True, blank=True)
#     deliveryman_completed = models.DateTimeField(null=True, blank=True)
#     customer_canceled = models.DateTimeField(null=True, blank=True)
#     store_canceled = models.DateTimeField(null=True, blank=True)
#     deliveryman_canceled = models.DateTimeField(null=True, blank=True)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
#     latitude_store = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     longitude_store = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     latitude_customer = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     longitude_customer = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
#     route_distance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     freight_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

#     def __str__(self):
#         return f"Id: {self.id}\n\
#                 Status da compra: {self.status}\n\
#                 Total: {self.total_price}\n\
#                 ID do entregador: {self.id_deliveryman}\n\
#                 Usuário: {self.user.username}\n\
#                 "

#     @property
#     def get_items(self):
#         return self.sale_items.all()


# class SaleItem(models.Model):
#     sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name='sale_items')
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"{self.quantity}x {self.product.name} - {self.sale.id}"


# class BackupFile(models.Model):
#     file = models.FileField(upload_to='backups/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)
# # class Deliveryman(models.Model):
# #     id__venda = models.ForeignKey(Sale, on_delete=models.CASCADE)
# #     id_entregador = models.PositiveIntegerField()
# #     latitude_store = models.DecimalField(max_digits=9, decimal_places=6)
# #     longitude_store= models.DecimalField(max_digits=9, decimal_places=6)
# #     latitude_customer = models.DecimalField(max_digits=9, decimal_places=6)
# #     longitude_customer = models.DecimalField(max_digits=9, decimal_places=6)
# #     dist_loja_cliente = models.DecimalField(max_digits=10, decimal_places=2)
# #     dist_km = models.DecimalField(max_digits=10, decimal_places=2)
# #     freight_value = models.DecimalField(max_digits=10, decimal_places=2)
