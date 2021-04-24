import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import TreeView from '@material-ui/lab/TreeView';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import RefreshIcon from '@material-ui/icons/Refresh';
import useFetch from 'use-http';
import { DATA_TYPE } from '../utils/Constants';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

export default function TestTree({ parentCallback }) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
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
