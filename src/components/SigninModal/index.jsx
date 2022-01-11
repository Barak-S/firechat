import React from 'react';
import { Button, Typography, Dialog, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';
import classNames from 'classnames';

const SigninModal = ({ signInWithGoogle, open, setOpen, className }) => {
  const classes = useStyles();
  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      classes={{ paper: classNames(classes.paper, className) }}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
        <div className={classes.authWrapper}>
            <Typography className={classes.authTitle}>{'Sign in with Google to access the chat!'}</Typography>
            <Button className={classes.signInBtn} onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '25px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '20px !important',
    width: 344,
    height: 354,
  },
  signInBtn: {
      backgroundColor: colors.red,
      color: colors.white,
      '&:hover':{
        backgroundColor: colors.black
      }
  },
  authWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  authTitle: {
      fontSize: 21,
      textAlign: 'center',
      paddingBottom: 22,
  }
}));

export default SigninModal;
