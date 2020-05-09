import React, {useState, useEffect, Fragment} from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import {axiosInstance,axiosInstanceImage} from '../../../../common/ApiService'
//import uploader from 'base64-image-upload';

import localStorage from "../../../../common/LocalStorageService";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';
import Delete from '@material-ui/icons/Delete';



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

    const foto = localStorage.getAvatar();

    if (!foto){
        axiosInstance.get('/api/usuario/v1/avatar', { responseType: 'arraybuffer' })
        .then( response => {
            const base64Flag = "data:image/png;base64,";
            var base64 = btoa(String.fromCharCode(...new Uint8Array(response.data)))

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

  const deleteAvatar = () => {

    axiosInstance.delete('/api/usuario/v1/avatar')
    .then(response => {
      setFotoAvatar(null)
      localStorage.clearAvatar()
    })
    .catch(error => {
        console.log("falha ao remover a foto")
    })

  }

  // const handleUpload = event => {
  //   const data = new FormData();
  //   data.append("image", event.target.files[0])
    
  //   axiosInstance.post("/upload/avatar", data)
  //   .then(response => {
  //     getAvatar()
  //   })
  //   .catch(errors => console.log("Falha ao gravar avatar"));
  // }

  function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays);
}



  const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'videos';

        let formData = new FormData();


        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {

        const imgtpy= e.target.result.substring(5,e.target.result.indexOf(";"));
        const imgstr= e.target.result.substring(e.target.result.indexOf(",")+1);
        const imgbin = base64toBlob(imgstr,imgtpy)
        console.log(imgbin)
        formData.append('file', imgbin);

        
        setFotoAvatar(e.target.result);
        localStorage.setAvatar(e.target.result) 


        axiosInstanceImage.post("/upload/avatar", {file: imgstr })
                            // {file: formData.get("file") }, 
                            // { headers: { "Content-Type": "multipart/form-data" }})
        .then(response => {
          console.log("Foto Atualizada")
        })
        .catch(error => {
          
           localStorage.clearAvatar();
           setFotoAvatar(null);

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

         });
         
         

        // setState((prevState) => ({
        //     [name]: [...prevState[name], e.target.result]
        // }));
    };


    

  };


  useEffect(()=>{
    getProfile();
    getAvatar();
  },[]);

  return (
    <form>
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
        <input
            accept="image/*"
            className={classes.input}
            id="icon-button-photo"
            onChange={handleCapture}
            type="file"
            hidden
        />
        <label htmlFor="icon-button-photo">
            <IconButton color="primary" component="span">
                <PhotoCamera /> 
            </IconButton>
        </label>
        
        <label >
            <IconButton color="primary" 
                onClick={deleteAvatar}
                component="span">
                <Delete /> 
            </IconButton>
        </label>

      </CardActions>
    </Card>
    </form>
  );
};
 

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
