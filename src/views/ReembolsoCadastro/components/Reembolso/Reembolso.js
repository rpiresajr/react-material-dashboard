
import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {axiosInstance} from '../../../../common/ApiService'



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
    const { className, cddespesa,cadastroDespesa, AtualizaDespesa, ...rest } = props;

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
        despesaEmbeddable:{
            cddespesa: 0
        },
        tipomotivo: {
            cdtipomotivo: 0
        },
        dsdespesa: null,
        dsobservacao: null,
        dtcriacao: '',
        dtatualizacao: '',
        status: {
            cdstatus: 0
        },
        cliente: {
            cdcliente: null,
        },
        dscontacontabil: null,
        ccusto: null
    }); 

    const [despesaRO,setDespesaRO] = useState(false);

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

        setDespesaRO(true)
            
        axiosInstance.get(`/api/despesas/v1/${id}`)
        .then(response => {
            console.log("Despesa retornada",response.data)
            const rbs = response.data;
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
        //props.setEnableCustos("S")
    }

    //const AtualizaDespesa  = props.AtualizaDespesa ;
    
    // const AtualizaDespesa = props.AtualizaDespesa(id) {
    //     getDespesa(id);
    // }

    useEffect(()=>{
        console.log("despesa para pesquiar",props.cddespesa)
        if (props.cddespesa){
            getDespesa(props.cddespesa);
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
            title={(props.cddespesa ? "Atualizar Despesa" : "Nova Despesa")}
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
                    onChange={(!despesaRO) ? handleChange : e => {}}
                    required
                    readOnly={despesaRO}
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
                    name="ccusto"
                    onChange={handleChange}
                    value={reembolso.ccusto || ''}
                    variant="outlined"
                />

                </Grid>

                <Grid
                    item
                    md={12}
                    lg={6}
                    xs={12}
                >
                    { (props.cddespesa) ? (
                    <div>
                    <TextField
                        fullWidth
                        label="Data de Criação"
                        margin="dense"
                        name="dtcriacao"
                        readOnly={true} 
                        value={reembolso.dtcriacao || ''}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Data de Atualização"
                        margin="dense"
                        name="dtatualizacao"
                        readOnly={true} 
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
            { (props.cddespesa) ? (
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
                        onClick={e=>cadastroDespesa(reembolso)}
                        
                    >
                        Criar
                    </Button>
                )}
            </CardActions>
        </form>
        </Card>
    );
    };

Reembolso.propTypes = {
    className: PropTypes.string,
    cadastroDespesa: PropTypes.func,
    AtualizaDespesa: PropTypes.func,
    cddespesa: PropTypes.number
  };
  
export default Reembolso;
  

