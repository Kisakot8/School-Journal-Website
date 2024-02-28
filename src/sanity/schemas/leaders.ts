import {defineField, defineType} from 'sanity'


export default defineType({
    name: 'leaders',
    type: 'document',
    title: 'Leaders',
    fields: [
        defineField({
            name: 'role',
            type: 'string',
            title: 'Leadership role',
        }),
        defineField({
            name: 'members',
            type: 'array',
            title: 'Members',
            of: [{type: 'reference', to: {type: 'author'}}]
        }),
        defineField({
            name: 'order',
            type: 'number',
            title: 'Order',
            validation: rule => rule.integer()
        }),
    ],

    preview: {
        select: {
            role: 'role',
        },
        prepare(selection) {
            const {role} = selection
            return {
                title: `${role} Members`
            }
        }
    }
})