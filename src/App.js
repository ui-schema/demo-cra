import React from 'react';
import './App.css';
import {Typography, Button, Paper, Container} from "@material-ui/core";
import DemoEditor from "./Schema/DemoEditor";
import UserSettings from "./Schema/UserSettings";
import NavProject from "./component/NavProject";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {PageNotFound} from "./component/PageNotFound";

function PageMain() {
    const [showSettings, setShowSettings] = React.useState(false);
    return (
        <div className="App">
            <header className="App-header">
                <Typography component={'h1'} variant={'h6'}>
                    UI-Schema + Material-UI Example
                </Typography>
            </header>
            <Container className="App-main" maxWidth={'md'} fixed>
                <Paper style={{margin: 12, padding: 24}}>
                    <DemoEditor/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    <NavProject/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    {showSettings ? <UserSettings/> : null}
                    <Button variant={'contained'} onClick={() => setShowSettings(c => !c)}>
                        {showSettings ? 'Hide' : 'Show'} User Settings
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}

function App() {
    return <Router>
        <Switch>
            <Route path="/" exact component={PageMain}/>
            <Route path="/" component={PageNotFound}/>
        </Switch>
    </Router>
}

export default App;
