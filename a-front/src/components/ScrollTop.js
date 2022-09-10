import React, {useState} from 'react';
import {useStyles} from './Styles';
import Icon from '@mui/material/Icon';


const triggerPx = 100; // when you scroll down this number of pixels, then the scroll up button show

const ScrollTop = () => {
    const classes = useStyles();
    const [ show, setShow] = useState(false);

    const checkScrollTop = () => {
        var sTop=document.body.scrollTop || document.documentElement.scrollTop;
        if (!show && sTop > triggerPx) {
            setShow(true);
        } else if (show && sTop <= triggerPx) {
            setShow(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({top:0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <div>
            <Icon  className={classes.scrollUpIcon} onClick={scrollToTop} style={{display: show ? 'flex' : 'none'}}>
                arrow_upward
            </Icon>
        </div>
    );
};

export default ScrollTop;