import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ReembolsoToolbar, ReembolsoTable } from './components';
//import mockData from '../Mocks/dataReembolso';

import {axiosInstance} from '../../common/ApiService'
import Routes from '../../Routes' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const clickButtonCell = (id) => {
  console.log(`"Item a ser alterado:"${id}`);
}

const ReembelsoList = () => {
  const classes = useStyles();

  const [reembolsos, setReembolsos] = useState([]);

  const listarReembolsos = () => {

    console.log("Buscando os reembolsos")
    axiosInstance.get('/api/despesas/v1')
    .then( response => {
        console.log("aqui")
        console.log( response.data);
        const reembolsos = response.data;
        setReembolsos(reembolsos);
      })
    .catch( error => {
        console.log("falha ao retornar as despesas")
        console.log(error)
        
      });
  
  }

  return (
    <div className={classes.root}>
      <ReembolsoToolbar />
      <div className={classes.content}>
        <ReembolsoTable 
            clickButtonCell={clickButtonCell} 
            reembolsos={reembolsos} />
      </div>
    </div>
  );
};

export default ReembelsoList;
