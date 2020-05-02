import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button , 
        FormLabel, 
        Typography,
      Grid
} from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ReembolsoToolbar = props => {
  const { className, ...rest } = props;

  const submit = (event) => {
      console.log("botao add reembolso");
  }

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />


      </div>
      <div className={classes.title}>
      <Typography variant="subtitle1">Despesas</Typography>
      </div>
    </div>
  );
};

ReembolsoToolbar.propTypes = {
  className: PropTypes.string
};

export default ReembolsoToolbar;
