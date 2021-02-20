import path from 'path';
import fetch from "isomorphic-fetch";

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

async function turnSlicemastersIntoPages({ graphql, actions }) {
    // 1. Query all slicemasters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);

    console.log(data.slicemasters)
    // 2 Turn each slicemaster into their own page
    data.slicemasters.nodes.forEach(slicemaster => { 
        actions.createPage({
            path: `/slicemasters/${slicemaster.slug.current}`,
            component: path.resolve('./src/templates/Slicemaster.js'),
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current,
                id: slicemaster.id
            }
        })
    })

    // 3. Figure out how many pages there are based on ho many slicemasters there are and how many per page GATSBY_PAGE_SIZE
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)
    console.log(pageSize + "per page and pages count " + pageCount)
        Array.from({ length: pageCount }).forEach((_, i) => {
            console.log(`Creating page ${i}`);
            actions.createPage({
                path: `/slicemasters/${i + 1}`,
                component: path.resolve('./src/pages/slicemasters.js'),
                // This data is passed to the template when we create it
                context: {
                    skip: i * pageSize, 
                    currentPage: i + 1,
                    pageSize,
                }
            })
        })
    // 4. Looop from 1 to n 
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
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params)
    ]);
    // 1. Pizzas

    // 2. Toppings

    // 3. Slicemasters
}

