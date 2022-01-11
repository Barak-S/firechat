import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme, Button } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { fonts } from '../../assets/fonts';
import Navbar from '../../layout/Navbar';
import TextArea from '../../components/TextArea';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const ChatRoom = ({ auth, firestore }) => {
    const theme = useTheme()
    const classes = useStyles()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.container}>
            <div className={classes.signOutContainer}>
                <SignOut auth={auth} />
            </div>
            <div className={classes.chatContainer}>
                <div className={classes.messageContainer}>
                    {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
                    <span ref={dummy}></span>
                </div>
                <form className={classes.messageForm} onSubmit={sendMessage}>
                    <Button className={classes.sendBtn} type="submit" disabled={!formValue}>Send!</Button>
                    <TextArea 
                        onChange={(e) => setFormValue(e.target.value)} 
                        placeholder="Say something nice!"
                        value={formValue} 
                        className={classes.textArea} 
                        style={{ width: '100%', marginTop: 'auto' }}
                    />
                </form>
            </div>
        </div>
    );
};

function SignOut({ auth }) {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const classes = useStyles()
    return (<>
        <div 
            className={classes.message}
            style={{ flexDirection: uid && uid === props?.auth?.currentUser?.uid ? 'row-reverse' : 'row' }}
        >
            <img 
                className={classes.msgImg}
                style={uid ? uid === props?.auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 } : undefined}
                src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} 
            />
            <p>{text}</p>
        </div>
    </>)
  }

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '100vh',
        backgroundColor: colors.white,
        paddingTop: 88,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    chatContainer: {
        maxWidth: 600,
        width: '100%',
        height: 650,
        backgroundColor: colors.lightGrey,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        padding: '14px 16px',
    },
    signOutContainer: {
        position: 'absolute',
        right: 20, top: 110
    },
    messageContainer: {
        width: '100%',
        height: '100%',
        marginBottom: 16,
        borderRadius: 8,
    },
    textArea: {
        width: '100%',
    },
    messageForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    sendBtn: {
        marginLeft: 'auto',
        marginBottom: 8,
        backgroundColor: colors.green,
        color: colors.white,
        fontWeight: 500,
        '&:hover': {
            backgroundColor: colors.black
        },
        '&.Mui-disabled': {
            backgroundColor: colors.white,
          },
    },
    message: {
        display: 'flex',
        marginBottom: 8,
    },
    msgImg: {
        width: 44,
        height: 44,
        borderRadius: 100,
    }
  }))

export default ChatRoom


