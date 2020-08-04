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
  GraficoDespesas,
  PorMotivo,
  ListaDespesasAbertas, 
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
  const [dataMes, setDataMes] = useState([])
  const [reembolsosAbertos,setReembolsoAberto] = useState([])

  const listaCores = [
        "#1E90FF",
        "#B0C4DE",
        "#BDB76B",
        "#9370DB",
        "#FF7F50",
        "#F0E68C",
        "#E0FFFF"
  ]


  

  const getInfoMes = () => {

    axiosInstance.get('/api/despesas/v1/mes')
    .then( response => {

      const labels = []
      const dataAbertos = []
      const dataFechados = []
      
      const ret = response.data
      let count = -1;
      let valold ="";


      
      const valores = {
          abertos: 0,
          fechados: 0
      }

      ret.forEach(val => {
        count++;
        if (labels.indexOf(val.dtformat) === -1){
          labels.push(val.dtformat)
        }
        
        if (val.dtformat !== valold){
          if (count>0){
            dataAbertos.push(valores.abertos);
            dataFechados.push(valores.fechados);
          }
          valores.abertos = 0;
          valores.fechados = 0;
        }


        if (val.status === "FECHADO"){
          valores.fechados += val.valor;
        }else{
          valores.abertos += val.valor;
        }

        valold = val.dtformat;
      });
      dataAbertos.push(valores.abertos);
      dataFechados.push(valores.fechados);


      

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'ABERTO',
            backgroundColor: listaCores[4],
            data: dataAbertos
          },
          {
            label: 'FECHADO',
            backgroundColor: listaCores[1],
            data: dataFechados
          }
        ]
      };
      setDataMes(data)

    })
    .catch(error =>{
      console.log(error)
    })
  }

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
          
        })
      .catch( error => {
        //console.log(error)
        console.log("falha ao retornar os motivos")
      });


  }

  const getDespesasEmAberto = () => {
    axiosInstance.get('/api/despesas/v1/abertas')
      .then( response => {
          //console.log("aqui")
          //console.log( response.data);
          const lista = response.data;

          setReembolsoAberto(lista)
          
        })
      .catch( error => {
        //console.log(error)
        console.log("falha ao retornar as despesas")
      })
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
    getInfoMes();
    getDespesasEmAberto();
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
          <GraficoDespesas 
            data={dataMes}
          />
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
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <ListaDespesasAbertas
           reembolsos={reembolsosAbertos}
           title="DESPESAS PENDENTES"
             />

        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
