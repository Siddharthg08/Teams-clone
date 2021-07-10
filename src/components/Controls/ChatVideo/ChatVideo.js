import React,{useState, useEffect} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import config from '../../../config';
import {useParams} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useSymblContext from "../../../hooks/useSymblContext/useSymblContext";
import ChatIcon from '@material-ui/icons/Chat';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';


const useStyles = makeStyles((theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
        },
    })
);
export default function ChatVideo(props) {
    const classes = useStyles();
    const {room} = useVideoContext();
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [showChat,setShowChat] = useState(false) ;
    
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(()=>{
        if(!user) {
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me/',{
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name":user.email,
                "user-secret":user.uid,
            }
        })
        .then(()=> {
            setLoading(false);
        }). catch(()=> {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);
                
                axios.post('https://api.chatengine.io/users/', 
                formdata,
                {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}}
                )
                    .then(()=> setLoading(false))
                    .catch((error)=> console.log(error)) 
            })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading.....'

    return ( 
        <> 
       {/* { showChat && <ChatEngine
        		projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
         		userName={user.email}
         		userSecret={user.uid}
         		height='10vh'
                
         	/>} */}
        <Tooltip onClick={()=>{ setShowChat(!showChat); props.onChangeShowChat(!showChat)}} title={'Chat'}  placement="top"
                 PopperProps={{disablePortal: true}}>
            <Fab className={classes.fab} style={{backgroundColor: 'grey', color: 'white'}}>
                <ChatIcon/>
            </Fab>
        </Tooltip>
        </>
    );
}
