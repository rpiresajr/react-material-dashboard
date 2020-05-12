import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {axiosInstance} from '../../common/ApiService';

import {
  Budget,
  DespesasAbertas,
  ClientesCadastrados,
  TotalPago,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders, 
  Bullet
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const Dashboard = () => {
  const classes = useStyles();

  const [bullets,setBullets] = useState({
    qtd: 0,
    qtdcli: 0,
    valor: 0,
    valorpago:0
  });
  
  const getDespesasInfo = () => {
  
    axiosInstance.get('/api/despesas/v1/info')
      .then( response => {
          //console.log("aqui")
          //console.log( response.data);
          const lista = response.data;

          setBullets({
            ...lista
          });
          
        })
      .catch( error => {
        console.log(error)
        console.log("falha ao retornar as despesas")
        /*
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("1")
          console.log(error.response.data)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("2");
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("3")
          console.log("Error", error.message)
        }
        console.log("4")
        console.log(error.config)
        */

      });
  }

  useEffect(() => {
    getDespesasInfo()
  },[])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget 
            valor={bullets.valor}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <DespesasAbertas 
            qtd={bullets.qtd}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ClientesCadastrados 
            qtdcli={bullets.qtdcli}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalPago
            valorpago={bullets.valorpago}  
          />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
          {localStorage.getItem("token")}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
