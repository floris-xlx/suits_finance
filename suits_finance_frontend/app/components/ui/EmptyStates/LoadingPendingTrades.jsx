import React from 'react';
import { Spinner } from '@nextui-org/react';

const LoadingPendingTrades = () => {
  return (
    <div className="text-center">
      <div>
        <div>
          <div className="my-4 w-[50px] h-[50px] flex flex-row items-center"></div>

          <Spinner color="warning" size="lg" />
          <p className="text-primary">Loading trades...</p>
          <div className="relative flex w-10 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPendingTrades;