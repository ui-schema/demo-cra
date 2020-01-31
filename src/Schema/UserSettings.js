import React from 'react';
import {SchemaEditor, createMap, createOrderedMap} from "@ui-schema/ui-schema";
import {widgets} from "@ui-schema/ds-material";
import {Link, Typography} from "@material-ui/core";

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

const UserSettings = () => {
    const [validity, setValidity] = React.useState(createMap());
    const [data, setData] = React.useState(() => {
        let data1 = false;
        try {
            data1 = JSON.parse(window.localStorage.getItem('user_settings'));
        } catch(e) {
            // not existing user_settings
        }
        return createOrderedMap(data1 || {})
    });
    const [schema,/* setSchema */] = React.useState(createOrderedMap(schema1));

    const onChange = React.useCallback((handler) => {
        const newData = handler(data);

        // if using a big schema this can be performance problematic!
        // if using strings, throttle the `toJS` operation!
        window.localStorage.setItem('user_settings', JSON.stringify(newData.toJS()));
        setData(newData);

        return newData;
    }, [data, setData]);

    // todo: with dep `data` the callback would be re-created every time
    //       leading to everything re-renders, that's performance problematic

    return <React.Fragment>
        <SchemaEditor
            schema={schema}
            store={data}
            onChange={onChange}
            widgets={widgets}
            validity={validity}
            showValidity={true}
            onValidity={setValidity}
        >
            {/*
                add children that should be under the schema editor,
                they can use the context of the editor for working
            */}
        </SchemaEditor>

        <Typography component={'p'} variant={'body1'} style={{marginTop: 24, marginBottom: 24}}>
            This form saves the values onChange in the browsers <code>localStorage</code> and restores it at component mount, code in <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/Schema/UserSettings.js'}>src/Schema/UserSettings.js</Link>
        </Typography>
    </React.Fragment>;
};

export default UserSettings;
