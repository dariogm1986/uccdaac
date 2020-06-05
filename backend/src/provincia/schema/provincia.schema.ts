import {Schema} from 'mongoose';

export const ProvinciaSchema = new Schema({
    nome:{type:String, required:true, unique: [true, "A nome deve ser única"]},
    municipio:[{nomem: String},],
    created_at:{ type: Date},
    updated_at:{ type: Date}
});