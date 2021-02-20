import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
    border: 1px solid var(--grey);
    padding: 2rem;
    text-align: center;
    img {
        width: 100%;
        height: 200px;
        object-fit: contain;
        display: block;
        display: grid;
        align-items: center;
        font-size: 10px;
    }
`;

export default function BeersPage({data}) {
    return (
    <Fragment>
        <SEO title={`Beers! We have ${data.beers.nodes.length} in stock`} />
        <h2 className="center">
            We have ${data.beers.nodes.length} Beers Available. Dine in Only!
        </h2>
    <BeerGridStyles>
        {data.beers.nodes.map((beer => {
            console.log(beer)
            const rating = beer.rating ? Math.round(beer.rating.average) : 0
            return (
                <SingleBeerStyles key={beer.id}>
                    <img src={beer.image} alt={beer.name} />
                    <h3>{beer.name}</h3>
                    {beer.price}
                    <p title={`${rating} out of 5 stars`}>
                        {`⭐️`.repeat(rating)}
                        <span style={{ filter: `grayscale(100)`}}>
                            {`⭐️`.repeat(5 - rating)}
                        </span>
                        <span>({beer.rating ? beer.rating.reviews: 0})</span>
                    </p>
                </SingleBeerStyles>
            )
        }))}
    </BeerGridStyles>
    </Fragment>
    );
}

export const query = graphql`
query {
    beers: allBeer {
        nodes {
            id
            name
            price
            image
            rating {
                reviews
                average
            }
        }
    }
    }
`;

 