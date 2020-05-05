import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

import {axiosInstance} from '../../../../common/ApiService';

import CustomizedSnackbars from '../../../../components/CustomizedSnackbars';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [senha, setSenha] = useState('')
  const [confirm, setConfirm] = useState('')
  
  const [erroSenha, setErroSenha] = useState(false)
  const [erroSenhaDesc, setErroSenhaDesc] = useState('')
  
  const [erroConfSenha, setErroConfSenha] = useState(true)
  const [erroSenhaConfDesc, setErroSenhaConfDesc] = useState('As senhas devem ser iguais')

  const [alertaAbrir, setAlerta] = useState(false)
  const [alertaMensagem, setAlertaMensagem] = useState('')
  const [alertaTipo, setAlertaTipo] = useState('success')

  const handleClose = () => {
    setAlertaMensagem('');
    setAlerta(false);
  };

  const clickButton = () => {
    console.log(erroSenha,erroConfSenha)

    if ( erroSenha || erroConfSenha ){
      return
    }

    const novasenha = {
      email: '',
      senha: senha
    }

    console.log(novasenha)

    axiosInstance.post("/api/usuario/v1/novasenha",novasenha)
    .then( response => {
      setAlerta(true)
      setAlertaMensagem("Senha atualizada com sucesso!")
      setAlertaTipo("success")
      setConfirm('');
      setSenha('');
    })
    .catch( error => {
      setAlerta(true)
      setAlertaMensagem("Falha ao atualizar a senha!")
      setAlertaTipo("error")

    });
  }

  const handleChangeSenha = event => {
    event.persist();

    const valor = event.target.value;

    setSenha(valor)
    
    setErroSenha(false)

    if (!valor) {
      setErroSenha(true)
      setErroSenhaDesc("Deve ser informado uma senha");
    }
    // After null checking, check length
    else if (valor.length < 8) {
      setErroSenha(true)
      setErroSenhaDesc("A senha deve possuir no minimo 8 caracteres");
    }
    // Check for capital letters
    else if (!/([A-Z]+)/g.test(valor)) {
      setErroSenha(true)
      setErroSenhaDesc("A senha deve conter pelo menos uma letra maiúscula")
    }
    else if (!/([a-z]+)/g.test(valor)) {
      setErroSenha(true)
      setErroSenhaDesc("A senha deve conter pelo menos uma letra minúscula")
    }
    else if (!/([0-9]+)/g.test(valor)) {
      setErroSenha(true)
      setErroSenhaDesc("A senha deve conter pelo menos um número")
    }


    

  };

  const handleChangeConfirm = event => {
    event.persist();

    const valor = event.target.value;

    console.log(valor)
    setConfirm(valor)
    
    console.log(senha,confirm);
    setErroConfSenha(false)

    if (senha !== valor){
      setErroConfSenha(true)
      setErroSenhaConfDesc("As senhas devem ser iguais")
    }else{
      setErroConfSenha(false)
      setErroSenhaConfDesc(null)
    }

  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Atualizar Senha"
          title="Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            className={classes.textField}
            fullWidth
            label="Senha"
            name="senha"
            error={erroSenha}
            helperText={
              erroSenha ? erroSenhaDesc : null
            }
            onChange={handleChangeSenha}
            type="password"
            value={senha || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Confirme a senha"
            name="confirm"
            error={erroConfSenha}
            helperText={
              erroConfSenha ? erroSenhaConfDesc : null
            }
            onChange={handleChangeConfirm}
            type="password"
            value={confirm || ''}
            variant="outlined"
            style={{ marginTop: '1rem' }}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickButton}
          >
            Atualizar Senha
          </Button>
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

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
