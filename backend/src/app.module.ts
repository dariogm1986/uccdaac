import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadeModule } from './unidade/unidade.module';
import { CursoModule } from './curso/curso.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { MunicipioModule } from './municipio/municipio.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/uccdaac',{useCreateIndex: true,useNewUrlParser: true}),UnidadeModule, CursoModule, AuthModule, UsersModule, ProvinciaModule, MunicipioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
