import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ReembolsoToolbar, ReembolsoTable } from './components';
import mockData from '../Mocks/dataReembolso';

import axios from 'axios';
import baseURL from '../../common/ApiService'

const token = localStorage.getItem("token");

const coletareembolsos = () => {
  axios.get( `${baseURL}/login`,
                headers: {'Autorization': token} 
    ).then( function(response) {
      return response.data;
    }).catch( error => {
      history.push("/login")
    });

  }

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const clickbuttoncell = (id) => {
  console.log(`"Item a ser alterado:"${id}`);
}

const ReembelsoList = () => {
  const classes = useStyles();

  //const [uses] = useState(mockData);
  const [reembolsos] = useState(mockData);

  return (
    <div className={classes.root}>
      <ReembolsoToolbar />
      <div className={classes.content}>
        <ReembolsoTable clickButtonCell={clickbuttoncell} reembolsos={reembolsos} />
      </div>
    </div>
  );
};

export default ReembelsoList;
