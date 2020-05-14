import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

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
  delivered: 'EM ANALISE',
  delivered: 'ABERTO',
  pending: 'info',
  refunded: 'danger'
};

const ListaDespesasAbertas = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);

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
        title="DESPESAS EM ABERTO"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
        "cdusuario": 2,
        "cddespesa": 8,
        "despesa": "Qualquer Merda 2",
        "cdstatus": 1,
        "status": "EM ANALISE",
        "obs": "Qualquer coisa pq o renatinho mandou 2",
        "cdmotivo": 0,
        "motivo": "VISITA",
        "ccontabil": null,
        "dtatualizacao": "2020-01-31T19:20:30",
        "dtcriacao": "2020-01-31T19:20:30",
        "qtd": 1,
        "valor": 12.0
    }

                {despesas.map(despesa => (
                  <TableRow
                    hover
                    key={despesa.cddespesa}
                  >
                    <TableCell>{despesa.despesa}</TableCell>
                    <TableCell>{despesa.motivo}</TableCell>
                    <TableCell>
                      {moment(despesa.dtcriacao).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[despesa.status]}
                          size="sm"
                        />
                        {despesa.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      
    </Card>
  );
};

ListaDespesasAbertas.propTypes = {
  className: PropTypes.string
};

export default ListaDespesasAbertas;
