import React, { useState } from 'react';
import { Button, Typography, Dialog, makeStyles, TextField } from '@material-ui/core';
import { colors } from '../../assets/colors';
import classNames from 'classnames';
import { FcGoogle } from 'react-icons/fc';
import { FaUserSecret } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const SigninModal = ({ 
    signInWithGoogle, 
    signInAnonymously, 
    signInAnonymouslyWithUsername,
    open, 
    setOpen,
    className 
}) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false)
    const [username, setUsername] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleUsernameSubmit = (e) => {
        e.preventDefault()
        signInAnonymouslyWithUsername(username)
    }

  return (
    <Dialog
      open={open}
      onClose={()=>setOpen(false)}
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
                onChange={handleUsernameChange}
                value={username}
            />
            <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classNames(classes.commonBtn, hover && classes.hoverClass)}
                onClick={handleUsernameSubmit}
                endIcon={<BsArrowRight />}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                >
                <span className={classes.btnLabel}>{'Continue'}</span>
            </Button>
            <Typography style={{ textAlign: 'center', width: '100%', marginBottom: 12, marginTop: 10 }}>{'OR'}</Typography>
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
    height: 424,
    [theme.breakpoints.down('sm')]: {
        padding: '25px 14px',
        height: 'auto',
        margin: '0px 14px',
    }
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
        marginTop: 12,
        width: '100%',
        '&:hover':{
            backgroundColor: colors.black
        }
    },
    authWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    authTitle: {
        fontSize: 21,
        textAlign: 'center',
        paddingBottom: 22,
        color: colors.red,
        fontWeight: 500,
        },
    commonBtn: {
        fontWeight: 400,
        maxWidth: 245,
        padding: '8px 0',
        width: '100%',
        position: 'relative',
        border: `1px solid ${colors.red}`,
        backgroundColor: colors.white,
        borderRadius: 24,
        marginTop: 8,
        '& .MuiButton-label': {
            marginRight: -24,
            transition: '0.3s ease-in-out all',
        },
        '& [class*="-endIcon"]': {
            opacity: 0,
            color: colors.red,
            transition: '0.5s ease-out all',
        },
        btnLabel: {
            fontWeight: 400,
        },
    },
    hoverClass: {
        backgroundColor: `${colors.red} !important`,
        color: colors.white,
        '& > *:first-child': {
            transform: 'translateX(-10px)',
            opacity: 1,
        },
        '& [class*="-endIcon"]': {
            opacity: 1,
            color: colors.white,
        },
    },
}));

export default SigninModal;
