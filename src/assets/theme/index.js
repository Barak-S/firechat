import { createTheme } from '@material-ui/core/styles';

export default createTheme({
    palette: {
        primary: { 
            dark: '#11274B', 
            main: '#2b4061', 
            light: 'rgb(236, 242, 251)', 
        },
        secondary: { 
            dark: '#cd9a37', 
            main: '#F3BD48' 
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                // minWidth: 88,
                // padding: '3px 16px',
                // backgroundColor: '#2b4061',
                // color: '#FFF',
                // fontWeight: 500,
                // borderRadius: 30,
                // '&:hover': {
                //     backgroundColor: '#cd9a37',
                // }
            },
            outlined: {
                // padding: '3px 12px',
                // borderRadius: 30
            },
            textSecondary: {
                // backgroundColor: '#11274B',
                // color: '#FFF',
                // '&:hover': {
                //     border: 'solid 1px #11274B',
                //     color: '#11274B',
                // }
            }
        },
    },
    typography: {
        // fontFamily: [
        //     'Sentinel-Black',
        //     'Roboto',
        //     'sans-serif'
        // ].join(','),
        secondaryFont: 'Roboto',
        h1: {
            color: 'inherit',
        },
        h2: {
            color: 'inherit',
        },
        h3: {
            color: 'inherit',
        },
        h4: {
            color: 'inherit',
        },
        h5: {
            color: 'inherit',
        },
        h6: {
            color: 'inherit',
        },
        button: {
            color: 'inherit',
            fontSize: '16px',
            letterSpacing: '1.25px',
            // fontFamily: 'Roboto',
            fontWeight: '300',
            textTransform: 'none'
        },
    }
});
