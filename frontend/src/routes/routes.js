import React from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';

//importação das páginas ADM
import Dashboard from '../pages/admin/dashboard/dashboard';

import Vendas from '../pages/admin/vendas/vendas';
import cadastrarVendas from '../pages/admin/vendas/cadastrarVendas';

import Produtos from '../pages/admin/produtos/produtos';
import editarProduto from '../pages/admin/produtos/editarProdutos';
import cadastrarProduto from '../pages/admin/produtos/cadastrarProdutos';

import Usuarios from '../pages/admin/usuarios/usuarios';
import editarUsuario from '../pages/admin/usuarios/editarUsuarios';
import cadastrarUsuario from '../pages/admin/usuarios/cadastarUsuarios';
import Login from '../pages/admin/login/login';
import PrivateRoute from '../services/wAuth';


export default function Routes(){
    return (
        <BrowserRouter>
           <Switch>         

               <PrivateRoute path="/admin" exact component={Dashboard} />
               <Route path="/" exact component={Login} />

               <PrivateRoute path="/admin/produtos" exact component={Produtos} />
               <PrivateRoute path="/admin/produtos/cadastrar" exact component={cadastrarProduto} />
               <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={editarProduto} />

               <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />               
               <PrivateRoute path="/admin/usuarios/cadastrar" exact component={cadastrarUsuario} />
               <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={editarUsuario} />

               <PrivateRoute path="/admin/vendas" exact component={Vendas} />               
               <PrivateRoute path="/admin/vendas/cadastrar" exact component={cadastrarVendas} />
                                 
              
           </Switch>
        </BrowserRouter>
    )
}

