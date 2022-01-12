import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, useMediaQuery, useTheme, Typography } from '@material-ui/core';
import { colors } from '../../assets/colors/index';
import { FiMenu, FiX } from 'react-icons/fi';
import { SiFirebase } from 'react-icons/si';
import AuthToggle from '../../components/AuthToggle';
import { FaUserSecret } from 'react-icons/fa'; 

const NavBar = ({ auth, user, navOpen, setNavOpen, setToggleSignIn }) => {
    const theme = useTheme()
    const classes = useStyles()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container className={classes.container}>
                <div className={classes.navigationBar}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SiFirebase size={isMobile ? 24 : 40} color={'orange'} />
                        <Typography className={classes.fireChatHeader}>{'Firechat'}</Typography>
                    </div>
                    {user ? auth?.currentUser?.photoURL ? (
                        <img 
                            src={auth.currentUser.photoURL}
                            className={classes.profileImage}
                        />
                    ) : (
                        <FaUserSecret 
                            color={colors.red} 
                            size={isMobile ? 24 : 45}
                            className={classes.anonymousProfile}
                        />
                    ) : undefined}
                
                    {isMobile && (
                        navOpen ? 
                        (<FiX size={32} color={colors.red} className={classes.menuToggle} onClick={()=>setNavOpen(false)} />)
                        :
                        (<FiMenu size={32} color={colors.red} className={classes.menuToggle} onClick={()=>setNavOpen(true)} />)
                    )}
                </div>
            </Container>
            {isMobile ? (
                <div className={classes.mobileMenu} style={{ transform: navOpen ? 'translateX(0%)' : 'translateY(-100%)', transition: '0.3s ease'}}>
                    <div style={{ width: '100%', display: 'flex', marginTop: 125, justifyContent: 'center' }}>
                        <AuthToggle 
                            auth={auth} 
                            setToggleSignIn={setToggleSignIn}
                        />
                    </div>
                </div>
            ):(
                undefined
            )}
        </AppBar>
    );
};

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
        backgroundColor: colors.white,
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
    fireChatHeader: {
        color: colors.red,
        fontSize: 24,
        fontWeight: 600,
        paddingTop: 4,
        paddingLeft: 4,
        fontStyle: 'italic',
        textTransform: 'uppercase',
        display: 'inline-block',
        paddingBottom: 3,
        textDecoration: 'none',
        margin: '0px 12.5px',
        cursor: 'pointer',
        backgroundImage: `linear-gradient(${colors.red}, ${colors.red}), linear-gradient(transparent, transparent)`,
        backgroundSize: '0 3px, auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        transition: 'all .2s ease-out',
        '&:hover': {
            backgroundSize: '100% 3px, auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            paddingLeft: 0,
        }
    },
    profileImage: {
        height: 55,
        width: 55,
        borderRadius: 100,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            right: 12,
            height: 34,
            width: 34,
        }
    },
    anonymousProfile: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            right: 12,
        }
    }
  }))

export default NavBar;