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

  const [listaTipoCusto,setListaTipoCusto] = useState([
    {
        cdccusto: 1,
        dsccusto: "ALIMENTACAO"
    },
    {
        cdccusto: 2,
        dsccusto: "COMBUSTIVEL"
    },
    {
        cdccusto: 3,
        dsccusto: "PEDAGIO"
    },
    {
        cdccusto: 4,
        dsccusto: "ALMOCO"
    },
    {
        cdccusto: 5,
        dsccusto: "JANTAR"
    },
    {
        cdccusto: 6,
        dsccusto: "CAFE DA MANHA"
    },
    {
        cdccusto: 7,
        dsccusto: "HOTEL"
    },
    {
        cdccusto: 8,
        dsccusto: "SAUDE"
    },
    {
        cdccusto: 9,
        dsccusto: "KILOMETRAGEM"
    },
    {
        cdccusto: 10,
        dsccusto: "TRANSPORTE"
    },
    {
        cdccusto: 11,
        dsccusto: "ELETRONICOS"
    },
    {
        cdccusto: 12,
        dsccusto: "UTENSILIOS"
    },
    {
        cdccusto: 13,
        dsccusto: "COMUNICACAO"
    }
]);

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

  const handleChange = event => {

    console.log(event.target.name, event.target.value);
    if ( event.target.name === "tipocusto"){
        const tc = {
            tipocusto: {
                cdccusto: event.target.value
            }
        }
        setCustos({
            ...listaCustos,
            ...tc
        })        
    }else{
        setCustos({
            ...listaCustos,

        })
    }
    
    };

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
                    <TableRow
                    className={classes.tableRow}
                    hover
                    key={custo.custoEmbeddable.cdcusto}
                    >
                      
                      <TableCell>
                            <TextField
                                fullWidth
                                label="Selecione Status"
                                margin="dense"
                                name="tipocusto"
                                onChange={handleChange}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={custo.tipocusto.cdccusto || ''}
                                variant="outlined"
                            >
                                {listaTipoCusto.sort((a, b) => a.dsccusto > b.dsccusto).map(option => (
                                <option
                                    key={option.cdccusto}
                                    value={option.cdccusto}
                                >
                                {option.dsccusto}
                                </option>
                                ))}
                            </TextField>

                        
                     </TableCell>
                      <TableCell>
                        {custo.dtcusto.substr(0,10)}
 
                      </TableCell>
                      
                      <TableCell>{custo.dsobs}</TableCell>
                      <TableCell>{custo.ft_custo}</TableCell>
                      <TableCell>
                          <IconButton color="secondary" 
                                  //onClick={e => props.clickButtonCell(reembolso.cddespesa)} 
                                  //component={RouterLink}
                                  //to={`/despesa/${reembolso.cddespesa}`}
                                  >
                            <PhotoCamera />
                          </IconButton>
                      
                          <IconButton color="primary">
                            <SaveAltIcon />
                          </IconButton>

                          <IconButton color="secondary">
                            <DeleteIcon />
                          </IconButton>

                          
                      </TableCell>

                    </TableRow>
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
