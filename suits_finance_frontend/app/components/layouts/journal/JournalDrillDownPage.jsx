'use client';

import React, { useState, useEffect } from "react";

import JournalSideBarShell from "@/app/components/layouts/journal/JournalSideBarShell.jsx";
import MostTradedSessionsChart from "@/app/components/ui/Charts/MostTradedSessionsChart.jsx";
import {
  SetKeyLocalStorage, GetKeyLocalStorage
} from "@/app/client/caching/LocalStorageRouter";

import { ToolTipText } from "@/app/components/ui/ToolTip/ToolTip.jsx";

const JournalDrillDownPage = ({
  strategyName,
  setNotification,
  userId
}) => {

  if (strategyName === null) {
    strategyName = GetKeyLocalStorage('strategyName');
  }

  const [currentDashboardPage, setCurrentDashboardPage] = useState('overview');

  useEffect(() => {
    const currentVerticalNavItem = GetKeyLocalStorage('currentVerticalNavItem');
    if (currentVerticalNavItem) {
      setCurrentDashboardPage(currentVerticalNavItem);
    }
  }, []);

  function handlePageChange(page) {
    setCurrentDashboardPage(page);
    SetKeyLocalStorage('currentVerticalNavItem', page);
  }

  return (
    <div className="mb-[400px]">
      <div className="w-[1720px] mx-auto pt-2 sm:pt-3 pr-[250px] mt-5  ">

        <JournalSideBarShell
          strategyName={strategyName}
          handlePageChange={handlePageChange}
          currentDashboardPage={currentDashboardPage}
          setNotification={setNotification}
        />
      </div>


      {/* da container gais */}
      {currentDashboardPage === 'overview' && (
        <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md h-[700px] sm:h-[300px] flex flex-col sm:flex-row px-0 sm:px-1 gap-5">
              <div className="flex flex-col justify-between w-full h-full  rounded-md">
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-primary p-4 border-primary border-b">
                    Title
                  </h1>
                </div>
              </div>

              <div className="flex flex-col justify-between w-full h-full  rounded-md">
                <div className="w-full">
                  <h1 className="text-xl font-semibold text-primary p-4 border-primary border-b">
                    Most traded pairs
                  </h1>
                </div>
              </div>

              <div className="flex flex-col justify-between w-full h-full  rounded-md">
                <div className="w-full  border-primary border-b">

                  <ToolTipText
                    hoverable_title="Most traded sessions"
                    text="This shows the most traded sessions in the market over all the instruments you have traded."
                  />

                </div>
                <MostTradedSessionsChart userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JournalDrillDownPage;