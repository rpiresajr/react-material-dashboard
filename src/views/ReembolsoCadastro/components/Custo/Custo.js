import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import {
    TextField
} from '@material-ui/core'


import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import {axiosInstance} from '../../../../common/ApiService'
import CustoCell from './CustoCell'

import {
  Card,
  CardActions,
  Divider,
  CardHeader,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Custo = props => {
  const { className, despesa, ...rest } = props;



  const custoArray =  [{
    custoEmbeddable:{
        cdcusto: null
    },
    tipocusto: {
        cdccusto: null,
        dsccusto: ''
    },
    ft_custo: null,
    dtcusto: '',
    dsobs: ''
  }]

  const [listaCustos,setCustos] = useState([])

  

  const classes = useStyles();

  const getCustos = (despesa) => {
    console.log("buscando despesa",despesa)
    axiosInstance.get(`/api/custo/v1/${despesa}`)
    .then(response=>{
        console.log("OK",response.data)
        const lista = response.data
        setCustos(lista)
    })
    .catch(error=>{
        console.log("ERROR",error)
        console.log("ERROR",error.config)
    })

  }



  useEffect(()=>{
      if (props.despesa){
          getCustos(props.despesa)
      }
  },[])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            title="NOVO CUSTO"
          >
            NOVO CUSTO
          </Button>
        }
        title="CUSTOS"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Tipo</TableCell>
                  <TableCell>Dt Custo</TableCell>
                  <TableCell>Obs</TableCell>
                  <TableCell>Valor R$</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaCustos.map(custo => (
                    <CustoCell custo={custo} />
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      
    </Card>
  );
};

Custo.propTypes = {
  className: PropTypes.string,
  despesa: PropTypes.string.isRequired
};

export default Custo;
