import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ReembolsoTable = props => {
  const { className, reembolsos, ...rest } = props;


  

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Criação</TableCell>
                  <TableCell>Atualização</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Conta Contabil</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reembolsos.map(reembolso => (
                    <TableRow
                    className={classes.tableRow}
                    hover
                    key={reembolso.despesaEmbeddable.cddespesa}
                    >

                      <TableCell>{reembolso.dsdespesa}</TableCell>
                      <TableCell>{reembolso.dtcriacao.replace("T","  ")}</TableCell>
                      <TableCell>{reembolso.dtatualizacao.replace("T","  ")}</TableCell>
                      <TableCell>{reembolso.tipomotivo.dstipomotivo}</TableCell>
                      <TableCell>{reembolso.dscontacontabil}</TableCell>
                      <TableCell>
                          <IconButton color="secondary" onClick={e => props.clickButtonCell(reembolso.despesaEmbeddable.cddespesa)} >
                            <EditIcon />
                          </IconButton>
                      
                        <IconButton color="secondary">
                            <DeleteIcon />
                          </IconButton>
                          
                      </TableCell>

                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      
    </Card>
  );
};

ReembolsoTable.propTypes = {
  className: PropTypes.string,
  reembolsos: PropTypes.array.isRequired
};

export default ReembolsoTable;
