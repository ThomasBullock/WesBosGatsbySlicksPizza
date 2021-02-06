import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
    console.log(data.pizzas)
    const pizzas = data.pizzas.nodes
    return (<Fragment>
        <PizzaList pizzas={pizzas}/>
    </Fragment>);
}

export const query =  graphql`
    query PizzaQuery {
    pizzas: allSanityPizza {
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