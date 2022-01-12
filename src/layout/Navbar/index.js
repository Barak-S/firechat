import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, useMediaQuery, useTheme, Typography } from '@material-ui/core';
import { colors } from '../../assets/colors/index';
import { FiMenu, FiX } from 'react-icons/fi';
import { SiFirebase } from 'react-icons/si';


const NavBar = () => {
    const theme = useTheme()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container className={classes.container}>
                <div className={classes.navigationBar}>
                    <SiFirebase size={40} color={'orange'} />
                    <Typography className={classes.fireChatHeader}>{'Firechat'}</Typography>
                    {isMobile && (
                        open ? 
                        (<FiX size={32} className={classes.menuToggle} onClick={()=>setOpen(false)} />)
                        :
                        (<FiMenu size={32} color={colors.white} className={classes.menuToggle} onClick={()=>setOpen(true)} />)
                    )}
                </div>
            </Container>
            {isMobile ? (
                <div className={classes.mobileMenu} style={{ transform: open ? 'translateX(0%)' : 'translateY(-100%)', transition: '0.3s ease'}}>
                    
                </div>
            ):(
                undefined
            )}
        </AppBar>
    );
};

const NavMenuItem = ({ label, handleClick }) => {
    const classes = useStyles()
    return(
        <span onClick={handleClick && handleClick} className={classes.menuItem}>{label}</span>
    )

}

const useStyles = makeStyles(theme => ({
    container: {
        height: 88,
        maxWidth: 1484,
        display: 'flex',
        width: '100%',
        zIndex: 999,
    },
    appBar: {
        backgroundColor: colors.white,
        boxShadow: 'none',
        zIndex: 990,
        boxShadow: '0px 2px 4px rgba(194, 194, 194, 0.25)',
    },
    menuToggle: {
        position: 'absolute',
        left: 4,
    },
    menuCloseToggle: {
        position: 'absolute',
        top: 31,
        left: 20,
    },
    mobileMenu: {
        height: '100vh',
        backgroundColor: colors.primaryBlue,
        width: '100%',
        display: 'flex',
        zIndex: 990,
        position: 'fixed',
    },
    navigationBar: {
        display: 'flex',
        justifyContent: 'start',
        width: '100%',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.down('sm')]:{
            justifyContent: 'center',
        }
    },
    fireChatHeader: {
        color: colors.red,
        fontSize: 24,
        fontWeight: 600,
        textTransform: 'uppercase',
        paddingTop: 4,
        paddingLeft: 4,
        fontStyle: 'italic'
    },
    menuItem: {
        textTransform: 'uppercase',
        display: 'inline-block',
        paddingBottom: 3,
        textDecoration: 'none',
        fontSize: 19,
        fontWeight: 500,
        color: colors.white,
        margin: '0px 12.5px',
        cursor: 'pointer',
        backgroundImage: `linear-gradient(${colors.white}, ${colors.white}), linear-gradient(transparent, transparent)`,
        backgroundSize: '0 3px, auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        transition: 'all .2s ease-out',
        '&:hover': {
            backgroundSize: '100% 3px, auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 26,
            margin: '22px 27px',
            marginLeft: 95,
            color: colors.white,
            textShadow: 'none'
        }
    }

  }))

export default NavBar;