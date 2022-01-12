import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme, Button } from '@material-ui/core';
import { colors } from '../../assets/colors';
import TextArea from '../../components/TextArea';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaUserSecret } from 'react-icons/fa';


const ChatRoom = ({ auth, firestore }) => {
    const classes = useStyles()
    // const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.container}>
            <div className={classes.signOutContainer}>
                <SignOut auth={auth} />
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
    const classes = useStyles()
    return auth.currentUser && (
        <Button 
            className={classes.signOutBtn} 
            onClick={() => auth.signOut()}
            endIcon={<AiOutlinePoweroff size={20} />}
        >
            Sign Out
        </Button>
    )
  }

function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
}

function ChatMessage(props) {
    useEffect(()=>console.log(props), [props])
    const { text, uid, photoURL, createdAt } = props.message;
    const classes = useStyles()
    return (<>
        <div className={classes.message} style={{ flexDirection: uid && uid === props?.auth?.currentUser?.uid ? 'row-reverse' : 'row' }}>
            <div style={{ display: 'flex', flexDirection: uid && uid === props?.auth?.currentUser?.uid ? 'row-reverse' : 'row' }}>
                {photoURL ? (
                    <img 
                        className={classes.msgImg}
                        style={uid ? uid === props?.auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 } : undefined}
                        src={photoURL} 
                    />
                ) : (
                    <FaUserSecret 
                        color={colors.black} 
                        size={32}
                        style={uid ? uid === props?.auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 } : undefined}
                    />
                )}
                <p>{text}</p>
            </div>
            <p 
                style={{ 
                    fontSize: 12, 
                    color: colors.textGrey,

                }}
            >
                {`${toDateTime(createdAt?.seconds)}`}
            </p>
        </div>
    </>)
  }

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
    message: {
        display: 'flex',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    msgImg: {
        width: 44,
        height: 44,
        borderRadius: 100,
    }
  }))

export default ChatRoom


