const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    produto:String,
    qtd: String,  
},{
    timestamps:true
});

const vendas = mongoose.model('Vendas',DataSchema);
module.exports = vendas;