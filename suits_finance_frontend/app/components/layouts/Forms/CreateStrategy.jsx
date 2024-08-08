import React, { Fragment, useState, useEffect, use } from 'react';
import { v4 } from "uuid";

import CenterFull from "@/app/components/ui/Containers/CenterFull";
import InputField from "@/app/components/ui/InputFields/InputField";
import { ArrowLeftIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import ButtonPrimary from '@/app/components/ui/Buttons/ButtonPrimary';


import { useUserViewStore, useOrganizationStore, useUserStore } from '@/app/stores/stores';
import { ErrorServerNotification } from '@/app/components/ui/Notifications/Notifications.jsx';


import { StrategyCreateApi } from '@/app/client/api/v2/StrategyCreate';
import { StrategyNameAvailabilityApi } from '@/app/client/api/v2/StrategyNameAvailability';
import { refreshPage } from '@/app/client/hooks/refreshPage';


const CreateStrategyForm = () => {
    const [strategyName, setStrategyName] = useState('');
    const [strategyDescription, setStrategyDescription] = useState('');
    const [strategyHash, setStrategyHash] = useState('');
    const [userId, setUserId] = useState('');
    const [strategyLoading, setStrategyLoading] = useState(false);


    const [isStrategyAvailable, setIsStrategyAvailable] = useState(false);

    const [height, setHeight] = useState(0);
    

    //zustand
    const { setIsInStrategyCreationFlow } = useUserViewStore();
    const { organization } = useOrganizationStore();
    const { user } = useUserStore();

    const isSpecialCharacter = (str) => {   
        var format = /[ !@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
        return format.test(str);
    }

    useEffect(() => {
        const checkStrategyNameAvailability = async () => {
            if (isSpecialCharacter(strategyName)) {
                setIsStrategyAvailable(false);
                setStrategyStatus(StrategySpecialCharactersMessage);
                setStrategyStatusColor(StrategyStatusRed);
                setHeight(50);
                return;
            }


            if (strategyName.length > 3) {
                try {
                    const response_api = await StrategyNameAvailabilityApi(strategyName, userId);
      
                    if (response_api.available) {
                        setIsStrategyAvailable(true);
                        setStrategyStatus(StrategyAvailableMessage);
                        setStrategyStatusColor(StrategyStatusGreen);
                        setHeight(50);
                    } else {
                        setIsStrategyAvailable(false);
                        setStrategyStatus(StrategyNotAvailableMessage);
                        setStrategyStatusColor(StrategyStatusRed);
                        setHeight(50);
                    }
                    
                } catch (error) {
                    console.error("Error checking strategy name availability:", error);
                    ErrorServerNotification();

                    setIsStrategyAvailable(false);
                    setStrategyStatus(StrategyNotAvailableMessage);
                    setStrategyStatusColor(StrategyStatusRed);
                    setHeight(50);
                }

            } else {
                setIsStrategyAvailable(false);
                setStrategyStatusColor(StrategyStatusBase);
                setStrategyStatus(StrategyBaseMessage);
                setHeight(50);
            }
        };

        checkStrategyNameAvailability();
    }, [strategyName]);


    // status messages
    const StrategyAvailableMessage = "Strategy name is available";
    const StrategyNotAvailableMessage = "Strategy name is not available";
    const StrategyBaseMessage = "Strategy name must be at least 3 characters long";
    const StrategySpecialCharactersMessage = "Strategy name cannot contain special characters or spaces";

    // status colors
    const StrategyStatusRed = "bg-red-accent text-red";
    const StrategyStatusGreen = "bg-green-accent text-green";
    const StrategyStatusBase = "bg-secondary text-secondary";

    // strategy status
    const [strategyStatus, setStrategyStatus] = useState(StrategyBaseMessage);
    const [strategyStatusColor, setStrategyStatusColor] = useState(StrategyStatusBase);


    // handle strategy creation href
    const removeQueryParams = () => {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // generate strategy id
    const generateStrategyId = () => {
        const strategy_id = v4();
        // add xlx-s- prefix to the strategy id
        return `xlx-s-${strategy_id}`;
    }


    // check if strategy name is availabl
    const createStrategyName = async () => {
        setStrategyLoading(true);
        try {
            const response_api = await StrategyCreateApi(
                user.username,
                strategyName,
                generateStrategyId(),
                user.organization
            );

            if (response_api.created) {
                setIsInStrategyCreationFlow(false);
                removeQueryParams();
                setStrategyLoading(false);


                refreshPage();
            }

        } catch (error) {
            setStrategyLoading(false);

            ErrorServerNotification();
            console.error("Error creating strategy:", error);
        }
    }


    return (
        <div className="h-full w-full SlideInAnimationSlow">
            <button onClick={() => { setIsInStrategyCreationFlow(false); removeQueryParams(); }}

                className="cursor-pointer  mt-[20px] hover:transition hover:text-secondary bg-transparent hover:bg-accent rounded-md p-3 flex flex-row gap-x-1 items-center">
                <ArrowLeftIcon className="h-8 w-8 text-primary " />
                <span className="text-primary select-none text-md ml-1">
                    Go back
                </span>

            </button>


            <CenterFull>

                <div className="flex flex-col gap-y-3 items-center mx-auto mb-[20px]  min-w-[250px] max-w-[300px]">
                    <span className="text-primary text-2xl sm:text-3xl select-none font-semibold">
                        Strategy creation
                    </span>
                    <p className="text-secondary text-sm select-none max-w-[290px] text-center">
                        You can change all of this later, so don't worry about getting this pefect.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-y-3 max-w-[300px] transition-height">

                    <InputField label={"Strategy name"} value={strategyName} setValue={setStrategyName} type={'text'} width={'full'} />

                    {strategyName && (
                        <div className="w-full mx-auto px-4" style={{ height, transition: 'height 0.2s ease' }} >
                            <p className={`text-[12px] p-2 rounded-md select-none ${strategyStatusColor}`}>
                                {strategyStatus}
                            </p>
                        </div>
                    )}


                    <div className="px-4">
                        <ButtonPrimary label={'Create'} onClick={createStrategyName} className="mt-8 mb-1" disabled={!isStrategyAvailable} loading={strategyLoading}/>
                    </div>


                </div>

            </CenterFull>

        </div>
    )
}

export default CreateStrategyForm;