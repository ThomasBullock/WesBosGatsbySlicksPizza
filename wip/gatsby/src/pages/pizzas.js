import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
    const pizzas = data.pizzas.nodes
    return (<Fragment>
        <ToppingsFilter activeTopping={pageContext.topping}/>
        <PizzaList pizzas={pizzas}/>
    </Fragment>);
}

/* in: $topping could be regex see vid 25! */
export const query =  graphql`
    query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
        filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
        nodes {
        name
        id 
        slug {
            current
        }
        toppings {
            id
            name
        }
        image {
            asset {
                fixed(width: 200, height: 200) {
                        ...GatsbySanityImageFixed
                }
                fluid(maxWidth: 400) {
                        ...GatsbySanityImageFluid
                }
            }
        }
        }
    }
    }
`  