import React from 'react';
import {
    Link as RouterLink
} from "react-router-dom";
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIc from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {makeStyles} from "@mui/material";

const useListItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.type === 'dark' ? theme.palette.primary.main : 'inherit',
    },
}));

const ListItemIcon = props => {
    const classes = useListItemStyles();
    return <ListItemIc classes={classes} {...props}/>;
};

function ListItemLink({icon, primary, to}) {

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) =>
            <RouterLink to={to} ref={ref} {...itemProps} />
        ),
        [to],
    );

    return (<ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary}/>
    </ListItem>);
}

const LinkList = ({children}) => {
    return <List component="nav" aria-label="main mailbox folders">{children}</List>
};

const Link = ({primary, ...props}) => <MuiLink component={RouterLink} {...props} children={primary}/>;

export {LinkList, ListItemLink, Link}
