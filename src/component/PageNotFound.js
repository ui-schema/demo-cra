import {Container, Paper, Typography} from "@material-ui/core";
import NavProject from "./NavProject";
import React from "react";

function PageNotFound() {
    return (
        <div className="App">
            <header className="App-header">
                <Typography component={'h1'} variant={'h6'}>
                    404 Not Found
                </Typography>
            </header>
            <Container className="App-main" maxWidth={'md'} fixed>
                <Paper style={{margin: 12, padding: 24}}>
                    <NavProject/>
                </Paper>
            </Container>
        </div>
    );
}

export {PageNotFound}
