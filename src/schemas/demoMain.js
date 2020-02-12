import {createOrderedMap} from "@ui-schema/ui-schema";

const schemaMain = createOrderedMap({
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
            view: {
                sizeMd: 3
            },
            enum: [
                'child',
                'teen',
                'adult',
                'senior',
            ],
        },
        ages: {
            type: "array",
            widget: "SelectMulti",
            view: {
                sizeMd: 3
            },
            enum: [
                'child',
                'teen',
                'adult',
                'senior',
            ],
        },
    },
    required: [
        'layouts',
        'size'
    ]
});

const dataMain = createOrderedMap({
    stepper: {'step-1': {name: 'Max'}},
    headline: 'Some Demo Content Headline',
});

const schemaUser = createOrderedMap({
    type: "object",
    title: "headline",
    properties: {
        name: {
            type: "string",
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
        address: {
            type: "object",
            properties: {
                street: {
                    type: "string",
                    view: {
                        sizeMd: 9
                    }
                },
                street_no: {
                    type: "string",
                    view: {
                        sizeMd: 3
                    }
                },
                city: {
                    type: "string",
                    view: {
                        sizeMd: 12
                    }
                },
                country: {
                    type: "string",
                    view: {
                        sizeMd: 12
                    }
                },
            }
        },
        birthday: {
            type: "string",
            format: "date",
            view: {
                sizeMd: 6
            }
        },
        seats: {
            type: "number",
            view: {
                sizeMd: 6
            },
            default: 1,
            minimum: 0,
            maximum: 5,
        },
    },
    required: ['seats']
});

const dataUser = createOrderedMap({});

export {
    schemaMain, dataMain,
    schemaUser, dataUser
}

