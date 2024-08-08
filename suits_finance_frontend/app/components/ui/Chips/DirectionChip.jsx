import React from 'react';

import FullCapitalize from '@/app/client/hooks/formatting/FullCapitalize';

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const DirectionChip = ({ direction }) => {
  const Text = FullCapitalize(direction);

  return (
    <div>
      {direction === 'sell' ? (
        <div className="flex gap-4 bg-red-accent rounded-md py-[3px] px-[4px] w-[60px] ">
          <div className="text-red text-[12px] font-bold flex flex-row  gap-1 items-center select-none">
            {Text}
            <ArrowDownCircleIcon className="w-5 h-5 text-red" />
          </div>
        </div>
      ) : direction === 'buy' ? (
        <div className="flex gap-4 bg-green-accent w-[60px] rounded-md py-[3px] px-[5px] ">
          <div className="text-green text-[12px] font-bold flex flex-row  gap-1 items-center select-none">
            {Text}
            <ArrowUpCircleIcon className="w-5 h-5 text-green" />
          </div>
        </div>
      ) : (
        <div className="flex gap-4 bg-input-primary rounded-md py-[3px] px-[5px] w-[60px]">
          <div className="text-gray-600 text-[12px] font-bold flex flex-row  gap-1 mx-auto select-none items-center ">
            ???
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectionChip;