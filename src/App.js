import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import DemoEditor from './Schema/DemoEditor';
import UserSettings from './Schema/UserSettings';
import NavProject from './component/NavProject';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import {PageNotFound} from './component/PageNotFound';
import {themeLight} from './theme';

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
    return <StyledEngineProvider>
        <ThemeProvider theme={themeLight}>
            <CssBaseline/>
            <Router>
                <Routes>
                    <Route path="/" exact element={<PageMain/>}/>
                    <Route path="/" element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    </StyledEngineProvider>
}

export default App;
