import { Module } from '@nestjs/common';
import { MunicipioController } from './municipio.controller';
import { MunicipioService } from './municipio.service';

import { MunicipioSchema } from './schemas/municipio.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Municipio',schema:MunicipioSchema}
  ])],
  controllers: [MunicipioController],
  providers: [MunicipioService]
})
export class MunicipioModule {}
