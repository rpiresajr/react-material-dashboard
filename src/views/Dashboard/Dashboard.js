import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {axiosInstance} from '../../common/ApiService';

// visita
import PeopleIcon from '@material-ui/icons/People';
// viagem
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';

// treinamento
import AccountTreeIcon from '@material-ui/icons/AccountTree';

// reuniao 
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

// workshop
import ApartmentIcon from '@material-ui/icons/Apartment';

// projeto
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

//curso
import DonutSmallIcon from '@material-ui/icons/DonutSmall';

import {
  Budget,
  DespesasAbertas,
  ClientesCadastrados,
  TotalPago,
  LatestSales,
  PorMotivo,
  LatestProducts,
  LatestOrders, 
  Bullet
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const Dashboard = () => {
  const classes = useStyles();

  const [bullets,setBullets] = useState({
    qtd: 0,
    qtdcli: 0,
    valor: 0,
    valorpago:0
  });

  const [dataMotivos, setDataMotivos] = useState([])
  const [legendaMotivos, setLegendaMotivos] = useState([])

  const listaCores = [
        "#1E90FF",
        "#B0C4DE",
        "#BDB76B",
        "#9370DB",
        "#FF7F50",
        "#F0E68C",
        "#E0FFFF"
  ]

  const getPorMotivo = () => {

    axiosInstance.get('/api/despesas/v1/motivo')
      .then( response => {
          //console.log("aqui")
          
          const lista = response.data;

          const dadosV = [];
          const dadosM = [];
          const dadosC = [];
          const motivos =[];
          let aux = -1;
          let QtdTotal = 0;

          lista.forEach(x => {
            QtdTotal+=x.qtd;
          });

          //console.log("lista",lista);

          lista.forEach(x => {
            aux++;
            dadosV.push(x.qtd);
            dadosM.push(x.motivo);
            dadosC.push(listaCores[aux]);

            let tp = null;

            switch(x.motivo){
              case "VISITA":
                  tp=<PeopleIcon />
                  break;
              
              case "VIAGEM":
                  tp=<TimeToLeaveIcon />
                  break;
              
              case "PROJETO":
                  tp=<DeveloperBoardIcon />
                  break;
                          
              case "REUNIAO":
                  tp=<MeetingRoomIcon />
                  break;
            
              case "WORKSHOP":
                  tp=<ApartmentIcon />
                  break;
              
              case "TREINAMENTO":
                  tp=<AccountTreeIcon />
                  break;
                          
              case "CURSO":
                  tp=<DonutSmallIcon />
                  break;             
            }
            
            const legenda = {
              title: x.motivo,
              value: Math.round((x.qtd/QtdTotal)*100),
              icon: tp ,
              color: listaCores[aux]
            }
            motivos.push(legenda)
          });

            
          //console.log(motivos)

          const dataN = {
            datasets: [
              {
                data: dadosV,
                backgroundColor: dadosC,
                borderWidth: 8,
                borderColor: "#FFFFFF",
                hoverBorderColor: "#FFFFFF"
              }
            ],
            labels: dadosM
          };
          setDataMotivos(dataN);
          setLegendaMotivos(motivos);
         // console.log(dataN);
          // setMotivo({
          //   ...lista
          // });

        
          /*
  const devices = [
    {
      title: 'Visita',
      value: '63',
      icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Tablet',
      value: '15',
      icon: <TabletMacIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Mobile',
      value: '23',
      icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ]
  */


          
        })
      .catch( error => {
        //console.log(error)
        console.log("falha ao retornar os motivos")
      });


  }



  const getDespesasInfo = () => {
  
    axiosInstance.get('/api/despesas/v1/info')
      .then( response => {
          //console.log("aqui")
          //console.log( response.data);
          const lista = response.data;

          setBullets({
            ...lista
          });
          
        })
      .catch( error => {
        //console.log(error)
        console.log("falha ao retornar as despesas")
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
  }

  useEffect(() => {
    getDespesasInfo();
    getPorMotivo();
  },[])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget 
            valor={bullets.valor}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <DespesasAbertas 
            qtd={bullets.qtd}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ClientesCadastrados 
            qtdcli={bullets.qtdcli}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalPago
            valorpago={bullets.valorpago}  
          />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <PorMotivo 
            data={dataMotivos}
            legenda={legendaMotivos}
           />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
          {localStorage.getItem("token")}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
