# solo-weekend-spike

In this weekend spike I used my time to research the ability to have a real-time chat application within my app. This brought me to research WebSocket and it's method to maintain an open connection between the client and server. In researching this protocol, I learned more about how traditional HTTP protocol communication works: namely that the server relies entirely on the client. The client must make a request in order for the server to give a response. Typically this happens in a 1-1 relationship that only goes one way; one client request leads to a single server response. And although there are ways around this unidirectional relationship within the HTTP Protocol (i.e. HTTP Polling, HTTP Streaming, Server-sent events), the benefit of WebSockets occurs when real-time passage of data is required. For apps that require live chats, real-time updates of trades, sports scores, etc. an immediate and constant request/response flow needs to be established. 

WebSockets initially establishes a handshake request between the server and client. This creates the realtime communication channel in which both the server and client are free to send messages to each other. As long as this connection is maintained both the server and client will be able to do this. The WebSockets server keeps tabs of all the clients connected to it and broadcasts a message sent to the server from any client back to all of the clients. Thus, realtime communication between multiple clients has been established.

I utilized this blog post/video as my primary source for this weekend-spike: https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

The code in this was produced by me coding along with the video.
