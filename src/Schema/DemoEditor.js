import React from 'react';
import {Button, Link, Typography} from "@material-ui/core";
import {Refresh} from "@material-ui/icons";
import {SchemaEditor, isInvalid, createMap, createOrderedMap} from "@ui-schema/ui-schema";
import {widgets} from "@ui-schema/ds-material";

const schema1 = {
    type: "object",
    title: "headline",
    properties: {
        stepper: {
            type: "object",
            widget: "Stepper",
            properties: {
                'step-1': {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            minLength: 2,
                            maxLength: 3,
                            view: {
                                sizeMd: 6,
                            }
                        },
                        surname: {
                            type: "string",
                            view: {
                                sizeMd: 6
                            }
                        },
                    },
                    required: [
                        'surname'
                    ]
                },
                'step-2': {
                    type: "object",
                    widget: "Step",
                    properties: {
                        topics: {
                            type: "string",
                            widget: "SelectMulti",
                            view: {
                                sizeMd: 3
                            },
                            enum: [
                                'theater',
                                'crime',
                                'sci-fi',
                                'horror',
                            ],
                        },
                    }
                },
                'step-3': {
                    type: "object",
                    widget: "Step",
                    properties: {
                        accepted: {
                            type: "boolean",
                        },
                    }
                },
            }
        },
        headline: {
            type: "string",
            view: {
                sizeXs: 6,
                sizeSm: 6,
                sizeMd: 6,
                sizeLg: 6,
                sizeLx: 6,
            }
        },
        qty: {
            type: "number",
            minimum: 2,
            maximum: 15,
            view: {
                sizeMd: 3
            }
        },
        length: {
            type: "number",
            multipleOf: 2,
            view: {
                sizeMd: 3
            }
        },
        text: {
            type: "string",
            widget: "Text",
            view: {
                sizeMd: 6,
            }
        },
        usaPhone: {
            type: "string",
            // only valid for: (888)555-1212 or 555-1212
            pattern: "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
            view: {
                sizeMd: 3
            }
        },
        style: {
            type: "object",
            view: {
                sizeMd: 3
            },
            properties: {
                center_items: {
                    type: "boolean",
                    default: true,
                    view: {
                        sizeMd: 12
                    }
                },
                center_item_content: {
                    type: "boolean",
                    view: {
                        sizeMd: 12
                    }
                }
            },
            required: [
                'center_item_content'
            ]
        },
        layouts: {
            type: "array",
            widget: "OptionsCheck",
            view: {
                sizeMd: 3
            },
            enum: [
                'sidebar_left',
                'sidebar_right',
                'notice',
                'content',
                'footer',
            ],
            default: [
                'sidebar_left'
            ],
        },
        sizeDef: {
            type: "string",
            widget: "OptionsRadio",
            default: "middle",
            view: {
                sizeMd: 3
            },
            enum: [
                'small',
                'middle',
                'big',
            ],
        },
        age: {
            type: "string",
            widget: "Select",
            //default: "adult",
            view: {
                sizeMd: 3
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
        'size'
    ]
};

const data1 = {
    stepper: {'step-1': {name: 'Max'}},
    headline: 'Some Demo Content Headline',
};

const Editor = () => {
    const [showValidity, setShowValidity] = React.useState(false);
    const [validity, setValidity] = React.useState(createMap());
    const [data, setData] = React.useState(undefined);
    const [schema, setSchema] = React.useState(undefined);

    React.useEffect(() => {
        // simulating getting `schema` and `data` from an API
        setTimeout(() => {
            setData(createOrderedMap(data1));
            setSchema(createOrderedMap(schema1));
        }, 1200);
    }, [setData, setSchema]);

    if(!data || !schema) return <div style={{textAlign: 'center', margin: '75px 0'}}>
        <Refresh className={'refresh-spin'} fontSize={'large'}/>
        <p>Loading Schema & Data</p>
    </div>;

    return <React.Fragment>
        <SchemaEditor
            schema={schema}
            store={data}
            onChange={setData}
            widgets={widgets}
            validity={validity}
            showValidity={showValidity}
            onValidity={setValidity}
        >
            {/*
                add children that should be under the schema editor,
                they can use the context of the editor for working
            */}
        </SchemaEditor>

        <Button
            style={{marginTop: 24}}
            onClick={() => {
                console.log('data-store: ', data.toJS());
                console.log('is-invalid: ', !!isInvalid(validity));
                isInvalid(validity) ?
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
            Code of this form/schema: <Link href={'https://github.com/ui-schema/demo-cra/blob/master/src/Schema/DemoEditor.js'}>src/Schema/DemoEditor.js</Link>
        </Typography>
    </React.Fragment>;
};

export default Editor;
