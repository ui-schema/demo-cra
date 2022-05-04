import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import {createOrderedMap} from '@ui-schema/ui-schema/Utils/createMap'
import {UIStoreProvider, createStore} from '@ui-schema/ui-schema/UIStore'
import {storeUpdater} from '@ui-schema/ui-schema/storeUpdater'
import {injectPluginStack} from '@ui-schema/ui-schema';
import {GridContainer} from '@ui-schema/ds-material/GridContainer';

const schema1 = {
    type: "object",
    title: "headline",
    properties: {
        call_count: {
            type: "number",
            minimum: 2,
            maximum: 10,
            view: {
                sizeMd: 3
            }
        },
        privacy: {
            type: "boolean",
            default: true,
            view: {
                sizeMd: 12
            }
        },
        spam: {
            type: "boolean",
            view: {
                sizeMd: 12
            }
        },
        accepted: {
            type: "boolean",
            view: {
                sizeMd: 12
            }
        },
        type: {
            type: "string",
            widget: "Select",
            default: "customer",
            view: {
                sizeMd: 3
            },
            enum: [
                'customer',
                'supplier',
                'buyer',
                'business',
                'partner',
            ],
        },
    },
    required: [
        'call_count',
        'type'
    ]
};

const GridStack = injectPluginStack(GridContainer)
const UserSettings = () => {
    const [store, setStore] = React.useState(() => {
        let data = false;
        try {
            data = JSON.parse(window.localStorage.getItem('user_settings'));
        } catch(e) {
            // not existing user_settings
        }
        return createStore(createOrderedMap(typeof data === 'object' ? data : {}))
    });
    const [schema,/* setSchema */] = React.useState(createOrderedMap(schema1));

    const onChange = React.useCallback((actions) => {
        setStore(prevStore => {
            const newStore = storeUpdater(actions)(prevStore)

            // if using a big schema this can be performance problematic!
            // if using strings, throttle the `toJS` operation!
            window.localStorage.setItem('user_settings', JSON.stringify(newStore.getValues().toJS()));

            return newStore
        })
    }, [setStore])

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity
        >
            <GridStack isRoot schema={schema}/>
            {/*
                add children that should be under the schema editor,
                they can use the UIStoreContext and UIConfigContext
            */}
        </UIStoreProvider>

        <Typography component={'p'} variant={'body1'} style={{marginTop: 24, marginBottom: 24}}>
            This form saves the values onChange in the browsers <code>localStorage</code> and restores it at component mount, code in <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/Schema/UserSettings.js'}>src/Schema/UserSettings.js</Link>
        </Typography>
    </React.Fragment>;
};

export default UserSettings;
