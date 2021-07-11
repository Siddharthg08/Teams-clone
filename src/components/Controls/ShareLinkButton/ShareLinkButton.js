import React,{useState, useEffect} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import config from '../../../config';
import {useParams} from 'react-router-dom';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useSymblContext from "../../../hooks/useSymblContext/useSymblContext";

const useStyles = makeStyles((theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
        },
    })
);
export default function ShareLinkButton() {
    const classes = useStyles();
    const {room} = useVideoContext();
    const urlArray = window.location.pathname.split('/');
    var url = window.location.origin + '/' ;

    return (  
    <CopyToClipboard text={url}>
        <Tooltip title={'Copy Link'}     placement="top"
                 PopperProps={{disablePortal: true}}>
            <Fab className={classes.fab} style={{backgroundColor: 'blue', color: 'white'}}>
                <FileCopyIcon/>
            </Fab>
        </Tooltip>
        </CopyToClipboard>
    );
}
// onClick={() => window.open(`localhost:3000/room/${URLRoomName}`)}