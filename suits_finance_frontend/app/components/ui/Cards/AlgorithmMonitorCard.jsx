import React, { Fragment } from 'react';
import { Progress } from "@nextui-org/react";
import { Spinner } from '@nextui-org/react'


const AlgorithmMonitorCard = ({
    name,
    state,
    elapsedTime,
    secondsLeft,
    jobCounter,
    progress,
    totalAssets,
    currentAsset,
    show = true,
    lastRunTime

}) => {
    const unixToRelativeTime = (unixTime) => {
        const now = Date.now();
        const timeDifference = now - unixTime * 1000;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours} hr ago`;
        } else if (minutes > 0) {
            return `${minutes} min ago`;
        } else {
            return `${seconds} sec ago`;
        }
    }


    return (
        <div className="mt-4 border border-primary p-3 px-5 bg-primary rounded-md ">

            <div className="flex flex-row gap-x-1 items-center">
                <h1 className="text-xl font-bold">{name}</h1>
                {state === 'Active' ? (

                    <div className="bg-brand-primary text-white rounded-md px-1 text-sm ml-2">
                        Running
                    </div>
                ) : (
                    <div className="flex flex-row gap-x-1 items-center">
                        <div className="bg-skeleton text-secondary rounded-md px-1 text-sm ml-2">
                            Waiting for next job
                        </div>

                        <div className="bg-skeleton text-secondary rounded-md px-1 text-sm ml-2">
                            {unixToRelativeTime(lastRunTime)}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-row gap-x-2 mt-2">
                {state === 'Active' ? (
                    <>
                        Computing: {currentAsset}
                        <Spinner color="warning" size="sm" />
                    </>
                ) : (
                    <>
                        Last computed: {currentAsset}
                    </>
                )}
            </div>


            <br></br>
            {state === 'Active' && <p>Elapsed time: {elapsedTime} sec</p>}
            {state === 'Active' && <Fragment><p>Symbols left: {jobCounter} / {totalAssets}</p> <br></br></Fragment>}

            <Progress
                aria-label="Analyzing assets"
                size="md"
                value={progress}
                color="warning"
                showValueLabel={true}
                className="max-w-md"
            />


        </div>

    )
}

export default AlgorithmMonitorCard;