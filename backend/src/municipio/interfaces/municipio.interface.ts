import {Document} from 'mongoose';

export interface Municipio extends Document {
    nome_municipio:string;
    nome_provincia:string;
    created_at:Date;
    updated_at:Date;    
}