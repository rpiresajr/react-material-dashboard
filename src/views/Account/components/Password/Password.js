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
  const [erroSenhaDesc, setErroSenhaDesc] = useState(false)
  
  const [erroConfSenha, setErroConfSenha] = useState(false)
  const [erroSenhaConfDesc, setErroSenhaConfDesc] = useState(false)

  

  const clickButton = () => {
    console.log(senha,confirm)
    
  }

  const handleChangeSenha = event => {
    setSenha(event.value)
    
    console.log(senha,confirm);

    if (senha) {
      setErroSenhaDesc("Deve ser informado uma senha");
    }
    // After null checking, check length
    else if (senha.length < 8) {
      setErroSenhaDesc("A senha deve possuir no minimo 8 caracteres");
    }
    // Check for capital letters
    else if (/([A-Z]+)/g.test(senha)) {
      setErroSenhaDesc("A senha deve conter pelo menos uma letra maiúscula")
    }
    if ( !erroSenhaDesc ){
      setErroSenha(true)
    }

    

  };

  const handleChangeConfirm = event => {
    setConfirm(event.value)
    
    console.log(senha,confirm);

    if (senha !== confirm){
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
            fullWidth
            label="Senha"
            name="senha"
            error={erroSenha}
            helperText={
              erroSenha ? erroSenhaDesc : null
            }
            onChange={handleChangeSenha}
            type="password"
            value={senha}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirme a senha"
            error={erroConfSenha}
            helperText={
              erroConfSenha ? erroSenhaConfDesc : null
            }
            name="confirm"
            onChange={handleChangeConfirm}
            style={{ marginTop: '1rem' }}
            type="password"
            value={confirm}
            variant="outlined"
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
      <CustomizedSnackbars 

      />
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
