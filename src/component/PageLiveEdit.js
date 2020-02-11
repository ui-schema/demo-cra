import React from "react";
import {Typography} from "@material-ui/core";
import LiveEditor from '../Schema/LiveEditor'
import {Link} from "./Link";
import {dataMain, schemaMain} from "../schemas/demoMain";
import {dataStepper, schemaStepper} from "../schemas/demoStepper";
import {
    schemaCombining, dataCombining,
    schemaCombiningConditional, dataCombiningConditional,
} from "../schemas/demoCombining";
import {dataConditional, dataConditionalAllOf, schemaConditional, schemaConditionalAllOf} from "../schemas/demoConditional";
import {dataDependencies, dataDependenciesBooleans, schemaDependencies, schemaDependenciesBooleans} from "../schemas/demoDependencies";

const schemas = [
    ['Main Demo', schemaMain, dataMain],
    ['Stepper', schemaStepper, dataStepper],
    ['Combination Simple', schemaCombining, dataCombining],
    ['Combination with Conditional', schemaCombiningConditional, dataCombiningConditional],
    ['Conditional Simple', schemaConditional, dataConditional],
    ['Conditional allOf', schemaConditionalAllOf, dataConditionalAllOf],
    ['Dependencies', schemaDependencies, dataDependencies],
    ['Dependencies Booleans', schemaDependenciesBooleans, dataDependenciesBooleans],
];

function PageLiveEdit() {
    return (
        <div className="App">
            <header className="App-header" style={{position: 'relative'}}>
                <Link to={'/'}
                      primary={<span role={'img'} style={{fontSize: '1.25rem', display: 'flex', marginLeft: 4}} aria-label={'Home Icon'}>🏠</span>}
                      style={{display: 'inline-block', position: 'absolute', left: 0}}/>
                <Typography component={'h1'} variant={'h6'}>
                    UI-Schema Live-Editor
                </Typography>
            </header>

            <LiveEditor schemas={schemas}/>
        </div>
    );
}

export default PageLiveEdit
