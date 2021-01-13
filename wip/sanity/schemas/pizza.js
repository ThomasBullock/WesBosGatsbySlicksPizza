import { rules } from 'eslint-plugin-prettier';
import { MdLocalPizza as icon } from 'react-icons/md';

export default {
    name: 'pizza',
    // visible title
    title: 'Pizzas',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'Name of the Pizza'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100
            }
            
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price of the pizza in cents',
            cvalidation: Rule => rule.min(1000).max(50000)
            // Todo: Add custom input component
        },
    ]
};
