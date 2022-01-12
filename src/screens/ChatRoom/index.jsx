import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { colors } from '../../assets/colors';
import TextArea from '../../components/TextArea';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import AuthToggle from '../../components/AuthToggle';
import ChatMessage from '../../components/ChatMessage';

const ChatRoom = ({ 
    auth, 
    user,
    firestore, 
    toggleSignIn,
    setToggleSignIn
}) => {
    const classes = useStyles()
    const scrollRef = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    useEffect(()=>{
        if (scrollRef?.current && messages){
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollRef, messages])

    useEffect(()=>{
        if(!user){
            setFormValue('')
        }
    }, [user])

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
        })

        setFormValue('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.container}>
            <div className={classes.signOutContainer}>
                <AuthToggle 
                    auth={auth} 
                    toggleSignIn={toggleSignIn}
                    setToggleSignIn={setToggleSignIn}
                />
            </div>
            <div className={classes.chatContainer}>
                <div className={classes.messageContainer}>
                    {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
                    <span ref={scrollRef}></span>
                </div>
                <form className={classes.messageForm} onSubmit={sendMessage}>
                    <Button 
                        className={classes.sendBtn} 
                        type="submit" 
                        disabled={!formValue}
                        endIcon={<HiOutlinePaperAirplane size={20} />}
                    >
                        Send
                    </Button>
                    <TextArea 
                        readOnly={!user}
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

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '100vh',
        backgroundColor: '#FAFAFB',
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
        boxShadow: '0px 2px 4px rgba(194, 194, 194, 0.25)',
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
        overflowY: 'auto'
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
        backgroundColor: colors.red,
        color: colors.white,
        fontWeight: 500,
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(194, 194, 194, 0.25)',
        '&:hover': {
            backgroundColor: colors.black
        },
        '&.Mui-disabled': {
            backgroundColor: colors.white,
          },
    },
    signOutBtn: {
        backgroundColor: colors.red,
        color: colors.white,
        fontWeight: 500,
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(194, 194, 194, 0.25)',
        '&:hover': {
            backgroundColor: colors.black
        },
    },
  }))

export default ChatRoom

