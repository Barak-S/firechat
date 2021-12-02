import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { fonts } from '../../assets/fonts';
import Navbar from '../../layout/Navbar';


const Home = () => {
    const theme = useTheme()
    const classes = useStyles()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const aboutRef = useRef(null);
    const roadmapRef = useRef(null);
    const teamRef = useRef(null);
    const galleryRef = useRef(null);

    const scrollToSection = (position) => {
        console.log(position)
        let scrollToRef = null
        let navSpacing = isMobile ? 96 : 126
        switch (position) {
            case 'about':
                scrollToRef = aboutRef
                break;
            case 'roadmap':
                scrollToRef = roadmapRef
                break;
            case 'team':
                scrollToRef = teamRef
                break;
            case 'gallery':
                scrollToRef = galleryRef
                break;
            default:
                break;
        }
        if (scrollToRef && scrollToRef.current) {
            window.parent.scrollTo({
              top: scrollToRef.current.offsetTop - navSpacing,
              behavior: 'smooth' || 'auto',
            });
        }
    }

    return (
        <div className={classes.container}>
            <Navbar handleNavClick={scrollToSection} />
            home
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '100vh',
        backgroundColor: colors.primaryBlue,
    },
  }))

export default Home


