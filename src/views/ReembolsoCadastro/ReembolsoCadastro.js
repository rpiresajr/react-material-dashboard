import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,
          Typography
} from '@material-ui/core';


import { Reembolso, Custo } from './components'
import { axiosInstance } from '../../common/ApiService'

import CustomizedSnackbars from '../../components/CustomizedSnackbars';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const ReembolsoCadastro = props => {
  const { className, reembolsos, ...rest } = props;

  const [cadCusto, setEnableCustos] = useState(null);
  const [cddespesa, setDespesa] = useState(parseInt(props.match.params[0]));

  
  const classes = useStyles();

  const [alertaAbrir, setAlerta] = useState(false)
  const [alertaMensagem, setAlertaMensagem] = useState('')
  const [alertaTipo, setAlertaTipo] = useState('success')
  const handleClose = () => {
    setAlertaMensagem('');
    setAlerta(false);
  };


  const cadastroDespesa = (despesavo) => {
    console.log(despesavo)
  

    const payload = {
      despesa: despesavo.despesaEmbeddable.cdespesa || '',
      descricao: despesavo.dsdespesa,
      observacao: despesavo.dsobservacao || '',
      tipo_motivo: despesavo.tipomotivo.cdtipomotivo,
      conta_contabil: despesavo.dscontacontabil|| '',
      cliente: despesavo.cliente.cdcliente|| '',
      status: despesavo.status.cdstatus|| '',
      centro_custo: despesavo.ccusto|| ''
    }
    console.log("payload",payload);
    axiosInstance.post('/api/despesas/v1',payload)
    .then(response => {
          console.log("despesa data",response.data); 
          const cddespesa = response.data.despesaEmbeddable.cddespesa;
          console.log("despesa",cddespesa);
          
          setEnableCustos("S");
          
          setAlerta(true)
          setAlertaTipo('success')
          setAlertaMensagem("Despesa cadastrada com sucesso")
          setDespesa(parseInt(cddespesa)); 
    })
    .catch(error=>{
        setAlerta(true)
        setAlertaTipo('error')


        const resp = error.response.data

        if (resp.error !== ""){
          setAlertaTipo('warning');
          setAlertaMensagem(resp.error);
        }else{
          setAlertaMensagem("Falha ao cadastrar a despesa")
        }
        console.log("Erro ao cadastrar a despesa")

        
    })
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <Reembolso 
                  cddespesa={cddespesa} 
                  cadastroDespesa={cadastroDespesa}
          />

        </Grid>
        
        { (cddespesa || cadCusto === "S") ? (
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        > 
          <Custo 
                  cddespesa={cddespesa}
          />
          
        </Grid>

        ) : "" }

        <CustomizedSnackbars  autoHideDuration={6000} 
                                        open={alertaAbrir} 
                                        handleClose={handleClose} 
                                        severity={alertaTipo} 
                                        mensagem={alertaMensagem}/>

      </Grid>
    </div>
  );
};

export default ReembolsoCadastro;
