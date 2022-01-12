import React, { useEffect, useState, useRef } from 'react';
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

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const signInAnonymouslyWithUsername = (username) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    firebase.auth().signInAnonymously()
    .then(({ user }) => user.updateProfile({ displayName: username }))
    .then(() => {
      console.log("User was updated!", auth.currentUser.displayName);
    })
    .catch((error) => {
      console.log("Error creating user session: ", error);
      alert("Could not log user in.")
    })
  }

  const signInAnonymously = () => {
    const provider = firebase.auth().signInAnonymously();
    auth.signInWithPopup(provider);
  }

  useEffect(()=>{
    console.log(user)
  }, [user])


  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {!user && (
        <SigninModal 
          open={true} 
          signInWithGoogle={signInWithGoogle} 
          signInAnonymously={signInAnonymously}
          signInAnonymouslyWithUsername={signInAnonymouslyWithUsername}
        />
      )}
      <ChatRoom 
        auth={auth} 
        firestore={firestore} 
      />
    </MuiThemeProvider>
  );
}


export default App;
