import {Document} from 'mongoose';

export interface Provincia extends Document {
    nome:string;
    municipio:[{nomem: string},];
    created_at:Date;
    updated_at:Date;    
}