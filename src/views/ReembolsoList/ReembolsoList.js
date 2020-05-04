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

const ReembelsoList = () => {
  const classes = useStyles();



  const coletareembolsos = () => {

    axiosInstance.get('/api/despesas/v1')
    .then( response => {
        console.log( response.data);
      })
    .catch( error => {
        console.log("falha ao retornar as despesas")
        console.log(error)
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


      });
  
    }

  coletareembolsos(); 
  //const [uses] = useState(mockData);
  const [reembolsos] = useState([]);


  return (
    <div className={classes.root}>
      <ReembolsoToolbar />
      <div className={classes.content}>
        <ReembolsoTable clickButtonCell={clickButtonCell} reembolsos={reembolsos} />
      </div>
    </div>
  );
};

export default ReembelsoList;
