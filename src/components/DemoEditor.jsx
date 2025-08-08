import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import IcRefresh from '@mui/icons-material/Refresh'
import {createOrderedMap} from '@ui-schema/ui-schema/createMap'
import {WidgetEngine} from '@ui-schema/react/WidgetEngine'
import {storeUpdater} from '@ui-schema/react/storeUpdater'
import {UIStoreProvider, createStore} from '@ui-schema/react/UIStore'
import {GridContainer} from '@ui-schema/ds-material/GridContainer'
import {isInvalid} from '@ui-schema/react/isInvalid'

const schema1 = {
    type: 'object',
    title: 'headline',
    properties: {
        headline: {
            type: 'string',
            view: {
                sizeXs: 6,
                sizeSm: 6,
                sizeMd: 6,
                sizeLg: 6,
                sizeLx: 6,
            },
        },
        qty: {
            type: 'number',
            minimum: 2,
            maximum: 15,
            view: {
                sizeMd: 3,
            },
        },
        length: {
            type: 'number',
            multipleOf: 2,
            view: {
                sizeMd: 3,
            },
        },
        text: {
            type: 'string',
            widget: 'Text',
            view: {
                sizeMd: 6,
            },
        },
        usaPhone: {
            type: 'string',
            // only valid for: (888)555-1212 or 555-1212
            pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
            view: {
                sizeMd: 3,
            },
        },
        style: {
            type: 'object',
            view: {
                sizeMd: 3,
            },
            properties: {
                center_items: {
                    type: 'boolean',
                    default: true,
                    view: {
                        sizeMd: 12,
                    },
                },
                center_item_content: {
                    type: 'boolean',
                    view: {
                        sizeMd: 12,
                    },
                },
            },
            required: [
                'center_item_content',
            ],
        },
        // todo: `@ui-schema/material-richtext` was removed before 0.3.0-beta - as DraftJS is abandoned and is not compatible with immutable v4
        /*rich_text: {
            type: "string",
            widget: "RichText",
            view: {
                sizeMd: 12,
            }
        },*/
        layouts: {
            type: 'array',
            widget: 'OptionsCheck',
            view: {
                sizeMd: 3,
            },
            items: {
                oneOf: [
                    {
                        const: 'sidebar_left',
                        t: {
                            de: {
                                title: 'Linke Sidebar',
                            },
                            en: {
                                title: 'Left Sidebar',
                            },
                        },
                    }, {
                        const: 'sidebar_right',
                    }, {
                        const: 'notice',
                    }, {
                        const: 'content',
                    }, {
                        const: 'footer',
                    },
                ],
            },
            default: [
                'sidebar_left',
            ],
        },
        sizeDef: {
            type: 'string',
            widget: 'OptionsRadio',
            default: 'middle',
            view: {
                sizeMd: 3,
            },
            enum: [
                'small',
                'middle',
                'big',
            ],
        },
        age: {
            type: 'string',
            widget: 'Select',
            //default: "adult",
            view: {
                sizeMd: 3,
            },
            enum: [
                'child',
                'teen',
                'adult',
                '50plus',
            ],
        },
    },
    required: [
        'layouts',
        'size',
    ],
}

const data1 = {
    stepper: {'step-1': {name: 'Max'}},
    headline: 'Some Demo Content Headline',
}

const AppEditor = () => {
    const [showValidity, setShowValidity] = React.useState(false)
    const [store, setStore] = React.useState(() => createStore(createOrderedMap(data1)))
    const [schema, setSchema] = React.useState(() => createOrderedMap(schema1))

    React.useEffect(() => {
        // simulating getting `schema` and `data` from an API
        /*setTimeout(() => {
            setStore(createStore(createOrderedMap(data1)));
            setSchema(createOrderedMap(schema1));
        }, 1200);*/
    }, [setStore, setSchema])

    const onChange = React.useCallback((actions) => {
        setStore(storeUpdater(actions))
    }, [setStore])

    if(!store || !schema) return <div style={{textAlign: 'center', margin: '75px 0'}}>
        <IcRefresh className={'refresh-spin'} fontSize={'large'}/>
        <p>Loading Schema & Data</p>
    </div>

    const invalid = isInvalid(store.getValidity())

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity={showValidity}
        >
            <GridContainer>
                <WidgetEngine isRoot schema={schema}/>
            </GridContainer>
            {/*
                add children that should be under the schema editor,
                they can use the UIStoreContext and UIConfigContext
            */}
        </UIStoreProvider>

        <Box mt={2} mb={1} sx={{display: 'flex'}}>
            <Typography
                variant={'body2'}
                sx={{
                    backgroundColor: invalid ? 'error.main' : 'success.main',
                    color: invalid ? 'error.contrastText' : 'success.contrastText',
                    p: 1,
                    borderRadius: 3,
                }}
            >{invalid ? 'Form is invalid.' : 'Form is valid.'}</Typography>
        </Box>

        <Button
            style={{marginTop: 24}}
            onClick={() => {
                console.log('data-store: ', store.getValues() ? store.getValues().toJS() : undefined)
                console.log('is-invalid: ', !!invalid)
                isInvalid(store.getValidity()) ?
                    setShowValidity(true) :
                    console.log('should do some action here')
            }}
            variant={'contained'}
        >send!</Button>

        <Typography component={'p'} variant={'body1'} style={{marginTop: 24}}>
            See <code>console.log</code> after clicking on <code>SEND!</code>
        </Typography>
        <hr style={{opacity: 0.2}}/>
        <Typography component={'p'} variant={'body1'}>
            Code of this form/schema: <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/components/DemoEditor.jsx'}>src/components/DemoEditor.jsx</Link>
        </Typography>
    </React.Fragment>
}

export default AppEditor
