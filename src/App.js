import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import theme from './assets/theme';
import Home from './screens/Home';
import Footer from './layout/Footer';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
      <Footer />
    </MuiThemeProvider>
  );
}

export default App;
