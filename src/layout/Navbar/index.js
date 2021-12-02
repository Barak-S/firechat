import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, useMediaQuery, useTheme } from '@material-ui/core';
import { colors } from '../../assets/colors/index';
// import Logo from '../../assets/images/dimwits-logo.png';
// import LogoDark from './assets/logo-dark.png';
import { FiMenu, FiX } from 'react-icons/fi';
// import SocialSection from '../../components/SocialSection';


const NavBar = ({ handleNavClick }) => {
    const theme = useTheme()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [blur, handleblur] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleMenuItemClick = (pageRef) => {
        handleNavClick && handleNavClick(pageRef)
    }

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if (window.scrollY > window.screen.height){
                handleblur(true)
            } else {
                handleblur(false)
            }
        })
        return ()=>{
            window.removeEventListener('scroll')
        }
    }, [])

    return (
        <AppBar position="fixed" className={classes.appBar} style={{ backdropFilter: blur ? 'blur(6px)' : 'none' }}>
            <Container className={classes.container}>
                <div className={classes.navigationBar}>
                    {isMobile && (
                        open ? 
                        (<FiX size={32} className={classes.menuToggle} onClick={()=>setOpen(false)} />)
                        :
                        (<FiMenu size={32} color={colors.white} className={classes.menuToggle} onClick={()=>setOpen(true)} />)
                    )}
                    {/* <img src={isMobile && open ? LogoDark : Logo} style={{ height: isMobile && open ? 70 : 104 }} /> */}
                    <div className={classes.linkSection}>
                        <NavMenuItem handleClick={()=>handleMenuItemClick('about')} label={'About'} />
                        <NavMenuItem handleClick={()=>handleMenuItemClick('gallery')} label={'Gallery'} />
                        <NavMenuItem handleClick={()=>handleMenuItemClick('roadmap')} label={'Roadmap'} />
                        <NavMenuItem handleClick={()=>handleMenuItemClick('team')} label={'Team'} />
                        {/* <SocialSection style={{ marginLeft: 62 }} /> */}
                    </div>
                </div>
            </Container>
            {isMobile ? (
                <div className={classes.mobileMenu} style={{ transform: open ? 'translateX(0%)' : 'translateY(-100%)', transition: '0.3s ease'}}>
                    <div className={classes.linkSectionMobile}>
                        <NavMenuItem handleClick={()=>{setOpen(false); handleMenuItemClick('about')}} label={'About'} />
                        <NavMenuItem handleClick={()=>{setOpen(false); handleMenuItemClick('gallery')}} label={'Gallery'} />
                        <NavMenuItem handleClick={()=>{setOpen(false); handleMenuItemClick('roadmap')}} label={'Roadmap'} />
                        <NavMenuItem handleClick={()=>{setOpen(false); handleMenuItemClick('team')}} label={'Team'} />
                        {/* <SocialSection style={{ margin: '0 auto' }} /> */}
                    </div>
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
        height: 126,
        maxWidth: 1484,
        display: 'flex',
        width: '100%',
        zIndex: 999,
        [theme.breakpoints.down('sm')]:{
            height: 96
        }
    },
    appBar: {
        backgroundColor: colors.primaryBlue,
        boxShadow: 'none',
        zIndex: 990,
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
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.down('sm')]:{
            justifyContent: 'center',
        }
    },
    linkSection :{
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    },
    linkSectionMobile: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 116,
        width: '100%',
    },
    menuItem: {
        textTransform: 'uppercase',
        display: 'inline-block',
        paddingBottom: 3,
        textDecoration: 'none',
        // textShadow: `0 0 3px ${colors.darkGrey}`,
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