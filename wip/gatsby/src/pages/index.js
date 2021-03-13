import React from "react";
import useLatestData from "../utils/useLatestData";
import { HomePageGrid } from "../styles/Grids.js";
import LoadingGrid from "../components/LoadingGrid";
import ItemGrid from "../components/ItemGrid";

function CurrentlySlicing({ slicemasters }) {
    return (
        <div>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length && <p>No one is working right now!</p>}
            {slicemasters?.length && <ItemGrid items={slicemasters} />}
        </div>
    );
}

function HotSlices({ hotSlices }) {
    return (
        <div>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length && <p>Nothin' in the Case!</p>}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
        </div>
    );
}

export default function HomePage() {
    const [slicemasters, hotSlices] = useLatestData();

    return (
        <div className="center">
            <h1>The Best Pizza DownTown!</h1>
            <p>Open 11am to 11pm Every Single Day</p>
            <HomePageGrid>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </HomePageGrid>
        </div>
    );
}
