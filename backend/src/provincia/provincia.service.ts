import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Provincia } from './interfaces/provincia.interface';
import { CreateProvinciaDTO } from './dto/provincia.dto';

@Injectable()
export class ProvinciaService {

    constructor(@InjectModel('Provincia')private provinciaModel:Model<Provincia>){

    }

    async getProvincias():Promise <Provincia[]>{
        const provincias = await this.provinciaModel.find();        
        return provincias;
    }

    async getProvincia(provinciaId:string):Promise<Provincia>{
        const provincia = await this.provinciaModel.findById(provinciaId);        
        return provincia;
    }

    async createProvincia(createProvinciaDTO:CreateProvinciaDTO):Promise<Provincia>{
        const provincia = new this.provinciaModel(createProvinciaDTO);
        return await provincia.save();
    }

    async updateProvincia(provinciaID:string,createProvinciaDTO:CreateProvinciaDTO):Promise<Provincia>{
        const updatedProvincia = this.provinciaModel.findByIdAndUpdate(provinciaID,createProvinciaDTO,{new:true});
        return updatedProvincia;        
    }

    async deleteProvincia(provinciaID:string):Promise<Provincia>{
        const provincia = await this.provinciaModel.findByIdAndDelete(provinciaID);
        return provincia;        
    }

}
