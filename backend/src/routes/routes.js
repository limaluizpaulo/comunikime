const express = require('express');
const routes = express.Router();
const Usuario = require('../controller/usuarioController');
const Produto = require('../controller/produtosController');
const Fornecedor = require('../controller/vendasController');

//Usuarios
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/checktoken',Usuario.checkToken);
routes.get('/api/usuarios/destroytoken',Usuario.destroyToken);
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios', Usuario.listarTodos);
routes.get('/api/usuarios/detalhes/:_id', Usuario.details);
routes.put('/api/usuarios', Usuario.update);
routes.delete('/api/usuarios/:_id', Usuario.delete);

//Vendas
routes.post('/api/vendas',Fornecedor.create);
routes.get('/api/vendas', Fornecedor.listarTodos);
routes.get('/api/vendas/detalhes/:_id', Fornecedor.details);
routes.put('/api/vendas', Fornecedor.update);
routes.delete('/api/vendas/:_id', Fornecedor.delete);

//Produtos
routes.post('/api/produtos',Produto.create);
routes.get('/api/produtos', Produto.listarTodos);
routes.get('/api/produtos/detalhes/:_id', Produto.details);
routes.put('/api/produtos', Produto.update);
routes.delete('/api/produtos/:_id', Produto.delete);


module.exports = routes;