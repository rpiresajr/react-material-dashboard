import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CustomizedSnackbars from '../../components/CustomizedSnackbars'
import {baseURL} from '../../common/ApiService';
import axios from 'axios';


const schema = {
  nome: {
    presence: { allowEmpty: false, message: 'é requirido' },
    length: {
      maximum: 32
    }
  },
  endereco: {
    presence: { allowEmpty: false, message: 'é requirido' },
    length: {
      maximum: 32
    }
  },
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
  },
  policy: {
    presence: { allowEmpty: false, message: 'é requirido' },
    checked: true
  },
  estado: {
    presence: { allowEmpty: false, message: 'é requirido' },
    length: {
      maximum: 128
    }
  },
  cidade: {
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
    color: theme.palette.black,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.black
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [alertaAbrir, setAlerta] = useState(false);
  const [alertaMensagem, setAlertaMensagem] = useState('');
  const [alertaTipo, setAlertaTipo] = useState('success');
  const handleClose = () => {
    setAlertaMensagem('');
    setAlerta(false);
  };


  useEffect(() => {
    const errors = validate(formState.values, schema);
    
    getEstados();

    //console.log(formState.values.estado)
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

  }, [formState.values]);

  const handleChange = event => {
    event.persist();


    //console.log( event.target.name,event.target.value)
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

    if (event.target.name === "estado"){
      getCidades(event.target.value)
    }

  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = event => {
    event.preventDefault();
    //history.push('/');

    axios.post( `${baseURL}/api/usuario/v1`,
        formState.values
    ).then( response => {

      //console.log(response);
      if (response.status < 300){ 
        setAlerta(true)
        setAlertaMensagem("Cadastro efetuado com sucesso")
        setAlertaTipo("success")
        history.push("/sign-in")
      }

      }).catch( error => {

        const errorData = error.response.data
        const err = (`"Erro --> "${error}`)
        setAlerta(true)
        
        if ( errorData ){
          setAlertaMensagem(`${errorData['error']}`)
          setAlertaTipo("warning")
        }else{
          setAlertaMensagem("Falha ao conectar com o servidor")
          setAlertaTipo("error")
        }


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

  };

  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const getEstados = () => {
    axios.get(`${baseURL}/api/estados/v1`)
    .then( response => {
      setStates(response.data)
    })
    .catch( error => {
      setAlerta(true)
      setAlertaMensagem("Falha ao retornar a lista de estados")
      setAlertaTipo("error")
      //console.log(error)
    });
  }

  const getCidades = (idEstado) => {
    setCities([]);
    axios.get(`${baseURL}/api/cidades/v1/${idEstado}`)
    .then( response => {
      setCities(response.data)
    })
    .catch( error => {
      //console.log(error.config);
      setAlerta(true)
      setAlertaMensagem("Falha ao retornar a lista de cidades")
      setAlertaTipo("error")
    });
  }

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
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Criar uma nova conta
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Use seu email para criar uma nova conta
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('nome')}
                  fullWidth
                  helperText={
                    hasError('nome') ? formState.errors.nome[0] : null
                  }
                  label="Nome"
                  name="nome"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.nome || ''}
                  variant="outlined"
                  required
                />
                <TextField
                  className={classes.textField}
                  error={hasError('endereco')}
                  fullWidth
                  helperText={
                    hasError('endereco') ? formState.errors.endereco[0] : null
                  }
                  label="Endereco"
                  name="endereco"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.endereco || ''}
                  variant="outlined"
                  required
                />
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
                  required
                />

              <TextField
                fullWidth
                label="Selecione o Estado"
                margin="dense"
                name="estado"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.estado || ''}
                variant="outlined"
              >
                <option value=""></option>
                {states.map(option => (
                  <option
                    key={option.idestado}
                    value={option.idestado}
                  >
                    {option.nmestado}
                  </option>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Selecione a cidade"
                margin="dense"
                name="cidade"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={formState.values.cidade || ''}
                variant="outlined"
              >
                <option value=""></option>
                {cities.map(option => (
                  <option
                    key={option.idcidade}
                    value={option.idcidade}
                  >
                    {option.nmcidade}
                  </option>
                ))}
              </TextField>



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
                  required
                />
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Eu li os {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Termos e Condições
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Cadastrar
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Já possui uma conta?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Login
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

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
