import ReactMarkdown from "react-markdown";
import {Link, Typography} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import {Link as InternalLink} from './Link'
import React from "react";

// see: https://github.com/rexxars/react-markdown#node-types
const renderers = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body2'} gutterBottom/>,
    heading: ({level, ...p}) => <Typography {...p} component={'h' + (level + 1)} variant={'subtitle' + (level)} style={{textDecoration: 'underline'}} gutterBottom/>,
    list: p => p.ordered ? <ol style={{margin: '10px'}}>{p.children}</ol> : <ul style={{margin: '10px 0'}}>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body2'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal'}}>{p.children}</span></Typography>,
    link: p => -1 === p.href.indexOf('https://') ?
        <InternalLink to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}>
            {p.children}
            <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(-2px,4px)'}}/>
        </Link>,
};

const Markdown = ({source}) => <ReactMarkdown source={source} renderers={renderers}/>;

export {Markdown}
