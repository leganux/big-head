module.exports = {
    category: {
        operation: {
            all: true
        },
        definition: {
            name: {
                type: 'string',
                mandatory: true
            },
            active: {
                type: 'boolean',
                mandatory: true,
                default: false
            },
            key: {
                type: 'number',

            },
        },
        datatable_search_fields: ['name'],
    },
    type: {
        operation: {
            all: true
        },
        definition: {
            name: {
                type: 'string',
                mandatory: true
            },
            active: {
                type: 'boolean',
                mandatory: true,
                default: false
            },
            key: {
                type: 'number',

            },
        },
        datatable_search_fields: ['name'],
    },
    product: {
        operation: {
            all: true
        },
        definition: {
            name: {
                type: 'string',
                mandatory: true
            },
            description: {
                type: 'string',

            },
            count: {
                type: 'number',
                mandatory: true,
                default: 0
            },
            type: {
                type: 'oid',
                rel: 'type'
            },
            category: {
                type: 'oid',
                rel: 'category'
            },
            moreInfo: {
                type: 'any',
            },
        },
        datatable_search_fields: ['name']
    },

}
