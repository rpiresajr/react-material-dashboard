import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';

import {axiosInstance} from '../../../../common/ApiService';

import { data, options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 450,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const GraficoDespesas = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        
        title="STATUS POR MES R$"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={props.data}
            options={options}
          />
        </div>
      </CardContent>
      
    </Card>
  );
};

GraficoDespesas.propTypes = {
  className: PropTypes.string
};

export default GraficoDespesas;
