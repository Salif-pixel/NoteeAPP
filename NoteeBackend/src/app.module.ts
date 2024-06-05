import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './Socket/SocketModule';
import { AppGateway } from './app.gatway';
import { NoteModule } from './note/note.module';
import { CategorieModule } from './categorie/categorie.module';
import {AppController} from "./app.controller";

@Module({
  imports: [UserModule,SocketModule, AuthModule,SocketModule,ConfigModule.forRoot({
    isGlobal: true,
  }), NoteModule, CategorieModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
