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


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  InputAdornment,
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

const CustoCell = props => {
  const { className,  ...rest } = props;


  const [custo,setCustos] = useState({
    custoEmbeddable:{
        despesaEmbeddable: {
            cddespesa: 0
        },
        cdcusto: null
    },
    tipocusto: {
        cdccusto: null,
        dsccusto: ''
    },
    ft_custo: null,
    dtcusto: '',
    dsobs: ''
    });

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

  const [saveDados, setSaveDados] = useState(false);

  const handleChange = event => {

    //console.log(event.target.name, event.target.value);
    setSaveDados(true)
    if ( event.target.name === "tipocusto"){
        const tc = {
            tipocusto: {
                cdccusto: event.target.value
            }
        }
        //console.log("tc",tc);
        setCustos({
            ...custo,
            ...tc
        })        
        //console.log("listaCustos",custo);
    }else{
        setCustos({
            ...custo,
            [event.target.name]: event.target.value
        })
    }
    
    };

    const getImagemCusto = (d,c)=>{
        console.log("getImagemCusto ",d,c)
    }

  useEffect(()=>{
    
    if ( props.custo ){
        setCustos(props.custo)
    }
  },[])

  return (

        <TableRow
        className={classes.tableRow}
        hover
        key={custo.custoEmbeddable.cdcusto}
        >
            
            <TableCell>
                <TextField
                    fullWidth
                    label="Selecione Tipo de Custo"
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
            
            <TableCell>
                <TextField
                        fullWidth
                        label="Observações"
                        margin="dense"
                        name="dsobs"
                        multiline
                        rows={2}
                        onChange={handleChange}
                        value={custo.dsobs || ''}
                        variant="outlined"
                    />
            </TableCell>
            <TableCell>
                <div>
                    <TextField
                    fullWidth
                    label="Valor em R$"
                    margin="dense"
                    alignItems="rigth"
                    name="ft_custo"
                    onChange={handleChange}
                    value={custo.ft_custo || ''}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"
                          onClick={e => getImagemCusto(custo.custoEmbeddable.despesaEmbeddable.cddespesa,custo.custoEmbeddable.cdcusto)}
                          >
                            <PhotoCamera />
                          </InputAdornment>
                        ),
                      }}
                    />
                </div>
            </TableCell>
            <TableCell>
                
            
                 { (saveDados) ? (
                       <IconButton color="secondary" >
                            <SaveAltIcon />
                       </IconButton>
                    ): "" } 

                <IconButton color="secondary">
                <DeleteIcon />
                </IconButton>

                
            </TableCell>

        </TableRow>
  );
};

CustoCell.propTypes = {
  className: PropTypes.string
};

export default CustoCell;
