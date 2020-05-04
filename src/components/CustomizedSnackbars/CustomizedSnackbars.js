import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

//export default function CustomizedSnackbars() {
const CustomizedSnackbars = props => {
  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);

  //const handleClick = () => {
  //  setOpen(true);
  //};

  //const handleClose = (event, reason) => {
  //  if (reason === 'clickaway') {
  //    return;
  //  }
  //
  //  setOpen(false);
  //};

  /*
  success, error, warning, info, 
  */
  return (
    <div className={classes.root}>
      <Snackbar open={props.open} 
                autoHideDuration={props.autoHideDuration} 
                onClose={props.handleClose}>
          <Alert onClose={props.handleClose} 
                severity={props.severity}>
            {props.mensagem}
          </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;