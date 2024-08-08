import React, { useState, useRef, useEffect } from 'react';
import ToggleBlockUsers from '@/app/components/ui/Switches/ToggleBlockUsers';
import { useUserStore } from '@/app/stores/stores.js';

const CustomizeLayoutPending = () => {
    const { user } = useUserStore();
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        if (contentRef.current) {
            const windowWidth = window.innerWidth;
            if (windowWidth < 640) {
                setHeight(isExpanded ? 500 : 0);
            } else {
                setHeight(isExpanded ? 650 : 0);
            }
        }
    }, [isExpanded]);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>

            <div
                className="mt-4 transition-height overflow-hidden duration-400"
                style={{ height, transition: 'height 0.2s ease' }}
            >
                <div ref={contentRef}>
                    <ToggleBlockUsers
                        label={'Show timeframe on trades'}
                        subText={'Adds a chip to the trades to show the timeframe of the trade'}
                        supabaseKey={'show_tf_on_pending_trade'}
                        userId={user.id}
                        toggleHeight={toggleHeight}
                    />
                    <ToggleBlockUsers
                        label={'Show risk-to-reward on trades'}
                        subText={'Adds a chip behind levels to show the RR of the level in the card'}
                        supabaseKey={'show_rr_on_pending_trade'}
                        userId={user.id}
                    />
                    <ToggleBlockUsers
                        label={'Show time on trades'}
                        subText={'Adds an extra row to show the time of the trade in the card'}
                        supabaseKey={'show_time_on_pending_trade'}
                        userId={user.id}
                    />
                    <ToggleBlockUsers
                        label={'Show pips away on trades'}
                        subText={'Adds an extra row to show the pips away of the trade in the card'}
                        supabaseKey={'show_pips_away_on_pending_trade'}
                        userId={user.id}
                    />
                    <ToggleBlockUsers
                        label={'Show current price on trades'}
                        subText={'Adds an extra row to show the current price of the trade in the card'}
                        supabaseKey={'show_current_price_on_pending_trade'}
                        userId={user.id}
                    />
                    <ToggleBlockUsers
                        label={'Show pips on trade levels'}
                        subText={'Adds an extra chip to display the pips of each level inside the card'}
                        supabaseKey={'show_pips_on_pending_trade'}
                        userId={user.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomizeLayoutPending;
