import {Schema} from 'mongoose';

export const MunicipioSchema = new Schema({
    nome_municipio:{type:String, required:true, unique: [true, "A abreviatura deve ser única"]}, 
    nome_provincia:{type:String, required:true}, 
    created_at:{ type: Date},
    updated_at:{ type: Date}
});