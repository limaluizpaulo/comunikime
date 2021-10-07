import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',

  }
}));

export default function CadastrarVendas() {
  const classes = useStyles();
  const [qtd, setQtd] = useState('');
  const [produto, setProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [filtered, setFiltered] = useState();
  useEffect(() => {
    async function loadProdutos() {
      const response = await Axios.get('http://localhost:5000/api/produtos');
      setProdutos(response.data);
    }
    loadProdutos();

  }, []);

  useEffect(() => {
    function checkEstoque() {
      setFiltered(produtos.find((e) => e.nome_produto === produto))
      if (filtered) {
        if (filtered.qtde_produto < qtd) {
          alert(`Nosso estoque atual para o produto ${filtered.nome_produto} é ${filtered.qtde_produto}`);
        }

        if (filtered.qtde_produto < 1) {
          alert(`O Produto ${filtered.nome_produto} é está indisponivel`);
        }
      }
    }
    checkEstoque()

  }, [qtd, produto]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data =
    {
      produto: produto,
      qtd: qtd,

    };

    if (produto !== '' && qtd !== '') {
      const response = await Axios.post('http://localhost:5000/api/vendas', data);

      if (response.status === 200) {
        window.location.href = '/admin/vendas'
      } else {
        alert('Erro ao cadastrar o Venda!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }


    const update =
    {
      nome_produto: filtered.nome_produto,
      descricao_produto: filtered.descricao_produto,
      preco_produto: filtered.preco_produto,
      qtde_produto: filtered.qtde_produto - qtd,
      _id: filtered._id,
    };

    if (filtered.nome_produto !== '') {
      const response = await Axios.put('http://localhost:5000/api/produtos', update);

      if (response.status === 200) {
        window.location.href = '/admin/produtos'
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'VENDAS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Vendas</h2>
                <Grid container spacing={3}>

                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelProduto">Produto</InputLabel>
                      <Select
                        labelId="labelProduto"
                        id="produtos"
                        value={produto}
                        onChange={e => setProduto(e.target.value)}
                      >
                        {produtos.map((row) => (
                          <MenuItem value={row.nome_produto} key={row._id}>{row.nome_produto}</MenuItem>
                        ))
                        }

                      </Select>
                    </FormControl>
                  </Grid>


                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="text"
                      required
                      id="qtd"
                      name="qtd"
                      label="Quantidade"
                      fullWidth
                      autoComplete="qtd"
                      value={qtd}
                      onChange={e => setQtd(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

