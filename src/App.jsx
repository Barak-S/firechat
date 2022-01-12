import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import theme from './assets/theme';
import ChatRoom from './screens/ChatRoom';
import NavBar from './layout/Navbar';
import firebase from 'firebase/app';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SigninModal from './components/SigninModal';

const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const [showSignIn, setShowSignIn] = useState(false)

  const signInAnonymouslyWithUsername = (username) => {
    firebase.auth().signInAnonymously()
    .then(({ user }) => user.updateProfile({ displayName: username }))
    .then(() => {
      console.log("User was updated!");
      setShowSignIn(false)
    })
    .catch((error) => {
      console.log("Error creating user session: ", error);
      alert("Could not log user in.")
    })
  }

  const signInAnonymously = () => {
    const provider = firebase.auth().signInAnonymously();
    setShowSignIn(false);
    auth.signInWithPopup(provider);
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    setShowSignIn(false);
    auth.signInWithPopup(provider);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <SigninModal 
        open={showSignIn} 
        setOpen={setShowSignIn}
        signInWithGoogle={signInWithGoogle} 
        signInAnonymously={signInAnonymously}
        signInAnonymouslyWithUsername={signInAnonymouslyWithUsername}
      />
      <ChatRoom 
        auth={auth} 
        user={user}
        firestore={firestore} 
        toggleSignIn={showSignIn} 
        setToggleSignIn={setShowSignIn}
      />
    </MuiThemeProvider>
  );
}


export default App;
