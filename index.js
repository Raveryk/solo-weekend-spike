const webSocketsServerPort = 8000;
// import web sockets
const webSocketServer = require('websocket').server
// import http
const http = require('http');

// spinning the http server and the websocket server
const server = http.createServer()
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

// create WebSocket server using the instance of http server
const wsServer = new webSocketServer({
    httpServer: server
});

// stores all connected clients
const clients = {};

// generates new UserID
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random() ) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4();
}

// defines what happens once server receives request
wsServer.on('request', function (request) {
    const userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // you can rewrite this part of the code to accept only the requests from allowed origin
    // accept request => creates new connection
    const connection = request.accept(null, request.origin)
    // store connection in clients object => key is userID
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    // gets triggered when server receives message => loops over keys in clients object
    connection.on('message', function(message) {
        if(message.type === 'utf8') {
            console.log('Received Message: ', message.utf8Data);

            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
                
            }
            
        }
    })
    
});