import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useStyles} from './Styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Config () {
    const classes = useStyles();
    const [items, SetItems] = useState();
    const [loading,setLoading] = useState(false)
    const [request, setRequest] = useState({url: undefined, info: undefined})
    useItems(request)

    function useItems(request) {
        useEffect(()=> {
            if(!request || !request.url || !request.info) {
                return;
            }
            setLoading(true)
            fetch(request.url, request.info).then(
                response => {
                    const statusCode = response.status;
                    var data = response.json();
                    }
                    if (statusCode >= 400) {
                        // replace this with global popup
                        console.error('Error status: ' + statusCode + ' Message: ' + response.statusText);
                    }
                    return Promise.all([statusCode, data]);
                }
            ).then(([statusCode, data])=> {
                handleRequest(statusCode, data);
            }).catch((error)=>{
                console.error('Error: ' + error)
            }).finally(()=>{
                setLoading(false)
            })
        }, [request])
    }

    function handleRequest(statusCode, response) {
        if(statusCode < 400) {
            if(response) {
                setItems(response)
            } else {
                setItems([...Items, {response}])
            }
        }
    }


    return (
        <div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
              </Backdrop>
        </div>
    )
}