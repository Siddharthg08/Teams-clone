import React,{useState, useEffect} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ClosedCaptionIcon from '@material-ui/icons/ClosedCaption';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

const useStyles = makeStyles((theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
        },
    })
);
export default function Captions(props) {
    const classes = useStyles();
    const [showCaptions,setShowCaptions] = useState(false) ;
    
   

    return ( 
        
        <Tooltip onClick={()=>{ setShowCaptions(!showCaptions); props.onChangeShowCaptions(!showCaptions);}} title={'Captions'}  placement="top"
                 PopperProps={{disablePortal: true}} >
            <Fab className={classes.fab} style={{backgroundColor: 'grey', color: 'white'}}>
            {showCaptions ?  <SpeakerNotesIcon /> : <SpeakerNotesOffIcon  />}
            </Fab>
        </Tooltip>
    );
}
