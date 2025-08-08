import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import {createOrderedMap} from '@ui-schema/ui-schema/createMap'
import {WidgetEngine} from '@ui-schema/react/WidgetEngine'
import {storeUpdater} from '@ui-schema/react/storeUpdater'
import {UIStoreProvider, createStore} from '@ui-schema/react/UIStore'
import {GridContainer} from '@ui-schema/ds-material/GridContainer'
import {useImmutable} from '@ui-schema/react/Utils/useImmutable';

const schema1 = {
    type: 'object',
    title: 'headline',
    properties: {
        call_count: {
            type: 'number',
            minimum: 2,
            maximum: 10,
            view: {
                sizeMd: 3,
            },
        },
        privacy: {
            type: 'boolean',
            default: true,
            view: {
                sizeMd: 12,
            },
        },
        spam: {
            type: 'boolean',
            view: {
                sizeMd: 12,
            },
        },
        accepted: {
            type: 'boolean',
            view: {
                sizeMd: 12,
            },
        },
        type: {
            type: 'string',
            widget: 'Select',
            default: 'customer',
            view: {
                sizeMd: 3,
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
        'type',
    ],
};

const LocalStorageForm = () => {
    const [store, setStore] = React.useState(() => {
        let data = false;
        try {
            data = JSON.parse(window.localStorage.getItem('user_settings'));
        } catch(e) {
            // not existing user_settings
        }
        return createStore(createOrderedMap(typeof data === 'object' ? data : {}))
    });
    const [schema/*, setSchema */] = React.useState(createOrderedMap(schema1));

    const onChange = React.useCallback((actions) => {
        setStore(prevStore => {
            const newStore = storeUpdater(actions)(prevStore)
            return newStore
        })
    }, [setStore])

    // this hook ensures the `latestValues` stays stable and the effect isn't triggered unnecessarily
    const latestValues = useImmutable(store.getValues())

    React.useEffect(() => {
        // if using a big schema this can be performance problematic!
        // if using strings, throttle the `toJS` operation!
        window.localStorage.setItem('user_settings', JSON.stringify(latestValues.toJS()));
    }, [latestValues])

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity
        >
            <GridContainer>
                <WidgetEngine isRoot schema={schema}/>
            </GridContainer>
            {/*
                add children that should be under the schema editor,
                they can use the UIStoreContext and UIConfigContext
            */}
        </UIStoreProvider>

        <Typography component={'p'} variant={'body1'} style={{marginTop: 24, marginBottom: 24}}>
            This form saves the values onChange in the browsers <code>localStorage</code> and restores it at component mount, code in <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/components/LocalStorageForm.js'}>src/components/LocalStorageForm.js</Link>
        </Typography>
    </React.Fragment>;
};

export default LocalStorageForm;
