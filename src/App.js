import React from 'react';
import './App.css';
import {Typography, Button, Paper} from "@material-ui/core";
import DemoEditor from "./Schema/DemoEditor";
import UserSettings from "./Schema/UserSettings";
import ProjectLinks from "./ProjectLinks";

function App() {
    const [showSettings, setShowSettings] = React.useState(false);
    return (
        <div className="App">
            <header className="App-header">
                <Typography component={'h1'} variant={'h4'}>
                    UI-Schema w/ Material-UI Example
                </Typography>
            </header>
            <main className="App-main">
                <Paper style={{margin: 12, padding: 24}}>
                    <DemoEditor/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    <ProjectLinks/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    {showSettings ? <UserSettings/> : null}
                    <Button variant={'contained'} onClick={() => setShowSettings(c => !c)}>
                        {showSettings ? 'Hide' : 'Show'} User Settings
                    </Button>
                </Paper>
            </main>
        </div>
    );
}

export default App;
