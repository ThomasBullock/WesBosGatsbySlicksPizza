import { FaPepperHot as icon } from 'react-icons/fa';

export default {
    name: 'topping',
    // visible title
    title: 'Toppings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'What is the name of the topping?'
        },
        {
            name: 'vegetarian',
            title: 'Vegetarian',
            type: 'boolean',
            options: {
                layout: 'checkbox'
            },
            description: 'Is the topping vegetarian?'
        },
    ],
    preview: {
        select: {
            name: 'name',
            vegetarian: 'vegetarian'
        },
        prepare: ({name, vegetarian}) => ({
            title: `${name} ${vegetarian ? '🌱' : ''}`
        })

    }
};
