import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import {axiosInstance} from '../../../../common/ApiService'


import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));


const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const userDefault = {
      nmusuario: "Nome",
      dsendereco: "Endereco",
      estado: {
        nmestado: "Estado"
      },
      cidade: {
        nmcidade: "Cidade"
      },
      dsemail: "email@email.com",
      dtativacao: "2019-12-21T21:00:00"
  };
  

  const [user, setUser] = useState(userDefault);
  const [fotoAvatar, setFotoAvatar] = useState()

  const getAvatar = () => {
    axiosInstance.get('/api/usuario/v1/avatar', { responseType: 'arraybuffer' })
    .then( response => {
        const base64Flag = "data:image/jpeg;base64,";
        var base64 = btoa(String.fromCharCode(...new Uint8Array(response.data)))
        //console.log(base64Flag+base64)
        setFotoAvatar(base64Flag+base64);
    })
    .catch( error => {
      console.log("falha ao retornar a foto")
      //console.log(error)
    }); 
  }

  const getProfile = () => {
    axiosInstance.get('/api/usuario/v1/profile')
    .then( response => {
        setUser(response.data)
    })
    .catch( error => {
      console.log("falha ao retornar o profile")
      //console.log(error)
    });
  }
/*
  const handleUpload = event => {
    const data = new FormData();
    data.append("image", event.target.files[0])
    
    api.post("images", data)
    .then(response => console.log(response))
    .catch(errors => console.log(errors));
  }
*/

  useEffect(()=>{
    getProfile();
    getAvatar();
  },[]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.nmusuario}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.dsendereco}
              <br/>
              {user.cidade.nmcidade}, {user.estado.nmestado}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Ativo desde {moment(`${user.dtativacao}`,"YYYY-MM-DDThh:mm:ss").format('DD/MM/YY')} 
              <br />
              {user.dsemail}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={fotoAvatar}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload foto
        </Button>
        <Button variant="text">Remove foto</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
