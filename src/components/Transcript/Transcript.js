import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TranscriptItem from "./TranscriptItem/TranscriptItem";
import useSymblContext from "../../hooks/useSymblContext/useSymblContext";
import padStart from "lodash-es/padStart";
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import {auth} from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import ChatVideo from '../Controls/ChatVideo/ChatVideo';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        overflow: 'auto',
        minWidth: '140px',
        height: '95vh',
        // maxWidth: '300px',
        width: '38vw',
        border: 'none',
        borderRadius: 0,
        position: 'absolute',
        top:'0',
        background: 'rgb(0, 0, 0, 0)',
        right: 0,
        zIndex: 1500,
        minHeight: '100vh'
    },
    transcriptContainer: {
        overflowY: "auto",
        height: "100%"
    },
    item: {
        display: "flex",
        alignItems: "center",
        margin: "0 10px"
    },
    avatarContainer: {
        margin: 10,
    },
    p: {
        margin: "5px 0",
        fontSize: 14
    },
    avatar: {
        backgroundColor: red[500],
    },
    transcriptsHeader: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
        position: "absolute",
    },


}));

export function TranscriptElement(props, {onSave, width, height, editable = false, transcriptItems}) {

    const classes = useStyles();
    const w = width;
    const h = height;

    const [containerRef, setContainerRef] = useState(null);

    useEffect(() => {
        if (!containerRef) {
            setContainerRef(React.createRef());
        }
    }, [containerRef]);

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [transcriptItems, width, height, containerRef])
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    

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
        
//  <Grid container style={{width: w}} className={classes.root}>
//             <Paper id={"transcript-paper"} className={classes.mainContainer}
//                    variant={"outlined"}>
<>


                    <div className={classes.mainContainer}>
              
                        {/* <div className={classes.transcriptsHeader}></div> */}
                     {/* <Tooltip onClick={()=>{setShowChat(!showChat)}} title={'Chat'}  placement="top"
                 PopperProps={{disablePortal: true}}>
            <Fab className={classes.fab} style={{backgroundColor: 'grey', color: 'white'}}>
                <ChatIcon/>
            </Fab>
        </Tooltip> */}
                 { <ChatEngine
                            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                            userName={user.email}
                            userSecret={user.uid}
                            height="calc(100vh-66px)"
                            
                        />}
                                {/* <ChatEngine
                                height="calc(100vh-66px)"
                                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                                userName={user.email}
                                userSecret={user.uid}
                                /> */}
                                </div>
                
           </>
                // </Paper>
                // </Grid>
    );
}

const convertMessageToTranscriptItem = (message, startedTime) => {
    if (message) {
        const text = message.text || message.payload.content;
        let timeDiff = {};
        if (message.duration && message.duration.startTime) {
            const messageTime = moment(message.duration.startTime);
            let diff = moment.duration(messageTime.diff(startedTime));
            timeDiff = {
                hours: padStart(diff.hours().toString(), 2, '0'),
                minutes: padStart(diff.minutes().toString(), 2, '0'),
                seconds: padStart(diff.seconds().toString(), 2, '0'),
            };
        }
        const from = message.from;

        return {
            text,
            timeDiff,
            from
        }
    }
}

export default function Transcript({ height }) {
    const {newMessages, startedTime} = useSymblContext()

    let [transcriptItems, setTranscriptItems] = useState([]);

    useEffect(() => {
        if (newMessages && newMessages.length > 0) {
            const newTranscriptItems = newMessages.map(message => convertMessageToTranscriptItem(message, startedTime));
            setTranscriptItems([...transcriptItems, ...newTranscriptItems]);
        }
    }, [newMessages]);

    return <TranscriptElement transcriptItems={transcriptItems} height={height}/>

}