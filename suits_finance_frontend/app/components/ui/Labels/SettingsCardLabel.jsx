import React, { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const SettingsCardLabel = ({ 
    label, 
    children, 
    color = 'bg-gray-500',
    admin = false, 
    onPress,
    highlight = false,
}) => {
 
    return (
        <div tabIndex="0">
            {!admin && (
                <button className={`flex flex-row items-center gap-x-2 justify-between hover:bg-accent transition cursor-pointer w-full h-full rounded-md p-2 px-3 active:ring-brand-primary active:ring-2 focus:ring-brand-primary active:outline-none focus:outline-none focus:ring-2  ${highlight ? 'outline outline-2 outline-brand-primary' : 'outline-none'}`}
                onClick={onPress}
               
                >
                    <div className="flex flex-row items-center gap-x-2"  >
                        <div className={`rounded-md flex items-center ${color} p-2`}>
                            {children}
                        </div>
                        <p className={`text-lg font-normal ${highlight ? 'text-brand-primary' : 'text-primary'}`}>{label}</p>
                    </div>
                    <ChevronRightIcon className={`w-5 h-5 ${highlight ? 'text-brand-primary' : 'text-accent'}`} />
                </button>
            )}
            
            {/* {(!lastItem && !admin) && <hr className="border-1 flex w-[80%] mx-auto border-primary" />} */}
        </div>
    );
}

export default SettingsCardLabel;