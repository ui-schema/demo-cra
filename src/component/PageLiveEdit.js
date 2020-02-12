import React from "react";
import {Typography} from "@material-ui/core";
import LiveEditor from '../Schema/LiveEditor'
import {Link} from "./Link";
import {dataMain, dataUser, schemaMain, schemaUser} from "../schemas/demoMain";
import {dataStepper, schemaStepper} from "../schemas/demoStepper";
import {
    schemaCombining, dataCombining,
    schemaCombiningConditional, dataCombiningConditional,
} from "../schemas/demoCombining";
import {dataConditional, dataConditionalAllOf, schemaConditional, schemaConditionalAllOf} from "../schemas/demoConditional";
import {dataDependencies, dataDependenciesBooleans, schemaDependencies, schemaDependenciesBooleans} from "../schemas/demoDependencies";

const schemas = [
    ['Main Demo', schemaMain, dataMain, `
# Big Simple Example

This example illustrates a bigger schema.

Including native-objects, native-types and Widgets.

- [Native Types Example](/examples/Simple-Demo)
- [Stepper Example](/examples/Stepper)
- [📚 Native Types](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/Schema.md#types)
- [📚 Widgets](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/Widgets.md)
- [📚 Design-System Bindings](https://github.com/ui-schema/ui-schema/blob/master/README.md#design-systems)
`],
    ['Simple Demo', schemaUser, dataUser, `
# Simple Example

This example illustrates a small schema.

Including native-objects and native-types.

- native-objects are great for nesting/grouping
- each can receive it's own [view](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/Schema.md#view-keyword) settings to build responsive grids    
- specify \`type\` and add other keywords which may influence the behaviour

**Try out** the \`seats\` field only allows a \`maximum\` of 5 seats, uses a \`default\` and a \`minimum\`
`],
    ['Stepper', schemaStepper, dataStepper, `
# Stepper / Sequential Example

A stepper is a widget that renders a sub-schema after another, it is only possible to enter the next if the current is validated.

- each property of a stepper is used as a step
- validation of whole stepper is completed after all steps have been rendered
- creates an object out of all
- the stepper controls it's own \`showValidity\`, this overwrites an existing \`false\` to \`true\`
  - this highlights only the invalid of the stepper, not the containing schema
  - if the containing schema should display invalidity, the stepper will do it also
  - it reset's it's own \`showValidity\` on switching steps 

Custom widgets like steppers are defined per [design-system](https://github.com/ui-schema/ui-schema/blob/master/README.md#design-systems) 
`],
    ['Combination Simple', schemaCombining, dataCombining, `
# Combining Example Simple

Combining sub-schemas is possible with [allOf](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/WidgetPlugins.md#combininghandler), this example shows a combination of multiple simple sub-schemas.

Each defined sub-schema is [merged](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/UISchemaCore.md#mergeschema) together, dynamically creating the schema for the current schema-level.

- \`allOf\` is an \`array\` of any valid schemas 
- nesting of \`allOf\` is possible
- combined into the schema of the current level, if one exists
- [conditional](/examples/Conditional-Simple) sub-schemas are possible

In this example two schemas are applied to the root-schema instance:

1. the first sub-schema describes an address
2. the second describes contact data
3. creating a extended address schema out of both in the root

**Try out** entering data and look in to the data output  - *(maybe this info must be closed to see the data)*
`],
    ['Combination with Conditional', schemaCombiningConditional, dataCombiningConditional, `
# Combination with Conditional Example

Define \`allOf\` combinations of different schemas, these schemas also define combination rules which include conditional schemas.

For each defined sub-schema, it is merged into the active schema, if there is a conditional it is evaluated and also applied.

Each defined \`if/else/then\` get's evaluated separately against the current data.

**Try out** changing \`state\`, the conditions are on line *26*, \`accept\` is an unconditional schema within conditional schemas

**Try out** when 5 or more characters in \`phone\` only north-american numbers are valid: \`(888)555-1212\` or \`555-1212\`

See also [conditional schemas](/examples/Conditional-Simple)
`],
    ['Conditional Simple', schemaConditional, dataConditional, `
# Conditional Simple

A conditional schema enables on-the-fly schema changing based on schema-validation of the current instance.

- \`if\` defines a schema which must be valid
- when valid \`then\` is applied
- when invalid \`else\` is applied when existing
- if no \`if\` exists \`then|else\` have no effect
- if there is something to apply, it is [merged](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/UISchemaCore.md#mergeschema) into the current one
- this doesn't scale well, if you need to have multiple conditions look into [Conditional Multiple](/examples/Conditional-Multiple)

**Try out** changing the \`country\`, for \`canada\` a new number field is added, for others the \`privacy\` is made required
`],
    ['Conditional Multiple', schemaConditionalAllOf, dataConditionalAllOf, `
# Conditional Multiple

Define multiple conditional schemas in an \`allOf\`.  

- each defined \`if/else/then\` get's evaluated separately against the current data.
- if there is a unconditional part in the conditional schema, it is combined normally
- see also [simple condition example](/examples/Conditional-Simple) 

**Try out** changing the \`country\`, a new \`number\` field is applied for \`canada\`, for \`de\` the privacy toggle is made required, for \`usa\` a text-field is applied
`],
    ['Dependencies', schemaDependencies, dataDependencies, `
# Dependencies / Dependant Schemas

Dependencies relate to one property, if this property is a not falsy value, the sub-schema is applied.

Spec. uses 'property exists' where this library checks for 'not-empty' (like [required](https://github.com/ui-schema/ui-schema/blob/master/packages/docs/Schema.md#type-object)) to have a more natural form validation.

**Try out** enter something in the \`credit_card\` field, this requires a new \`billing_address\` text field

[📚 spec](https://json-schema.org/understanding-json-schema/reference/object.html#schema-dependencies)
`],
    ['Dependencies Booleans', schemaDependenciesBooleans, dataDependenciesBooleans, `
# Example Boolean Dependencies

Using \`boolean\` properties as relation for the dependency creates an easy conditional sub-schema.

When the property value changes to \`true\` the dependency is applied.

**Try out** toggling the switches applies a sub-schema with a text field, number field, or makes - if it exists - the number field required
`],
    /*    ['Dependencies Booleans', schemaDependenciesBooleans, dataDependenciesBooleans, `
    This not JSON-Schema standard way enables a property-based switch-case behaviour.

    Define a dependency for the property which's value should be checked, add 'oneOf' with multiple sub-schemas.

    Define the dependency property also in this sub-schema, this part of the schema is not merged into the actual schema.

    - if the dependency validates against one of the sub-schemas, this sub-schema is applied
    - if the first one matches, the others are ignored
    - if the first and second are invalid, and the third is valid, the third is applied, etc.
    `],*/
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
