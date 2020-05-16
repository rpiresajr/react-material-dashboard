import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {StatusBullet} from '../../../../components'

import {
  Card,
  CardActions,
  Divider,
  CardHeader,
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

  const statusColors = {
    ABERTO: 'info',
    EMANALISE: 'warning',
    APROVADO: 'success',
    PAGO: 'success',
    REPROVADO: 'danger'
  };

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
            title="NOVA DESPESA"
            component={RouterLink}
            to={"/despesa/"}
          >
            NOVA DESPESA
          </Button>
        }
        title={props.title}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Status</TableCell>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Criação</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Conta Contabil</TableCell>
                  <TableCell>Total R$</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reembolsos.map(reembolso => (
                    <TableRow
                    className={classes.tableRow}
                    hover
                    key={reembolso.cddespesa}
                    >
                      <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[reembolso.status.replace(" ","")]}
                          size="sm"
                        />
                        &nbsp;&nbsp;
                        {reembolso.status}
                      </div>
                      </TableCell>
                      <TableCell>{reembolso.despesa}</TableCell>
                      <TableCell>
                        {reembolso.dtcriacao.substr(0,10)}
 
                      </TableCell>
                      
                      <TableCell>{reembolso.motivo}</TableCell>
                      <TableCell>{reembolso.ccontabil}</TableCell>
                      <TableCell>{reembolso.valor}</TableCell>
                      <TableCell>
                          <IconButton color="secondary" 
                                  //onClick={e => props.clickButtonCell(reembolso.cddespesa)} 
                                  component={RouterLink}
                                  to={`/despesa/${reembolso.cddespesa}`}
                                  >
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
