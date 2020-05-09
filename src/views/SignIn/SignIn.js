import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import {baseURL} from '../../common/ApiService';

import LocalStorageService from "../../common/LocalStorageService";

import CustomizedSnackbars from '../../components/CustomizedSnackbars'

import axios from 'axios';


import { makeStyles } from '@material-ui/styles';



import {
  Grid,
  Button,
  TextField,
  Link,
  Typography
} from '@material-ui/core';




const schema = {
  email: {
    presence: { allowEmpty: false, message: 'é requirido' },
    email: true,
    length: {
      maximum: 64
    }
  },
  senha: {
    presence: { allowEmpty: false, message: 'é requirido' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const localStorageService = LocalStorageService.getService();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    //localStorage.setItem("token","");

    localStorageService.clearToken();
    localStorageService.clearAvatar();

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));

  };


  const [alertaAbrir, setAlerta] = useState(false)
  const [alertaMensagem, setAlertaMensagem] = useState('')
  const [alertaTipo, setAlertaTipo] = useState('success')
  const handleClose = () => {
    setAlertaMensagem('');
    setAlerta(false);
  };

  const handleSignIn = event => {
    event.preventDefault();


    console.log(formState.values);

    
    setFormState(formState => ({
      ...formState,
      isValid: false 
    }));
    

    //'Access-Control-Expose-Headers': 'X-Authorization'
    axios.post( `${baseURL}/login`,
                formState.values
    ).then( function(response) {
      setFormState(formState => ({
        ...formState,
        isValid: true 
      })); 
      //console.log(response);
      if (response.status >= 200){ 
        const token = response.data;
        localStorageService.setToken(token);
        //localStorage.setItem("token",token.trim())
        history.push("/dashboard")
      }else{
        setAlertaMensagem("Falha ao autenticar")
        setAlertaTipo("warning")
      }
      
    }).catch( error => {
      const err = (`"Erro --> "${error}`)
      setAlerta(true)
      if (err.includes("403") || err.includes("401")){
        setAlertaMensagem("Usuario/Senha invalidos")
        setAlertaTipo("warning")
        //console.log("Usuario/Senha invalidos");
      }else{
        setAlertaMensagem("Falha ao conectar com o servidor")
        setAlertaTipo("error")
        //console.log("Falha ao conectar com o servidor")
      }
      
      setFormState(formState => ({
        ...formState,
        isValid: true 
      }));
      /*
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
      */

    });
    

    //history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Sistema de controle de reembolso DTSBa Solutions.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  <a href="http://www.dtsba.com.br">DTSBa</a>
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Curitiba PR
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <br />
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Login
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('senha')}
                  fullWidth
                  helperText={
                    hasError('senha') ? formState.errors.senha[0] : null
                  }
                  label="Senha"
                  name="senha"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.senha || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Acessar
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Ainda não tem uma conta?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Cadastre-se
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>

      <CustomizedSnackbars  autoHideDuration={6000} 
                                      open={alertaAbrir} 
                                      handleClose={handleClose} 
                                      severity={alertaTipo} 
                                      mensagem={alertaMensagem}/>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
