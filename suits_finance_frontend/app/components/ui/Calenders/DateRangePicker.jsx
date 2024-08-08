import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { parseDate } from "@internationalized/date";
import { SetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

import { useTradeFiltersStore } from "@/app/stores/stores";

export default function App() {
    const { setIsValueDate } = useTradeFiltersStore();
    const dateToday = new Date().toISOString().split('T')[0];
    const firstDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split('T')[0];
    const [isInvalid, setIsInvalid] = useState(false);

    const [dateRange, setDateRange] = useState(null);
    const cacheKey = 'cachedPendingTradesFilterDateRange';
    const errorMessageEarlierThanToday = "A date cannot be set later than today."

    // handle the default value and the value of the date range
    const [value, setValue] = useState({
        start: parseDate(firstDayOfTheMonth),
        end: parseDate(dateToday),
    });

    // check if the date is earlier than today
    // if it is, set the isInvalid state to true
    useEffect(() => {
        if (value.start > parseDate(dateToday) || value.end > parseDate(dateToday)) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
            setDateRange(constructDate(value.start, value.end));
        }
    }, [value, dateToday, firstDayOfTheMonth]);

    // set the date range to local storage when the date range changes
    useEffect(() => {
        if (dateRange) {
            SetKeyLocalStorage(cacheKey, dateRange);
            SetKeyLocalStorage('cachedFilterTradesByKey', 'date');
            setIsValueDate(dateRange);

        }
    }, [dateRange]);


    // construct startDate and endDate like this startDate_endDate
    const constructDate = (startDate, endDate) => {
        return `${startDate}_${endDate}`;
    };


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-0">
            <DateRangePicker
                value={value}
                onChange={setValue}
                isInvalid={isInvalid}
                variant="bordered"
                errorMessage={errorMessageEarlierThanToday}
                defaultValue={{
                    start: parseDate(firstDayOfTheMonth),
                    end: parseDate(dateToday),
                }}
                className="w-full flex items-center"
                selectorIcon={<CalendarIcon className="text-xl ml-2 p-3" />}
            />

        </div>
    );
}
