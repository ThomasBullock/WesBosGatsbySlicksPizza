const gql = String.raw;
const deets = gql`
        name
        _id
        image {
            asset {
                url
                metadata {
                    lqip
                }
            }
        }
`;
import { useEffect, useState } from "react";

export default function useLatestData() {
    // hot slices
    const [hotSlices, setHotSlices] = useState();
    // slicemasters
    const [slicemasters, setSlicemasters] = useState();
    // Use a side effect to fetch he data from teh graphql endpoint
    useEffect(function () {
        // when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: gql`
                  query {
                    StoreSettings(id: "downtown") {
                      name
                      slicemaster {
                        ${deets}
                      }
                      hotSlices {
                        ${deets}
                      }
                    }
                  }
                `,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // TODO: checl for errors
                // set the data to state
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemasters(res.data.StoreSettings.slicemaster);
            })
            .catch((err) => {
                console.log("SHOOOOOT");
                console.log(err);
            });
    }, []);
    console.log(hotSlices);
    return [hotSlices, slicemasters];
}
