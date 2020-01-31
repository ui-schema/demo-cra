import React from "react";
import GithubLogo from "./GithubLogo";
import {Link, Typography} from "@material-ui/core";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Quick Evaluate'}>🚀</span> <Link href={'https://repl.it/@elbakerino/ui-schema-cra'}>Live Editor on repl.it</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo/> <Link href={'https://github.com/ui-schema/demo-cra'}>Source of this demo</Link>
    </Typography>
    <hr style={{opacity: 0.2}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Documentation'}>📖</span> <Link href={'https://github.com/ui-schema/ui-schema/blob/master/README.md'}>Documentation, Current Status</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo/> <Link href={'https://github.com/ui-schema/ui-schema'}>Project, Issues</Link>
    </Typography>
</React.Fragment>;
