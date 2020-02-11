import {createOrderedMap} from "@ui-schema/ui-schema";

const schemaStepper = createOrderedMap({
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
});

const dataStepper = createOrderedMap({
    'step-1': {name: 'Max'}
});

export {schemaStepper, dataStepper}

