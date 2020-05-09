import React, {useState,useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import {axiosInstance} from '../../../../../../common/ApiService'
import localStorage from '../../../../../../common/LocalStorageService'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const userDefault = {
    nmusuario: "Nome",
    cidade: {
      nmcidade: "Cidade"
    }
  };


  const [user, setUser] = useState(userDefault);
  const [fotoAvatar, setFotoAvatar] = useState()

  const getAvatar = () => {

    const foto = localStorage.getAvatar();

    if (!foto){
      axiosInstance.get('/api/usuario/v1/avatar', { responseType: 'arraybuffer' })
      .then( response => {
        const base64Flag = "data:image/png;base64,";
        var base64 = btoa(String.fromCharCode(...new Uint8Array(response.data)))
        //console.log(base64Flag+base64)
        if(base64){
          localStorage.setAvatar(base64Flag+base64)
          setFotoAvatar(base64Flag+base64); 
        }

          
      })
      .catch( error => {
        console.log("falha ao retornar a foto")
        //console.log(error)
      });
    }else{
      setFotoAvatar(foto);
    } 
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

  const handleChoosePhoto = () => {
      //<Typography variant="body2">{user.cidade.nmcidade}</Typography>
  }

  useEffect(()=>{
    getProfile();
    getAvatar();
  },[]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={fotoAvatar}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.nmusuario}
      </Typography>
      
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
