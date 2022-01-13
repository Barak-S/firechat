import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, InputAdornment, useMediaQuery, useTheme } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { BiCommentDetail } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import moment from 'moment';

const ChatMessage = ({ message, comments, auth, sendReply }) => {
    const { text, uid, id, photoURL, createdAt, displayName } = message;

    let isMyText = uid === auth?.currentUser?.uid;

    const [hover, setHover] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [replyValue, setReplyValue] = useState('')
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleReplyChange = (e) =>{
        setReplyValue(e.target.value)
    }

    const handleSendReply = (id, replyValue) => {
        sendReply(id, replyValue)
        setReplyValue('')
    }

    const toDateTime = (timestamp) => {
        if (timestamp?.seconds){
            let t = new Date(timestamp.seconds*1000)
            return moment(t).local().startOf('minute').fromNow()
        }
    }

    return (<>
        <div 
            className={classes.message} 
            style={{ flexDirection: isMyText ? 'row-reverse' : 'row', position: 'relative' }}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : 'initial' }}>
                <div style={{ 
                        display: 'flex', 
                        flexDirection: isMyText ? 'row-reverse' : 'row', 
                        width: '100%',
                        alignItems: 'flex-start'
                    }}
                >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {photoURL && (
                        <img 
                            alt={`${displayName}-profile-pic`}
                            className={classes.msgImg}
                            src={photoURL} 
                        />
                        )}
                    <Typography style={{ padding: '0px 8px', whiteSpace: 'pre' }}>{displayName ? displayName : 'Anonymous'}</Typography>
                </div>
                    <div className={isMyText ? classes.mineMessage : classes.yourMessage}>
                        {hover && !expanded && (
                            <>
                                <BiCommentDetail 
                                    className={isMyText ? classes.replyToMe : classes.replyToYou} 
                                    color={'#000100'} 
                                    size={18} 
                                    onClick={()=>setExpanded(true)}
                                />
                            </>
                        )}
                        {expanded && (
                            <AiFillCloseCircle 
                                className={isMyText ? classes.replyToMe : classes.replyToYou} 
                                color={'#000100'} 
                                size={20} 
                                onClick={()=>setExpanded(false)}
                            />
                        )}
                        {text}
                        {!!comments.length && (
                            <Typography 
                                onClick={()=>setExpanded(!expanded)} 
                                className={isMyText ? classes.replyHeaderMe : classes.replyHeaderYou}
                            >
                                {`${comments.length} Comments`}
                            </Typography>
                        )}
                    </div>
                </div>
                <div 
                    className={isMyText ? classes.myThreadWrapper : classes.yourThreadWrapper} 
                    style={{ 
                        zIndex: expanded ? 2 : -1, 
                        opacity: expanded ? 1 : 0, 
                        marginTop: expanded ? '0%' : '-19%',
                        display: expanded ? 'flex' : 'none',
                        position: expanded ? 'relative' : 'absolute',
                        transition: '0.3s ease-in-out',
                        width: '100%',
                        flexDirection: 'column',
                        borderRadius: 8,
                        marginTop: 6,
                    }}
                >
                    {comments && (
                        <div style={{ paddingLeft: 6, borderLeft: '1px solid black', marginBottom: 6}}>
                            {comments.map((com)=>{
                                return (
                                    <Typography key={com.id} style={{ fontSize: 12}}><strong>{!!com.displayName ? com.displayName : 'Anonymous'}</strong>{'  '}{com.text}</Typography>
                                )
                            })}
                        </div>
                    )}
                    <TextField
                        id="reply"
                        label="start typing..."
                        fullWidth
                        margin="none"
                        type="text"
                        autoComplete="off"
                        name="reply"
                        className={isMyText ? classes.myReplyInput : classes.yourReplyInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <HiOutlinePaperAirplane
                                        size={20} 
                                        color={!replyValue.length ? 'rgba(0, 0, 0, 0.54)': isMyText ? colors.black : colors.green} 
                                        className={classes.sendReplyBtn}
                                        style={{ cursor: replyValue.length ? 'pointer' : 'auto' }}
                                        onClick={()=>replyValue.length && handleSendReply(id, replyValue)}
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
                    marginBottom: 'auto',
                    whiteSpace: 'pre',
                    padding: '0px 10px',
                }}
            >
                {toDateTime(createdAt)}
            </p>
        </div>
    </>)
  }

const useStyles = makeStyles(theme => ({
    message: {
        display: 'flex',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiInput-underline:after': {
            borderBottom: `2px solid ${colors.green}`
        },
        '& .MuiInputLabel-shrink': {
            color: 'rgba(0, 0, 0, 0.54)'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column !important'
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
        display: 'inline-block',
        height: 'fit-content',
        zIndex: 6,
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
        display: 'inline-block',
        marginLeft: 'auto',
        height: 'fit-content',
        zIndex: 6,
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
    myThreadWrapper: {
        paddingLeft: 8,
        padding: 12,
        background: 'linear-gradient(to bottom, #35c958 0%, #34c859 100%)',
        backgroundAttachment: 'fixed',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    yourThreadWrapper: {
        paddingLeft: 8,
        padding: 12,
        backgroundColor: '#E6E5EC',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    myReplyInput: {
        background: 'linear-gradient(to bottom, #35c958 0%, #34c859 100%)',
        backgroundAttachment: 'fixed',
    },
    yourReplyInput: {
        backgroundColor: '#E6E5EC',
        '&:hover': {
            backgroundColor: '#E6E5EC',
        }
    },
    sendReplyBtn: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    replyHeaderMe: {
        fontSize: 11,
        lineHeight: 1,
        paddingTop: 3,
        '&:hover': {
            textDecoration: 'underline',
            color: colors.white,
        }
    },
    replyHeaderYou: {
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