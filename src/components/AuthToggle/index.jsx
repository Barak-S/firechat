import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { colors } from '../../assets/colors';
import { AiOutlinePoweroff } from 'react-icons/ai';

const AuthToggle = ({ auth, setToggleSignIn }) => {
    const classes = useStyles()

    const handleAuthToggle = () => {
        if (auth.currentUser){
            auth.signOut()
        } else {
            setToggleSignIn(true)
        }
    }
    return (
        <Button 
            className={classes.signOutBtn} 
            onClick={() => handleAuthToggle()}
            endIcon={<AiOutlinePoweroff size={20} />}
        >
            {auth.currentUser ? 'Sign Out' : 'Sign In'}
        </Button>
    )
  }

  const useStyles = makeStyles(theme => ({
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

  export default AuthToggle