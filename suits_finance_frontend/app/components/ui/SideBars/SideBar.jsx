import React, { useState, useEffect } from 'react';

import { useUserViewStore } from '@/app/stores/stores';

const SideBar = () => {
    const Items = [
        { title: "General" },
        { title: "Trades" },
        // { title: "Journal" },
        // { title: "Insights" },
        // { title: "Studio"},
        // { title: "Team" },
        // { title: "Results" },
        // { title: "Community" },
        // { title: "Integrations" },
        // { title: "Support" },
        // { title: "Settings" },
    ];

    const { view, setStrategyDrilldownSideBarItem } = useUserViewStore();
    useEffect(() => {
        if (view.strategyDrilldownSideBarItem === null) {
            setCurrentItem(Items[0]);
        } else {
            setCurrentItem(view.strategyDrilldownSideBarItem.title);
        }
    }, []);


    const [currentItem, setCurrentItem] = useState(Items[0]);

    const handleClickItem = (item) => {
        setCurrentItem(item);
        setStrategyDrilldownSideBarItem(item);
    };

    return (
        <div className="flex flex-col gap-y-1">
            {Items.map((item, index) => (
                <div 
                    key={index} 
                    className={`flex flex-row items-center w-full ${currentItem.title === item.title ? 'bg-accent rounded-md' : ''}`}
                    onClick={() => handleClickItem(item)}
                >
                    <div className={`text-secondary text-[15px] ml-1 select-none cursor-pointer rounded-md p-2  w-full ${currentItem.title === item.title ? 'bg-accent ' : ' hover:bg-accent hover:transition'}`}>
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SideBar;