import React, { useState, useEffect } from 'react'

import { Spinner } from "@nextui-org/react";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";
import { GetAllTradesByStrategyHash } from "@/app/client/supabase/SupabaseUserData.js";
import { GetKeyLocalStorage} from "@/app/client/caching/LocalStorageRouter";
import {
  EyeIcon,
  CalendarIcon,
  BellIcon,
  CogIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline'

import EquityCurveChart from '@/app/components/ui/Charts/EquityCurveChart.jsx'
import StrategyNameCard from '@/app/components/ui/Cards/StrategyNameCard.jsx'
import AddTradeButton from "@/app/components/ui/Buttons/AddTradeButton.jsx";
import MonthCalendar from "@/app/components/ui/Calenders/MonthCalender.jsx";
import TradeLogTable from "@/app/components/ui/Tables/TradeLogTable.jsx";
import SettingsPage from "@/app/components/layouts/journal/SettingsPage.jsx";
import IntegrationsPage from "@/app/components/layouts/journal/IntegrationsPage.jsx";


const subNavigation = [
  { name: 'Overview', href: '#', icon: EyeIcon, current: true },
  { name: 'Trade log', href: '#', icon: ListBulletIcon, current: false },
  { name: 'Calender', href: '#', icon: CalendarIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
  { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({
  strategyName,
  handlePageChange,
  currentDashboardPage,
  setNotification

}) {
  const { userId } = useRequireAuth();
  const [doesUserHaveTrades, setDoesUserHaveTrades] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTradeLog, callRefreshTradeLog] = useState(false);


  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const strategyHash = GetKeyLocalStorage('strategyHash');
          const trades = await GetAllTradesByStrategyHash(strategyHash, userId);

          if (trades === null) {
            setDoesUserHaveTrades(false);
            setIsLoading(false);
          }

          if (trades.length > 0) {
            setDoesUserHaveTrades(true);
          }

          setIsLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      }
      fetchData();
    }
  }, [userId]);


  if (strategyName === null) {
    strategyName = GetKeyLocalStorage('strategyName');
  }


  return (
    <>
      <div className="h-full w-full">
        <main className="mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="pb-6 px-2 sm:px-6 lg:col-span-2 lg:py-0 lg:px-0">

              <div className="pl-2 pb-4 hidden sm:block add-trade-button">
                < AddTradeButton
                  setNotification={setNotification}
                  refreshTradeLog={callRefreshTradeLog}
                  setDoesUserHaveTrades={setDoesUserHaveTrades}
                />
              </div>

              <div className="lg:w-[96.5%] mb-4">
                <StrategyNameCard strategyName={strategyName} />
              </div>

              <nav className="space-y-1 dashboard-width lg:w-full sm:pl-2 lg:pl-2">
                {subNavigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handlePageChange(item.name.toLowerCase())}
                    className={classNames(
                      currentDashboardPage === item.name.toLowerCase()
                        ? 'bg-accent focus:outline-none focus:ring-2 focus:ring-indigo-500 text-brand-primary'
                        : 'text-primary hover:bg-accent transition',
                      'group rounded-md pl-3 py-2 flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full'
                    )}
                    aria-current={currentDashboardPage === item.name.toLowerCase() ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        currentDashboardPage === item.name.toLowerCase() ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Payment details */}
            <div className="space-y-6 sm:px-6 lg:col-span-10 lg:px-0 ">

              {currentDashboardPage === 'overview' && (
                <>
                  {/* Equity Curve */}
                  <div className="h-[250px] sm:h-[350px]">
                    < EquityCurveChart userId={userId} />
                  </div>

                  {/* Most Traded Sessions */}
                  <div className="h-[40px] mt-2"></div>
                </>
              )}

              {currentDashboardPage === 'calender' && (
                <>
                  {/* Equity Curve */}
                  <div className="h-[250px] sm:h-[350px] -mt-[25px] rounded-md">
                    < MonthCalendar />

                    {/* Most Traded Sessions */}
                    <div className="h-[40px] mt-2"></div>
                  </div>
                </>
              )}

              {currentDashboardPage === 'trade log' && (
                <>
                  <div className="h-[250px] sm:h-[350px] equity-curve-width ">

                    {!isLoading && (
                      doesUserHaveTrades ? (

                        <div className="ml-[15px] sm:ml-0">
                          <TradeLogTable userId={userId} refreshTradeLog={refreshTradeLog} callRefreshTradeLog={callRefreshTradeLog} />
                        </div>
                      ) : (

                        <div className="flex flex-col items-center h-full justify-center mx-auto sm:ml-[0px] ml-[17px]">

                          < CubeTransparentIcon className="h-12 w-12 text-brand-primary" aria-hidden="true" />

                          <h2 className="font-semibold leading-4 sm:leading-6 text-primary text-md sm:text-xl mt-4">
                            Seems like you don't have any trades yet
                          </h2>

                          <p className="text-sm text-accent font-normal mb-3 mt-2 ">
                            Let's start by adding your first trade
                          </p>
                          <p className="mt-1 text-sm text-accent font-normal w-[140px] sm:w-[140px] mx-auto">

                            < AddTradeButton
                              setNotification={setNotification}
                              refreshTradeLog={callRefreshTradeLog}
                              setDoesUserHaveTrades={setDoesUserHaveTrades}
                            />
                          </p>
                        </div>
                      )
                    )}

                    {isLoading && (
                      <div className="flex flex-col items-center h-full justify-center mx-auto sm:ml-[0px] ml-[17px]">
                        <Spinner label="Loading trade log..." color="secondary" labelColor="secondary" />
                      </div>
                    )}

                  </div>
                </>
              )}

              {/* This height will decide the height of the  background */}
              {currentDashboardPage === 'settings' && (
                <>
                  <div className="pl-[10px] sm:pl-0 h-[900px] sm:h-[800px] equity-curve-width ">
                    <SettingsPage setNotification={setNotification} userId={userId} />
                  </div>
                </>
              )}

              {currentDashboardPage === 'integrations' && (
                <>
                <div className="pl-[10px] sm:pl-0 h-[250px] sm:h-[350px] equity-curve-width ">
                  <IntegrationsPage setNotification={setNotification} userId={userId} />
                </div>
              </>
            )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
