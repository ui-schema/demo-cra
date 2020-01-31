import React from 'react';
import './App.css';
import {Link, Typography, Button, Paper} from "@material-ui/core";
import DemoEditor from "./Schema/DemoEditor";
import UserSettings from "./Schema/UserSettings";
import GithubLogo from "./GithubLogo";

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
                    <Typography component={'p'} variant={'body1'}>
                        <span role={'img'} aria-label={'Quick Evaluate'}>🚀</span> <Link href={'https://repl.it/@elbakerino/ui-schema-cra'}>Live Editor on repl.it</Link>
                    </Typography>
                    <hr style={{opacity: 0.2}}/>
                    <Typography component={'p'} variant={'body1'}>
                        <span role={'img'} aria-label={'Documentation'}>📖</span> <Link href={'https://github.com/ui-schema/ui-schema/blob/master/README.md'}>Documentation, Current Status</Link>
                    </Typography>
                    <hr style={{opacity: 0.2}}/>
                    <Typography component={'p'} variant={'body1'}>
                        <GithubLogo/> Demo Repository: <Link href={'https://github.com/ui-schema/demo-cra'}>ui-schema/demo-cra</Link>
                    </Typography>
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
