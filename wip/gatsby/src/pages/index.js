import React, { Fragment } from "react";
import useLatestData from "../utils/useLatestData";

function CurrentlySlicing() {
    return <p>CurrentlySlicing</p>;
}

function HotSlices() {
    return <p>HotSlices</p>;
}

export default function HomePage() {
    const [slicemasters, hotSlices] = useLatestData();

    return (
        <div className="center">
            <h1>The Best Pizza DownTown!</h1>
            <p>Open 11am to 11pm Every Single Day</p>
            <div>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </div>
        </div>
    );
}
