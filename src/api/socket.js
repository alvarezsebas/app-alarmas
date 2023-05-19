import io from 'socket.io-client';

const SOCKET_URL = "http://138.121.170.119:5000"

class socketService {
    initializeSocket = async () => {
        try {
            this.socket = io(SOCKET_URL, {
                transports:['websocket']
            })

            this.socket.on('connect', (data)=>{
                console.log("==== Socket conectado");
            });
            this.socket.on('disconnect', (data)=>{
                console.log("==== Socket desconectado");
            });
            this.socket.on('error', (data)=>{
                console.log("==== Socket error", data);
            });

        } catch (error) {
            console.log("Socket no esta inicializado", error);
        }
    }

    emit(event, data ={}){
        this.socket.emit(event, data);
    }

    on(event, cb ){
        this.socket.on(event, cb);
    }
}

const socketServices = new socketService();

export default socketServices;