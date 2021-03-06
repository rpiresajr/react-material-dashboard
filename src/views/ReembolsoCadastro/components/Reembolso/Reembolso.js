
import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {axiosInstance} from '../../../../common/ApiService'
import CustomizedSnackbars from '../../../../components/CustomizedSnackbars';


import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
  }));



const Reembolso = props => {
    const { className, setEnableCustos, ...rest } = props;

    const classes = useStyles();


    const [statusDespesa,setStatusDespesa] = useState([
        {
            cdstatus: 0,
            dsstatus: "ABERTO"
        },
        {
            cdstatus: 1,
            dsstatus: "EM ANALISE"
        },
        {
            cdstatus: 2,
            dsstatus: "APROVADO"
        },
        {
            cdstatus: 3,
            dsstatus: "REPROVADO"
        },
        {
            cdstatus: 4,
            dsstatus: "PAGO"
        }
    ]);


    const [motivoDespesa,setMotivoDespesa] = useState([
        {
            cdtipomotivo: 0,
            dstipomotivo: "VISITA"
        },
        {
            cdtipomotivo: 1,
            dstipomotivo: "VIAGEM"
        },
        {
            cdtipomotivo: 2,
            dstipomotivo: "PROJETO"
        },
        {
            cdtipomotivo: 3,
            dstipomotivo: "REUNIAO"
        },
        {
            cdtipomotivo: 4,
            dstipomotivo: "TREINAMENTO"
        }
    ]);

    const [reembolso, setReembolso] = useState({
        tipomotivo: {
            cdtipomotivo: 0
        },
        dsdespesa: null,
        dsobservacao: null,
        dtcriacao: null,
        dtatualizacao: null,
        status: {
            cdstatus: 0
        },
        dscontacontabil: null,
        ccusto: null
    }); 

    const [alertaAbrir, setAlerta] = useState(false)
    const [alertaMensagem, setAlertaMensagem] = useState('')
    const [alertaTipo, setAlertaTipo] = useState('success')
    const handleClose = () => {
      setAlertaMensagem('');
      setAlerta(false);
    };

    const handleChange = event => {
        
          if (event.target.name === "status"){
            const st = {
                status: {
                    cdstatus: event.target.value
                }
            }
            setReembolso({
                ...reembolso,
                ...st
            })
          }else if (event.target.name === "tipomotivo"){
                const tm = {
                    tipomotivo: {
                        cdtipomotivo: event.target.value
                    }
                }
                setReembolso({
                    ...reembolso,
                    ...tm
                })
        }else{
            setReembolso({
                ...reembolso,
                [event.target.name]: event.target.value
              })
          }

      };

    const getDespesa = (id) => {
        console.log("Buscando a despesa",id)
        axiosInstance.get(`/api/despesas/v1/${id}`)
        .then(response => {
            ///console.log("Despesa retornada",response.data)
            const rbs = response.data;
            criaCusto();
            setReembolso({
                ...rbs
            });
        })
        .catch(error => {
            console.log("erro ao buscar a despesa")
        })
    
    } 

    /*
    const getStatusDespesa = () =>{
        axiosInstance.get('/api/statusdespesa/v1')
        .then(response => {
            setStatusDespesa(response.data);
            if (props.despesa){
                getDespesa(props.despesa)
            }
        })
        .catch(error => {
            console.log("erro ao buscar o status despesa")
        })
    }

    
    const getMotivoDespesa = () =>{
        axiosInstance.get('/api/tipomotivo/v1')
        .then(response => {
            setMotivoDespesa(response.data);
            if (props.despesa){
                getStatusDespesa();
            }
        })
        .catch(error => {
            console.log("erro ao buscar o motivo despesa")
        })
    }
    */

    const criaCusto = () => {
        props.setEnableCustos("S")
    }

    useEffect(()=>{
        if (props.despesa){
            getDespesa(props.despesa);
        }
    },[])

    return (
        <Card
        {...rest}
        className={clsx(classes.root, className)}
        
        >
        <form
            autoComplete="off"
            noValidate
        >
            <CardHeader
            subheader="Todos os campos com (*) são obrigatórios"
            title={(props.despesa ? "Atualizar Despesa" : "Nova Despesa")}
            />
            <Divider />
            <CardContent>
                <Grid
                container
                spacing={2}
            >
                <Grid
                item
                md={12}
                lg={6}
                xs={12}
                >
                <TextField
                    fullWidth
                    label="Despesa"
                    margin="dense"
                    name="dsdespesa"
                    onChange={handleChange}
                    required
                    value={reembolso.dsdespesa || ''}
                    variant="outlined"
                />
               
                <TextField
                    fullWidth
                    label="Observações"
                    margin="dense"
                    name="dsobservacao"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    value={reembolso.dsobservacao || ''}
                    variant="outlined"
                />

                <TextField
                    fullWidth
                    label="Conta Contábil"
                    margin="dense"
                    name="dscontacontabil"
                    onChange={handleChange}
                    value={reembolso.dscontacontabil || ''}
                    variant="outlined"
                />

                <TextField
                    fullWidth
                    label="Centro de Custo"
                    margin="dense"
                    name="cccusto"
                    onChange={handleChange}
                    value={reembolso.cccusto || ''}
                    variant="outlined"
                />

                </Grid>

                <Grid
                    item
                    md={12}
                    lg={6}
                    xs={12}
                >
                    { (props.despesa) ? (
                    <div>
                    <TextField
                        fullWidth
                        label="Data de Criação"
                        margin="dense"
                        name="dtcriacao"
                        readonly={true} 
                        value={reembolso.dtcriacao || ''}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Data de Atualização"
                        margin="dense"
                        name="dtatualizacao"
                        readonly={true} 
                        value={reembolso.dtatualizacao || ''}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Selecione Status"
                        margin="dense"
                        name="status"
                        onChange={handleChange}
                        required
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={reembolso.status.cdstatus || ''}
                        variant="outlined"
                    >
                        {statusDespesa.map(option => (
                        <option
                            key={option.cdstatus}
                            value={option.cdstatus}
                        >
                           {option.dsstatus}
                        </option>
                        ))}
                    </TextField>
                    </div>
                    ) : "" }


                    <TextField
                        fullWidth
                        label="Selecione Motivo"
                        margin="dense"
                        name="tipomotivo"
                        onChange={handleChange}
                        required
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={reembolso.tipomotivo.cdtipomotivo || ''}
                        variant="outlined"
                    >
                        {motivoDespesa.map(option => (
                        <option
                            key={option.cdtipomotivo}
                            value={option.cdtipomotivo}
                        >
                            {option.dstipomotivo}
                        </option>
                        ))}
                    </TextField>

                </Grid>

                
            </Grid>
            </CardContent>
            <Divider />
            <CardActions
             
             >
            { (props.despesa) ? (
                    <Grid
                    container
                    
                    spacing={4}
                    >
                        <Grid 
                            item
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                
                            >
                                Atualizar
                            </Button>
                        </Grid><Grid item>
                            <Button
                                color="default"
                                variant="contained"
                                
                            >
                                Exluir
                            </Button>
                        </Grid>
                    </Grid> ) : (
                        <Button
                        color="primary"
                        variant="contained"
                        onClick={criaCusto}
                    >
                        Criar
                    </Button>
                )}
            </CardActions>
        </form>
        <CustomizedSnackbars  autoHideDuration={6000} 
                                        open={alertaAbrir} 
                                        handleClose={handleClose} 
                                        severity={alertaTipo} 
                                        mensagem={alertaMensagem}/>
        </Card>
    );
    };

Reembolso.propTypes = {
    className: PropTypes.string,
    setEnableCustos: PropTypes.func
  };
  
export default Reembolso;
  

