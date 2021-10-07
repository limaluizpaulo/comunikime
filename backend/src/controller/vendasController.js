const Vendas = require('../model/vendasModel');

module.exports = {
    async listarTodos(req,res){
        const sale = await Vendas.find();
        res.json(sale);
    },
    async create(req,res){
        const {_id, produto, qtd} = req.body;
        let data = {};
        let sale =  await Vendas.findOne({_id});
        
        if(!sale){
            data = {_id, produto, qtd};
            sale = await Vendas.create(data);
            return res.status(200).json(sale);
        }else{
            return res.status(500).json(sale);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const sale = await Vendas.findOne({_id});
        res.json(sale);
    },
    async delete(req,res){
        const { _id } = req.params;
        const sale = await Vendas.findByIdAndDelete({_id});
        return res.json(sale);
    },
    async update(req,res){
        const { _id, produto, qtd} = req.body;
        const data = {produto, qtd};
        const sale = await Vendas.findByIdAndUpdate({_id},data,{new:true});
        res.json(sale);
    }
   
}
 