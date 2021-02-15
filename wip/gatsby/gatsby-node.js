import path from 'path';
import fetvh from "isomorphic-fetch";

async function turnPizzasIntoPages({ graphql, actions}) {
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes { 
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    console.log(data)
    // 3. Loop over each
    data.pizzas.nodes.forEach(pizza => {
        // console.log('Creating a page for ', pizza.name)
        actions.createPage({
            // What is the URL for this new page?
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate, 
            context: {
                slug: pizza.slug.current,

            }
        })
    })
}

async function turnToppingsIntoPages({ graphql, actions }) {
    console.log("turning the toppings into pages")
    // 1. Get the template
    const toppingTemplate = path.resolve('./src/pages/pizzas.js')
    // 2. query all the toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes { 
                    name
                    id
                }
            }
        }
    `);
    console.log(data)
    // 3. createPage for that topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            // What is the URL for this new page?
            path: `topping/${topping.name}`,
            component: toppingTemplate, 
            context: {
                topping:topping.name,
                // TODO Regex for Topping
            }
        })
    })
    // 4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
    console.log('Turn Beers into Nodes!')
    // 1. Fetch list of beers
    const res = await fetch("https://api.sampleapis.com/beers/ale");
    const beers = await res.json();
    console.log(beers)
    // 2. Loop over each one
    beers.forEach(beer => {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json', 
                contentDigest: createContentDigest(beer),
            }
        }
        // 3. create a node for that beer
        actions.createNode({
            ...beer,
            ...nodeMeta
        })
    })



}


// Sourcing Nodes 

export async function sourceNodes(params) {
    // fetch a list of beers and source them into our gatsby API
    await Promise.all(
        [fetchBeersAndTurnIntoNodes(params)]
    )
}

export async function createPages(params) {
    console.log("creating Paaaaages!!")

    // Create pages dynamically

    // Wait for all promises to be resolved before finishing this function
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params)
    ]);
    // 1. Pizzas

    // 2. Toppings

    // 3. Slicemasters
}

