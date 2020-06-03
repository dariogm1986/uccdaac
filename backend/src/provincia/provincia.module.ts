import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ProvinciaSchema} from './schema/provincia.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Provincia',schema:ProvinciaSchema}
  ])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService]
})
export class ProvinciaModule {}
