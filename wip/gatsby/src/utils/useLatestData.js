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
                query: `
                query {
                    StoreSettings(id: "downtown") {
                      name
                      slicemaster {
                        name
                      }
                      hotSlices {
                        name
                      }
                    }
                    }
                `,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // TODO check for errors

                // set the data
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemasters(res.data.StoreSettings.slicemaster);
            });
    }, []);
    console.log(hotSlices);
    return [hotSlices, slicemasters];
}
