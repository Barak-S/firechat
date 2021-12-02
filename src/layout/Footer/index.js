import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Container, useMediaQuery, useTheme } from '@material-ui/core';
// import Logo from '../../assets/images/dimwits-logo.png';
import { colors } from '../../assets/colors/index';
const pack = require('../../../package.json');

const CommonFooter = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={classes.footer}>
        <Container className={classes.container}>
            <div className={classes.navigationBar}>
                {/* <img src={Logo} className={classes.logo} /> */}
                <div className={classes.linkSection}>

                </div>
            </div>
        </Container>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    height: 138,
    maxWidth: 1484,
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      height: 211,
    }
  },
  footer: {
    backgroundColor: colors.primaryBlue,
  },
  logo :{
    height: 104,
  },
  navigationBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }
  },
  linkSection :{
    display: 'flex',
  },
  navLink: {
    fontSize: 19,
    fontWeight: 400,
    color: 'white',
  },
  brandedAF: {
    height: 106,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]:{
      height: 92,
      width: '100%',
    }
  }
}))

export default CommonFooter

