import {Typography} from "@material-ui/core";
import {Link} from "./Link";
import React from "react";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Home Icon'}>🏠</span> <Link to={'/'} primary={'Home'} style={{display: 'inline-block'}}/>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Live Icon'}>🔴</span> <Link to={'/examples'} primary={'Live-Editor + Examples'} style={{display: 'inline-block'}}/>
    </Typography>
</React.Fragment>;
