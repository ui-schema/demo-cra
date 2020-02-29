import React from "react";
import GithubLogo from "./GithubLogo";
import {Link, Typography} from "@material-ui/core";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Quick Evaluate CodeSandbox'}>🚀</span>{' '}
        <Link href={'https://codesandbox.io/s/github/ui-schema/demo-cra/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FSchema%2FDemoEditor.js'}>Run on CodeSandbox</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Quick Evaluate Repl.it'}>🚀</span>{' '}
        <Link href={'https://repl.it/@elbakerino/ui-schema-cra'}>Repl.it Run</Link>&nbsp;|&nbsp;
        <Link href={'https://repl.it/github/ui-schema/demo-cra'}>Repl.it Clone</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo/> <Link href={'https://github.com/ui-schema/demo-cra'}>Source of this demo</Link>
    </Typography>
    <hr style={{opacity: 0.2}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Examples'}>📖</span> <Link href={'https://ui-schema.bemit.codes/examples'}>Live-Editor + Examples</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Documentation'}>📖</span> <Link href={'https://ui-schema.bemit.codes'}>Documentation, Widget List</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo/> <Link href={'https://github.com/ui-schema/ui-schema'}>Project, Issues</Link>
    </Typography>
</React.Fragment>;
