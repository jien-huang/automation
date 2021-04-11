import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export default function Results() {
  const { enqueueSnackbar } = useSnackbar();
  // setSnack({ message: 'hello', open: true})
  useEffect(() => {
    enqueueSnackbar('I am home now', { variant: 'success' });
    // VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
