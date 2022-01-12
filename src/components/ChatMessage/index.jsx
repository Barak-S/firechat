import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { FaUserSecret } from 'react-icons/fa';

const ChatMessage = (props) => {
    const { text, uid, photoURL, createdAt, displayName } = props.message;
    const classes = useStyles()

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t.toDateString() + " " + t.toLocaleTimeString()
    }
    return (<>
        <div className={classes.message} style={{ flexDirection: uid && uid === props?.auth?.currentUser?.uid ? 'row-reverse' : 'row' }}>
            <div style={{ display: 'flex', flexDirection: uid && uid === props?.auth?.currentUser?.uid ? 'row-reverse' : 'row', alignItems: 'center' }}>
                {photoURL && (
                    <img 
                        alt={`${displayName}-profile-pic`}
                        className={classes.msgImg}
                        style={uid ? uid === props?.auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 } : undefined}
                        src={photoURL} 
                    />
                )}
                {!displayName ? (
                    <FaUserSecret 
                        color={colors.black} 
                        size={32}
                        style={uid ? uid === props?.auth?.currentUser?.uid ? { marginLeft: 16} : { marginRight: 16 } : undefined}
                    />
                ) : (<Typography>{displayName}</Typography>)}
                <div className={uid === props?.auth?.currentUser?.uid ? classes.mineMessage : classes.yourMessage}>{text}</div>
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
        marginRight: 8
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
        marginRight: 8
    }
  }))

export default ChatMessage;