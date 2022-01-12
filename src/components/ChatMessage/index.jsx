import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { FaUserSecret } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

const ChatMessage = ({ message, comments, auth, sendReply }) => {
    const { text, uid, id, photoURL, createdAt, displayName } = message;
    const [hover, setHover] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [replyValue, setReplyValue] = useState('')
    const classes = useStyles()

    const handleReplyChange = (e) =>{
        setReplyValue(e.target.value)
    }

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t.toDateString() + " " + t.toLocaleTimeString()
    }

    useEffect(()=>console.log(comments), [comments])
    return (<>
        <div 
            className={classes.message} 
            style={{ flexDirection: uid && uid === auth?.currentUser?.uid ? 'row-reverse' : 'row', position: 'relative' }}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                        display: 'flex', 
                        flexDirection: uid && uid === auth?.currentUser?.uid ? 'row-reverse' : 'row', 
                        width: '100%'
                    }}
                >
                    {photoURL && (
                        <img 
                            alt={`${displayName}-profile-pic`}
                            className={classes.msgImg}
                            style={uid === auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 }}
                            src={photoURL} 
                        />
                        )}
                    {!displayName ? (
                        <FaUserSecret 
                            color={colors.black} 
                            size={32}
                            style={uid === auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 }}
                        />
                        ) : (<Typography>{displayName}</Typography>)}
                    <div className={uid === auth?.currentUser?.uid ? classes.mineMessage : classes.yourMessage}>
                        {hover && !expanded && (
                            <>
                                <BiCommentDetail 
                                    className={uid === auth?.currentUser?.uid ? classes.replyToMe : classes.replyToYou} 
                                    color={'#000100'} 
                                    size={18} 
                                    onClick={()=>setExpanded(true)}
                                />
                            </>
                        )}
                        {expanded && (
                            <AiFillCloseCircle 
                                className={uid === auth?.currentUser?.uid ? classes.replyToMe : classes.replyToYou} 
                                color={'#000100'} 
                                size={20} 
                                onClick={()=>setExpanded(false)}
                            />
                        )}
                        {text}
                        {!!comments.length && <Typography onClick={()=>setExpanded(true)} className={classes.replyHeader}>{`${comments.length} Comments`}</Typography>}
                    </div>
                </div>
                <div 
                    className={classes.threadWrapper} 
                    style={{ 
                        zIndex: expanded ? 2 : -1, 
                        opacity: expanded ? 1 : 0, 
                        marginTop: expanded ? '0%' : '-19%',
                        transition: '0.3s ease-in-out',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {comments && (
                        <div style={{ paddingLeft: 6, borderLeft: '1px solid black', marginBottom: 6}}>
                            {comments.map((com)=>{
                                return (
                                    <Typography style={{ fontSize: 12}}><strong>{!!com.displayName && com.displayName}</strong>{'  '}{com.text}</Typography>
                                )
                            })}
                        </div>
                    )}
                    <TextField
                        id="reply"
                        label="reply"
                        fullWidth
                        margin="none"
                        type="text"
                        autoComplete="off"
                        name="reply"
                        className={classes.replyInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <HiOutlinePaperAirplane
                                        size={20} 
                                        color={!replyValue.length ? 'rgba(0, 0, 0, 0.54)' : colors.green} 
                                        className={classes.sendReplyBtn}
                                        style={{ cursor: replyValue.length ? 'pointer' : 'auto' }}
                                        onClick={()=>replyValue.length && sendReply(id, replyValue)}
                                    />
                                </InputAdornment>
                            )
                          }}
                        onChange={(e)=>handleReplyChange(e)}
                        value={replyValue}
                    />
                </div>
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
    message: {
        display: 'flex',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiInput-underline:after': {
            borderBottom: `2px solid ${colors.green}`
        },
        '& .MuiInputLabel-shrink': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    msgImg: {
        width: 44,
        height: 44,
        borderRadius: 100,
    },
    mineMessage: {
        color: colors.white,
        background: 'linear-gradient(to bottom, #35c958 0%, #34c859 100%)',
        backgroundAttachment: 'fixed',
        position: 'relative',
        borderRadius: 20,
        padding: '8px 15px',
        marginTop: 5,
        display: 'inline-block',
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8,
        height: 'fit-content',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    yourMessage: {
        color: '#000100',
        backgroundColor: '#E6E5EC',
        position: 'relative',
        borderRadius: 20,
        padding: '8px 15px',
        marginTop: 5,
        display: 'inline-block',
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8,
        height: 'fit-content',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    replyToYou: {
        backgroundColor: '#E6E5EB',
        borderRadius: 100,
        padding: 3,
        position: 'absolute',
        right: -7,
        top: -7,
        boxShadow: '0px 7px 16px 2px rgba(0, 0, 0, 0.16)',
    },
    replyToMe: {
        background: 'linear-gradient(to bottom, #35c958 0%, #34c859 100%)',
        backgroundAttachment: 'fixed',
        borderRadius: 100,
        padding: 3,
        position: 'absolute',
        left: -7,
        top: -7,
        boxShadow: '0px 7px 16px 2px rgba(0, 0, 0, 0.16)',
    },
    threadWrapper: {
        paddingLeft: 8,
        padding: 12,
        backgroundColor: colors.lightGrey,
        backgroundColor: '#D9D8DB',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    replyInput: {
        backgroundColor: '#D9D8DB',
        '&:hover': {
            backgroundColor: '#D9D8DB',
        }
    },
    sendReplyBtn: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    replyHeader: {
        fontSize: 11,
        lineHeight: 1,
        paddingTop: 3,
        '&:hover': {
            textDecoration: 'underline',
            color: colors.green,
        }
    }
  }))

export default ChatMessage;