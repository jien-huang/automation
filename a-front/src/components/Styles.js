import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    menuButtonText: {
        color: 'black'
    },
    footer: {
        padding: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        color: 'grey',
        alignItems: 'center',
        height: '5px',
        clear: 'both',
        position: 'fixed',
        bottom: 0,
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    scrollUpIcon: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        height: 40
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    divider: {
        height: 28,
        margin: 4,
    },
    inline: {
        display: 'flex',
        whiteSpace: 'nowrap',
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        whiteSpace: 'nowrap',
        margin: theme.spacing(1),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    // drawerPaper: {
    //     position: 'relative',
    //     whiteSpace: 'nowrap',
    //     width: drawerWidth,
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    // content: {
    //     flexGrow: 1,
    //     // height: '100vh',
    //     overflow: 'auto',
    // },
    content: {
        flexGrow: 1,
        overflow: 'auto',
        // padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        flexFlow: 1,
        overflow: 'auto',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    plainPaper: {
        flexGrow: 1,
        padding: theme.spacing(1),
        overflow: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
