import React, { useState } from 'react';
import SnackBar from '@material-ui/core/SnackBar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
export const SnackBarContext = React.createContext({})


export function SnackBarProvider({ children }) {
  // const [alerts, setAlerts] = useState([])
  const [snack, setSnack] = useState({
    message: '',
    color: '',
    open: false,
  });

  // const handleClick = () => {
  //   setSnack({message:'', color: '', open: false});
  // };

  const handleClose = (event) => {
    setSnack({message:'', color: '', open: false});
  };

  return (
    
    <SnackBarContext.Provider value={{ snack, setSnack }}>
      <SnackBar 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snack.open}  autoHideDuration={5000}
      onClose={()=>handleClose()} >
        <SnackbarContent>
        message={snack.message}
        </SnackbarContent>
      </SnackBar>
      {children}
    </SnackBarContext.Provider>
  )
}