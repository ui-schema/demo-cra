import React from 'react';
import {
    Link as RouterLink
} from "react-router-dom";
import MuiLink from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIc from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/core";

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
