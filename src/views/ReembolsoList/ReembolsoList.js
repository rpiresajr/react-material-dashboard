import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ReembolsoToolbar, ReembolsoTable } from './components';
//import mockData from '../Mocks/dataReembolso';

import {axiosInstance} from '../../common/ApiService'

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

const ReembolsoList = () => {
  const classes = useStyles();

  const [listaDespesas, setDespesas] = useState([]);

  
  const listarDespesas = () => {
    axiosInstance.get('/api/despesas/v1')
    .then( response => {
        //console.log( response.data);
        const lista = response.data;
        setDespesas(lista);
      })
    .catch( error => {
        console.log("falha ao retornar as despesas")
        console.log(error)
        
    });
  }

  useEffect(() =>{
    listarDespesas();
  },[]);

  return (
    <div className={classes.root}>
      <ReembolsoToolbar />
      <div className={classes.content}>
        <ReembolsoTable 
            clickButtonCell={clickButtonCell} 
            reembolsos={listaDespesas}
            title="TODAS" />
      </div>
    </div>
  );
};

export default ReembolsoList;
