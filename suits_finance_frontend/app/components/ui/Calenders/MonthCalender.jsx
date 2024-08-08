import React, { useState, useEffect } from 'react'
import { Tooltip as ToolTipNext } from "@nextui-org/react";
import { currentYear, getCurrentMonth, daysInAMonth } from '@/app/client/hooks/datetime/RelativeDate.js'

import { GetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter'
import ButtonPrimary from '@/app/components/ui/Buttons/ButtonPrimary'

export default function Example() {
  const [econEvents, setEconEvents] = useState([]);
  const [isLoadingUsername, setIsLoadingUsername] = useState(false);
  const [username, setUsername] = useState(GetKeyLocalStorage('username'));

  const dayOffset = 1;
  const daysInMonth = daysInAMonth(getCurrentMonth(), currentYear) - dayOffset;



  useEffect(() => {
    const fetchData = () => {
      try {
        const username = GetKeyLocalStorage('username')
        setUsername(username);
        setIsLoadingUsername(false);

      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, []);



  return (
    <div className="ml-[10px] sm:ml-[0px] mt-[23px]">
      <div className=" rounded-md  h-[165px] equity-curve-width sm:w-full">

        <div className="flex flex-row items-center h-[45px] justify-between">
          <ToolTipNext className="font-normal bg-secondary bg-white"
            content="Here you can get a clear overview of your profit and loss over the course of a month."
          >
            <h1 className="text-xl font-semibold text-primary  ">
              Profit & Loss Calendar
            </h1>
          </ToolTipNext>

          <div className="flex flex-row items-center">

            {/*
            <Switch
              defaultSelected
              aria-label="Automatic updates"
              className="mr-[10px]"
              color={"primary"}
            >
              Show economic events
            </Switch>
            */}

            < ButtonPrimary label="Add Event" />
          </div>

        </div>



        <div className="border-color bg-secondary h-[400px]  rounded-md mt-4 flex flex-col w-full">
          {/* the dates header */}

          <div className="flex flex-row w-full h-[40px]">
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center">
              <h3 className="text-center font-semibold text-color-secondary">
                Saturday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h3 className="text-center font-semibold text-color-secondary">
                Sunday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h3 className="text-center font-semibold text-color-secondary">
                Monday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h3 className="text-center font-semibold text-color-secondary">
                Tuesday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h3 className="text-center font-semibold text-color-secondary">
                Wednesday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h3 className="text-center font-semibold text-color-secondary">
                Thursday
              </h3>
            </div>
            <div className="border-bottom-color w-full h-[40px] flex items-center justify-center border-left-color">
              <h5 className="text-center font-semibold text-color-secondary text-sm">
                Friday
              </h5>
            </div>
          </div>

          <div className="grid grid-cols-7 h-full w-full">
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div key={i} className="border-color flex justify-left items-left pt-2 pl-2">
                <div className="flex flex-col">
                  <div className="text-left font-semibold text-color-secondary">
                    {i + 1}
                  </div>
                  <div className="text-left text-sm font-normal text-color-accent mt-2">
                    1 trade
                  </div>
                </div>

              </div>
            ))}
          </div>






        </div>

      </div>
    </div>
  )
}