import { Socket } from 'socket.io';

global._mapList = new Map();

const SocketService = {
    connection: async (socket: Socket) => {

        console.log(socket.id, ' :connect');
        socket.on('disconnect', () => {
            console.log(socket.id, ' :disconnected');
        });

        socket.on('user-connect', async (userId) => {
            console.log('User ID:', userId);
            global._mapList.set(userId, socket.id);
            console.log('User socket => ', global._mapList)
        });
    }
}

export default SocketService
