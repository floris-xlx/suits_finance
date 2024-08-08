import React, { Fragment, useEffect, useState } from 'react';
import TabVertical from '@/app/components/ui/Tabs/TabVertical';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';

// zustand
import { useUserStore } from '@/app/stores/stores';

// supabase
import { GetAlgorithmsByOrganization } from '@/app/client/supabase/SupabaseOrgData';

const AlgorithmSwitch = ({
    label = 'Select an algorithm',
    setCacheValue = null
}) => {
    // zustand
    const { user, setOrganization } = useUserStore();

    // local states
    const [algorithms, setAlgorithms] = useState([]);
    const [loading, setLoading] = useState(true);


    // get the algorithms by the organization
    useEffect(() => {
        const fetchData = async () => {
            // get all the algorithms by the organization
            const algorithms = await GetAlgorithmsByOrganization(user.organization);
            // collect all the .name values from the array of objects and set it to the list state
            setAlgorithms(algorithms.map((algorithm) => algorithm.name));
            setLoading(false);

        };
        fetchData();
    }, []);


    return (
        <Fragment>
            {loading ? (
                <div className="flex w-full h-[115px] ">
                    <SkeletonLoader height={"full"} width={"full"} />
                </div>
            ) : (
                <TabVertical
                    label={label}
                    options={algorithms}
                    cacheValueKey={'cachedAlgorithmId'}
                    setCacheValue={setCacheValue}

                />
            )}

        </Fragment>
    )
}

export default AlgorithmSwitch;