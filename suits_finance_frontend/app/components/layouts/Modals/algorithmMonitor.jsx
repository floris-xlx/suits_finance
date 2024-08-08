import React, { useState, useEffect, useRef } from 'react';
import { AlgoMonitor } from '@/app/client/api/AlgoMonitor';

import AlgorithmMonitorCard from '@/app/components/ui/Cards/AlgorithmMonitorCard';


import { useUserStore } from '@/app/stores/stores';


const AlgorithmMonitor = () => {
    const [algoMonitorData, setAlgoMonitorData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const intervalRef = useRef(null);
    const countdownRef = useRef(null);

    const { user } = useUserStore();

    const isXylexOrganization = user.organization === 'xylex';
    const isTbrOrganization = user.organization === 'trades_by_rob';


    useEffect(() => {
        const fetchAlgoMonitorData = async () => {
            const data = await AlgoMonitor();
            setAlgoMonitorData(data.data.state);
            setLoadingData(false);
        };

        fetchAlgoMonitorData();
        intervalRef.current = setInterval(fetchAlgoMonitorData, 2000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (algoMonitorData) {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
            }

            countdownRef.current = setInterval(() => {
                setAlgoMonitorData(prevData => {
                    if (!prevData) return prevData;

                    return {
                        ...prevData,
                        tbr_original: prevData.tbr_original ? {
                            ...prevData.tbr_original,
                            elapsed_time: prevData.tbr_original.elapsed_time > 0 ? prevData.tbr_original.elapsed_time + 1 : 0
                        } : prevData.tbr_original,
                        tbr_scalping: prevData.tbr_scalping ? {
                            ...prevData.tbr_scalping,
                            elapsed_time: prevData.tbr_scalping.elapsed_time > 0 ? prevData.tbr_scalping.elapsed_time + 1 : 0
                        } : prevData.tbr_scalping,

                        genesis: prevData.genesis ? {
                            ...prevData.genesis,
                            elapsed_time: prevData.genesis.elapsed_time > 0 ? prevData.genesis.elapsed_time + 1 : 0
                        } : prevData.genesis,

                    };
                });
            }, 1000);
        }

        return () => clearInterval(countdownRef.current);
    }, [algoMonitorData]);

    console.log(algoMonitorData);

    return (
        <div>
            {loadingData && <p>Loading...</p>}

            {algoMonitorData && (
                <div className="flex mx-auto flex-col text-left">
                    {algoMonitorData.genesis && user.organization === 'xylex' && (
                        <AlgorithmMonitorCard
                            name={"Genesis"}
                            state={algoMonitorData.genesis.active ? 'Active' : 'Inactive'}
                            elapsedTime={algoMonitorData.genesis.elapsed_time}
                            secondsLeft={algoMonitorData.genesis.estimated_seconds_left}
                            jobCounter={algoMonitorData.genesis.job_counter}
                            progress={algoMonitorData.genesis.progress}
                            totalAssets={algoMonitorData.genesis.total_assets}
                            currentAsset={algoMonitorData.genesis.current_asset}
                            lastRunTime={algoMonitorData.genesis.last_run_time}
                        />
                    )}
         

                    {algoMonitorData.tbr_original && (
                        < AlgorithmMonitorCard
                            name={"TBR Original"}
                            state={algoMonitorData.tbr_original.active ? 'Active' : 'Inactive'}
                            elapsedTime={algoMonitorData.tbr_original.elapsed_time}
                            secondsLeft={algoMonitorData.tbr_original.estimated_seconds_left}
                            jobCounter={algoMonitorData.tbr_original.job_counter}
                            progress={algoMonitorData.tbr_original.progress}
                            totalAssets={algoMonitorData.tbr_original.total_assets}
                            currentAsset={algoMonitorData.tbr_original.current_asset}
                            lastRunTime={algoMonitorData.tbr_original.last_run_time}

                        />
                    )}

                    {algoMonitorData.tbr_scalping && (
                        < AlgorithmMonitorCard
                            name={"TBR Scalping"}
                            state={algoMonitorData.tbr_scalping.active ? 'Active' : 'Inactive'}
                            elapsedTime={algoMonitorData.tbr_scalping.elapsed_time}
                            secondsLeft={algoMonitorData.tbr_scalping.estimated_seconds_left}
                            jobCounter={algoMonitorData.tbr_scalping.job_counter}
                            progress={algoMonitorData.tbr_scalping.progress}
                            totalAssets={algoMonitorData.tbr_scalping.total_assets}
                            currentAsset={algoMonitorData.tbr_scalping.current_asset}
                            lastRunTime={algoMonitorData.tbr_scalping.last_run_time}

                        />
                    )}



                </div>
            )}
        </div>
    );
}

export default AlgorithmMonitor;