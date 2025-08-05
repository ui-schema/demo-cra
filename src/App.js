import React from 'react'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import DemoEditor from './Schema/DemoEditor'
import UserSettings from './Schema/UserSettings'
import NavProject from './component/NavProject'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import {PageNotFound} from './component/PageNotFound';
import {themeLight} from './theme';
import {bindingComponents} from '@ui-schema/ds-material/Binding/Components'
import {widgetsDefault} from '@ui-schema/ds-material/Binding/WidgetsDefault'
import {widgetsExtended} from '@ui-schema/ds-material/Binding/WidgetsExtended'
import {UIMetaProvider} from '@ui-schema/react/UIMeta'
import {browserT} from './t';
import {DefaultHandler, ValidityReporter} from '@ui-schema/react';
import {schemaPluginsAdapterBuilder} from '@ui-schema/react/SchemaPluginsAdapter';
import {requiredPlugin, requiredValidatorLegacy, standardValidators, Validator, validatorPlugin} from '@ui-schema/json-schema';
import {SchemaGridHandler} from '@ui-schema/ds-material/Grid';

/**
 *
 * @type {import('@ui-schema/ds-material/Binding').MuiBinding}
 */
const customBinding = {
    ...bindingComponents,
    widgetPlugins: [
        DefaultHandler,
        schemaPluginsAdapterBuilder([
            validatorPlugin,
            requiredPlugin,
        ]),
        SchemaGridHandler, // use `import {GridItemPlugin} from '@ui-schema/ds-material/GridItemPlugin'` for MUI v7
        ValidityReporter,
    ],
    widgets: {
        ...widgetsDefault,
        ...widgetsExtended,
    },
}

const validator = Validator([
    ...standardValidators,
    requiredValidatorLegacy,
])

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
            <UIMetaProvider
                binding={customBinding}
                t={browserT}
                validate={validator.validate}
            >
                <Router>
                    <Routes>
                        <Route path="/" exact element={<PageMain/>}/>
                        <Route path="/" element={<PageNotFound/>}/>
                    </Routes>
                </Router>
            </UIMetaProvider>
        </ThemeProvider>
    </StyledEngineProvider>
}

export default App;
