import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import {StatusBullet} from '../../../../components'
import {axiosInstancePDF} from '../../../../common/ApiService'

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
  const { className, reembolsos, tipoPDF, ...rest } = props;

  const statusColors = {
    ABERTO: 'info',
    EMANALISE: 'warning',
    APROVADO: 'success',
    PAGO: 'success',
    REPROVADO: 'danger'
  };

  const classes = useStyles();

  const getDespesas = () =>{

    let urlPdf = ''

    if ( props.tipoPDF === "TODAS"){
      urlPdf = '/api/report/v1/despesas'
    }else{
      urlPdf = '/api/report/v1/despesasabertas'
    }

    axiosInstancePDF.get(urlPdf,{
      responseType: 'blob' //Force to receive data in a Blob Format
     })
    .then(function(response) {
        var blob = new Blob([response.data], {
              type: 'application/pdf'
        });
        var url = window.URL.createObjectURL(blob)
        window.open(url);
      })
      .catch(function(error) {
            console.log(error)
    });

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div>
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
          <IconButton 
                            title="Gerar PDF"
                            color="secondary"
                            onClick={getDespesas}
                            >
                            <PictureAsPdfIcon />
          </IconButton>
          </div>
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
                                  title="Editar a Despesa"
                                  component={RouterLink}
                                  to={`/despesa/${reembolso.cddespesa}`}
                                  >
                            <EditIcon />
                          </IconButton>
                      
                        <IconButton 
                          title="Apagar a Despesa"
                          color="secondary">
                            <DeleteIcon />
                          </IconButton>

                          <IconButton 
                            title="Gerar PDF"
                            color="secondary">
                            <PictureAsPdfIcon />
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
  tipoPDF: PropTypes.string.isRequired,
  reembolsos: PropTypes.array.isRequired
};

export default ReembolsoTable;
