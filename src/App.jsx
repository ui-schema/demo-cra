import React from 'react'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import DemoEditor from './components/DemoEditor'
import LocalStorageForm from './components/LocalStorageForm'
import NavProject from './components/NavProject'
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

function AppContents() {
    const [showSettings, setShowSettings] = React.useState(false);
    return (
        <UIMetaProvider
            binding={customBinding}
            t={browserT}
            validate={validator.validate}
        >
            <Container className="App-main" maxWidth={'md'} fixed>
                <Paper style={{margin: 12, padding: 24}}>
                    <DemoEditor/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    <NavProject/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    {showSettings ? <LocalStorageForm/> : null}
                    <Button variant={'contained'} onClick={() => setShowSettings(c => !c)}>
                        {showSettings ? 'Hide' : 'Show'} User Settings
                    </Button>
                </Paper>
            </Container>
        </UIMetaProvider>
    );
}

function App() {
    return <StyledEngineProvider>
        <ThemeProvider theme={themeLight}>
            <CssBaseline/>
            <div className="App">
                <header className="App-header">
                    <Typography component={'h1'} variant={'h6'}>
                        UI-Schema + Material-UI Example
                    </Typography>
                </header>

                <AppContents/>
            </div>
        </ThemeProvider>
    </StyledEngineProvider>
}

export default App;
