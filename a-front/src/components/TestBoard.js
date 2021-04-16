import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';

export function TestBoard(props) {
    

    return (
        <pre>{JSON.stringify(props.info, null, 2)}</pre>
    )
}