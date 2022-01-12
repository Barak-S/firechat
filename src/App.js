import React, { useState, useRef } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import theme from './assets/theme';
import ChatRoom from './screens/ChatRoom';
import NavBar from './layout/Navbar';
import { Typography, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import { auth, db } from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SigninModal from './components/SigninModal';

const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([])

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const signInAnonymously = () => {
    const provider = firebase.auth().signInAnonymously();
    auth.signInWithPopup(provider);
    // firebase.auth().signInAnonymously().catch((error) => {
    //   console.log("Error creating user session: ", error);
    //   alert("Could not log user in.")
    // })
  }


  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {!user && (
        <SigninModal 
          open={true} 
          signInWithGoogle={signInWithGoogle} 
          signInAnonymously={signInAnonymously}
        />
      )}
      <ChatRoom auth={auth} firestore={firestore} />
    </MuiThemeProvider>
  );
}


export default App;
