import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,
          Typography
} from '@material-ui/core';


import { Reembolso } from './components'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const ReembolsoCadastro = props => {
  const { className, reembolsos, ...rest } = props; 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <Reembolso 
                  despesa={props.match.params[0]} 
          />
        </Grid>

      </Grid>
    </div>
  );
};

export default ReembolsoCadastro;
