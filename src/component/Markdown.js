import ReactMarkdown from "react-markdown";
import {Link, Typography} from "@material-ui/core";
import React from "react";

// see: https://github.com/rexxars/react-markdown#node-types
const renderers = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body1'} gutterBottom/>,
    heading: ({level, ...p}) => <Typography {...p} component={'h' + (level + 1)} variant={'h' + (level + 4)} gutterBottom/>,
    list: p => p.ordered ? <ol>{p.children}</ol> : <ul>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body1'} children={p.children} gutterBottom/>,
    link: p => <Link {...p} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}/>,
};

const Markdown = ({source}) => <ReactMarkdown source={source} renderers={renderers}/>;

export {Markdown}
