import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Municipio } from './interfaces/municipio.interface';
import { CreateMunicipioDTO } from './dto/municipio.dto';

@Injectable()
export class MunicipioService {

    constructor(@InjectModel('Municipio')private municipioModel:Model<Municipio>){}

    async getMunicipios():Promise <Municipio[]>{
        const municipios = await this.municipioModel.find();        
        return municipios;
    }

    async getMunicipio(municipioId:string):Promise<Municipio>{
        const municipio = await this.municipioModel.findById(municipioId);        
        return municipio;
    }

    async createMunicipio(createmunicipioDTO:CreateMunicipioDTO):Promise<Municipio>{
        const municipio = new this.municipioModel(createmunicipioDTO);
        return await municipio.save();
    }

    async updateMunicipio(municipioID:string,createmunicipioDTO:CreateMunicipioDTO):Promise<Municipio>{
        const updatedMunicipio = this.municipioModel.findByIdAndUpdate(municipioID,createmunicipioDTO,{new:true});
        return updatedMunicipio;        
    }

    async deleteMunicipio(municipioID:string):Promise<Municipio>{
        const municipio = await this.municipioModel.findByIdAndDelete(municipioID);
        return municipio;        
    }

}
