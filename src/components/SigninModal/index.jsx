import React from 'react';
import { Button, Typography, Dialog, makeStyles, TextField } from '@material-ui/core';
import { colors } from '../../assets/colors';
import classNames from 'classnames';
import { FcGoogle } from 'react-icons/fc';
import { FaUserSecret } from 'react-icons/fa';

const SigninModal = ({ signInWithGoogle, signInAnonymously, open, className }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      classes={{ paper: classNames(classes.paper, className) }}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
        <div className={classes.authWrapper}>
            <Typography className={classes.authTitle}>{'Sign in with one of the following methods to access the chat!'}</Typography>
            <Typography style={{ textAlign: 'left', width: '100%', lineHeight: 1 }}>{'Enter Your Username'}</Typography>
            <TextField
                id="username"
                label="@user_name"
                fullWidth
                margin="normal"
                variant="filled"
                type="username"
                autoComplete="off"
                name="username"
                // onChange={handleChange}
                // value={loginParams.email || ''}
            />
            <Typography style={{ textAlign: 'center', width: '100%', marginBottom: 12, marginTop: 6 }}>{'OR'}</Typography>
            <Button 
                className={classes.signInBtn} 
                onClick={signInWithGoogle}
                startIcon={<FcGoogle size={32} />}
            >
                {'Sign in with Google'}
            </Button>
            <Button 
                className={classes.signInAnonymouslyBtn} 
                onClick={signInAnonymously}
                startIcon={<FaUserSecret color={colors.white} size={30} />}
            >
                {'Sign in Anonymously 🤫'}
            </Button>
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
    height: 416,
  },
  signInBtn: {
        backgroundColor: colors.black,
        color: colors.white,
        fontWeight: 600,
        borderRadius: 8,
        width: '100%',
        '&:hover':{
            backgroundColor: colors.black
        }
  },
  signInAnonymouslyBtn: {
        backgroundColor: colors.black,
        color: colors.white,
        fontWeight: 600,
        borderRadius: 8,
        marginTop: 24,
        width: '100%',
        '&:hover':{
            backgroundColor: colors.black
        }
  },
  authWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    height: 200,
  },
  authTitle: {
      fontSize: 21,
      textAlign: 'center',
      paddingBottom: 22,
      color: colors.red,
      fontWeight: 500,
  }
}));

export default SigninModal;
