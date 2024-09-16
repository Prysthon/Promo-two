from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
# Permitir conexões WebSocket de qualquer origem (origem cruzada)
socketio = SocketIO(app, cors_allowed_origins="*")

# Rota para o front-end
@app.route('/')
def index():
    return render_template('index.html')

# WebSocket - Conexão
@socketio.on('connect')
def handle_connect():
    print("Cliente conectado")
    emit('status', {'message': 'Conectado ao servidor WebSocket'})

# WebSocket - Pedido de comida
@socketio.on('place_order')
def handle_place_order(data):
    print(f"Pedido recebido: {data}")
    emit('order_status', {'status': 'Pedido recebido'}, broadcast=True)

# WebSocket - Acompanhar status do pedido
@socketio.on('track_order')
def handle_track_order(data):
    print(f"Cliente está rastreando o pedido: {data}")
    emit('order_status', {'status': 'Seu pedido está sendo preparado'}, broadcast=True)

# WebSocket - Entrar em uma sala (ex. restaurante específico)
@socketio.on('join_room')
def handle_join_room(data):
    join_room(data['room'])
    emit('status', {'message': f"Entrou na sala {data['room']}"}, room=data['room'])

# WebSocket - Sair de uma sala
@socketio.on('leave_room')
def handle_leave_room(data):
    leave_room(data['room'])
    emit('status', {'message': f"Você saiu da sala {data['room']}"}, room=data['room'])

# WebSocket - Desconectar
@socketio.on('disconnect')
def handle_disconnect():
    print("Cliente desconectado")

if __name__ == '__main__':
    socketio.run(app, debug=True)
