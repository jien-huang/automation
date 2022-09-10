import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import useFetch from 'use-http';
import { DATA_TYPE } from '../utils/Constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function TestTree({ parentCallback }) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const { get, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
    const [tree, setTree] = useState();

    useEffect(() => {
        // console.log(response)
        if (error) {
            enqueueSnackbar('Error Happen! Code:' + response.status + ' Message: ' + error.message, { variant: 'error' });
        }
    }, [error, response]);

    useEffect(() => {
        loadTreeData();
    }, []);

    async function loadTreeData() {
        const data = await get("/v1/tests");
        if (response.ok) {
            setTree(data);
        }
    }

    const renderTree = (nodes) => (
        // Don't render it before whole system working !!!
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => selectTreeNode(nodes)}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    const selectTreeNode = (nodes) => {
        if (nodes.type !== DATA_TYPE.FOLDER && nodes.type !== DATA_TYPE.ROOT) {
            parentCallback(nodes);
        }
    }

    const handleTreeReload = () => {
        loadTreeData();
      };

    return (
        <div className={classes.content}>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <IconButton onClick={handleTreeReload}>
                <RefreshIcon />
            </IconButton>
            <Divider />
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {tree && renderTree(tree)}
            </TreeView>
        </div>
    )
}
