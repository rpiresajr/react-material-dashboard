import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ReembolsoCadastro = props => {
  const { className, despesa, ...rest } = props;
  const classes = useStyles();

  const loadParameters = () => {
    console.log(props);
  }

  useEffect(()=>{
    loadParameters();
  },[]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>despesa: {props.match.params[0]} </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReembolsoCadastro;