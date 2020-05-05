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

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const [user, setUserValues] = useState({
    nmusuario: '',
    dsemail: '',
    dsendereco: '',
    estado: {
      idestado: 0,
      nmestado: ''
    },
    cidade:{
       idcidade: 0,
       nmcidade: ''
    }
  });

  const handleChangeEstado = event => {
      const est = {
        estado: {idestado: event.target.value } 
      }
      console.log(est);
      setUserValues({...user, ...est});
  }

  const handleChange = event => {
    console.log(event.target.name,event.target.value)
    

    if (event.target.name === "estado"){
      const est = {
        estado: {idestado: event.target.value } 
      }
      //console.log(est);
      setUserValues({...user, ...est});
      getCidades(event.target.value);
    }else if (event.target.name === "cidade"){
      const cid = {
        cidade: {idcidade: event.target.value } 
      }
      //console.log(est);
      setUserValues({...user, ...cid});
    }else {
      setUserValues({
        ...user,
        [event.target.name]: event.target.value
      });

    }
  };



  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const getEstados = () => {
    axiosInstance.get('/api/estados/v1')
    .then( response => {
      setStates(response.data)
    })
    .catch( error => {
      console.log("falha ao retornar o estado")
      //console.log(error)
    });
  }

  const getCidades = (idEstado) => {
    setCities([]);
    axiosInstance.get(`/api/cidades/v1/${idEstado}`)
    .then( response => {
      setCities(response.data)
    })
    .catch( error => {
      console.log("falha ao retornar a cidade")
      console.log(error)
      console.log(error.config)
    });
  }


  const getProfile = () => {
    
    axiosInstance.get('/api/usuario/v1/profile')
    .then( response => {
        const idEstado = response.data;
        getCidades(idEstado.estado.idestado);

        setUserValues({
          ...response.data
        });

    })
    .catch( error => {
      console.log("falha ao retornar o profile")
      //console.log(error)
    });
  }



  useEffect(()=>{
    getProfile();
    getEstados();
  },[]);

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
          title="Dados Cadastrais"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Insira o nome Completo"
                label="Nome"
                margin="dense"
                name="nmusuario"
                onChange={handleChange}
                required
                value={user.nmusuario}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="dsemail"
                onChange={handleChange}
                required
                value={user.dsemail}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Endereço"
                margin="dense"
                name="dsendereco"
                onChange={handleChange}
                required
                value={user.dsendereco}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
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
                value={user.estado.idestado || ''}
                variant="outlined"
              >

                {states.map(option => (
                  <option
                    key={option.idestado}
                    value={option.idestado}
                  >
                    {option.nmestado}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
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
                value={user.cidade.idcidade || ''}
                variant="outlined"
              >

                {cities.map(option => (
                  <option
                    key={option.idcidade}
                    value={option.idcidade}
                  >
                    {option.nmcidade}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
