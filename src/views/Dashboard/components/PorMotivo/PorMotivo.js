import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar'; 
import 'react-perfect-scrollbar/dist/css/styles.css'; 



import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';

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

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '310px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(0.5)
  },
  full: {
    width: '100%'
  }
  
}));

const PorMotivo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  /*
  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['VISITA', 
        'VIAGEM',
        'PROJETO',
        'REUNIAO',
        'WORKSHOP',
        'TREINAMENTO',
        'CURSO']
  };
  */

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };


  const legenda = props.legenda;

  const maxcols = 4;
  let   qtdcols =0;

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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        
        title="MOTIVOS"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={props.data}
            options={options}
          />
        </div>
        <PerfectScrollbar
         className={classes.full}
        >
        <div className={classes.stats}>
          {legenda.map(lgd => (
            <div
              className={classes.device}
              key={lgd.title}
              
            >
              <span >{lgd.icon}</span>
              <Typography variant="body2">&nbsp;{lgd.title}&nbsp;</Typography>
              <Typography
                style={{ color: lgd.color }}
                variant="h2"
              >
              </Typography>
              <br />
              {lgd.value}%
            </div>
          ))}
        </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PorMotivo.propTypes = {
  className: PropTypes.string
};

export default PorMotivo;
