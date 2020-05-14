import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

import {ReembolsoTable} from '../../../ReembolsoList/components'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  ABERTO: 'info',
  EMANALISE: 'warning',
  APROVADO: 'success',
  PAGO: 'success',
  REPROVADO: 'danger'
};

const ListaDespesasAbertas = props => {
  const { className, reembolsos, ...rest } = props;

  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            NOVA DESPESA
          </Button>
        }
        title="DESPESAS PENDENTES"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <ReembolsoTable
              reembolsos={reembolsos}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

ListaDespesasAbertas.propTypes = {
  className: PropTypes.string,
  reembolsos: PropTypes.array.isRequired
};

export default ListaDespesasAbertas;
