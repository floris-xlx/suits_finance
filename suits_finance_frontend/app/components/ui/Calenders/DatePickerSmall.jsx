import React, { useState, useEffect } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import {
  NextMonth,
  PreviousMonth,
  currentYear,
  getCurrentMonth,
  currentMonth,
  now,
  lastDayOfMonth,
  firstDayOfMonth,
  daysInAMonth
} from '@/app/client/hooks/datetime/RelativeDate.js'
import { months } from '@/app/client/workerdata/months.js'


const generateDaysForCurrentMonth = (
  shownMonth,
  shownYear,
  internalSelectedDate,
  indexShownMonth,
  monthNumber,
  yearIndex
) => {
  // Adjust days in February for leap year
  const daysInMonth = daysInAMonth(shownMonth, shownYear);
  const days = [];

  // offset 1 day forward for the current day highlight
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayDate = tomorrow.toDateString();


  for (let day = 1; day <= daysInMonth; day++) {

    const date = new Date(shownYear, currentMonth, day);
    const isToday = date.toDateString() === todayDate && shownMonth === getCurrentMonth();

    if (internalSelectedDate) {
      const [year, month, day] = internalSelectedDate.split('-');
      const selectedDate = new Date(year, month - 1, day);

      // offset selectedDate 1 day forward for the current day highlight
      selectedDate.setDate(selectedDate.getDate() + 1);

      if (date.getDate() === selectedDate.getDate() && indexShownMonth === monthNumber && yearIndex == shownYear) {
        days.push({
          date: date.toISOString().split('T')[0],
          isCurrentMonth: true,
          isToday: isToday,
          isSelected: true
        });
      } else {
        days.push({
          date: date.toISOString().split('T')[0],
          isCurrentMonth: true,
          isToday: isToday,
          isSelected: false
        });
      }

    } else {
      days.push({
        date: date.toISOString().split('T')[0],
        isCurrentMonth: true,
        isToday: isToday,
        isSelected: false
      });
    }
  }

  const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust based on how you define the start of the week
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const date = new Date(shownYear, currentMonth, -i);
    date.setDate(date.getDate() + 1); // Adjusting each date to represent the day before
    days.unshift({
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  const daysFromNextMonth = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(shownYear, currentMonth + 1, i);
    date.setDate(date.getDate() + 1); // Adjusting each date to represent the day before

    days.push({
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  // filter out all duplicate dates and return the array
  const seen = new Set();
  const filteredDays = days.filter(day => {
    const duplicate = seen.has(day.date);
    seen.add(day.date);
    return !duplicate;
  });

  return filteredDays;
};


export default function Example({ setSelectedDate }) {
  const [shownMonth, setShownMonth] = useState(getCurrentMonth());
  const [currentMonth, setcurrentMonth] = useState(getCurrentMonth());
  const [internalSelectedDate, setInternalSelectedDate] = useState(null);
  const [shownYear, setShownYear] = useState(currentYear);
  const [title, setTitle] = useState(shownMonth);
  const [monthNumber, setMonthNumber] = useState(0);
  const [yearIndex, setYearIndex] = useState(currentYear);

  const indexShownMonth = months.findIndex((m) => m.name === shownMonth) + 1;


  // when it's not the current year we need to adjust the title to show the year
  useEffect(() => {
    if (shownYear !== currentYear) {
      setTitle(`${shownMonth} ${shownYear}`);
    } else {
      setTitle(shownMonth);
    }
  }, [shownMonth, shownYear]);



  function handleDateClick(date) {
    // look what shownMonth it is and then adjust the month in the date
    const [year, month, day] = date.split('-');

    // map the month to the month number
    const monthNumber = months.find((m) => m.name === shownMonth).number;

    date = `${shownYear}-${monthNumber}-${day}`;

    setSelectedDate(date);
    setInternalSelectedDate(date);
    setMonthNumber(monthNumber);
    setYearIndex(year);
  }

  const days = generateDaysForCurrentMonth(shownMonth, shownYear, internalSelectedDate, indexShownMonth, monthNumber, yearIndex);



  // helpr function to dynamically assign classes
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div>
      <h2 className="inline-block text-sm font-medium text-color-accent">Select date</h2>
      <div className="">
        <div className="mt-10 text-center">
          <div className="flex items-center text-gray-900">


              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => setShownMonth(PreviousMonth(shownMonth, setShownYear, setTitle, setInternalSelectedDate))}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>


            <div className="flex-auto font-semibold text-color-accent h-[35px]">
              {title}
            </div>

            {(shownMonth !== currentMonth || shownYear !== currentYear) && (
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => setShownMonth(NextMonth(shownMonth, setShownYear, setTitle, setInternalSelectedDate))}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

          </div>

          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg background-color-accent border-color text-sm shadow">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-[var(--button-hover-color)] focus:z-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  day.isCurrentMonth ? 'background-color-accent' : 'opacity-30 cursor-default pointer-events-none select-none',
                  day.isSelected ? 'ring-2 ring-[var(--brand-purple)] rounded-md z-[10] ' : '',
                  !day.isToday && 'text-color',
                  day.isToday && currentYear === shownYear && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg'
                )}
                onClick={() => handleDateClick(day.date)} // Set selected date on click
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}