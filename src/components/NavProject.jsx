import React from 'react';
import GitHubLogo from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const NavProject = () => <>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'rocket'}>🚀</span>{' '}
        <Link href={'https://codesandbox.io/s/github/ui-schema/demo-cra/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FApp.jsx'}>Run on CodeSandbox</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'rocket'}>🚀</span>{' '}
        <Link href={'https://stackblitz.com/github/ui-schema/demo-cra'}>Run on Stackblitz</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <GitHubLogo fontSize={'small'}/> <Link href={'https://github.com/ui-schema/demo-cra'}>Source of this demo</Link>
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
        <GitHubLogo fontSize={'small'}/> <Link href={'https://github.com/ui-schema/ui-schema'}>Project, Issues</Link>
    </Typography>
</>;

export default NavProject
