from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
import eventlet
import eventlet.green.socket  # Necessário para compatibilidade com Eventlet

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
        {'sale_id': 1, 'product_id': 1, 'quantity': 2, 
         'price': 100.00, 'nome': 'teste1', 'imagem': 'https://via.placeholder.com/100' 
        },
        {'sale_id': 1, 'product_id': 2, 'quantity': 1, 
         'price': 50.00, 'nome': 'teste2', 'imagem': 'https://via.placeholder.com/100'
        }
    ]
}

@app.route('/connect', methods=['POST', 'GET'])
# def index():
#     return render_template('index.html')

def connect():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Verifica se o usuário e a senha são corretos
    if username == 't' and password == '123':
        return jsonify({'message': 'Conectado com sucesso!'}), 200
    else:
        return jsonify({'message': 'Usuário ou senha inválidos'}), 401

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

    produtos = getProdutosDB(promotion, user_id, category, avaliable, active)
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
