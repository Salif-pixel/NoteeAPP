import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway,WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway( { cors:{origin: "*"} })

export class SocketService {
   public server:Server;
  }
