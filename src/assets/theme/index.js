import { createTheme } from '@material-ui/core/styles';
import { colors } from '../colors'

export default createTheme({
    palette: {
        primary: { 
            main: colors.red, 
        },
        secondary: { 
            main: colors.black 
        },
    },
    overrides: {
        MuiButton: {
            contained: {},
            outlined: {},
        },
    },
    typography: {
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
        button: {},
    }
});
