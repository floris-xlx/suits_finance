import React, { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { GetAllStrategyNamesById } from "@/app/client/supabase/SupabaseUserData.js";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";

import pairnames from "@/app/client/workerdata/pairnames.js";

export default function Example({
  label,
  setPairname,
  preloadedPairname
}) {
  const { userId } = useRequireAuth();
  const [query, setQuery] = useState('');
  const [strategyNames, setStrategyNames] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const people = pairnames.map((pairname, index) => ({ id: index, name: pairname }));

  // Initialize selected state with the first item from people array
  const [selected, setSelected] = useState(people[0]);

  // On initial render, check if there's a preloadedPairname and update selected state accordingly, but only once
  useEffect(() => {
    if (preloadedPairname) {
      const preloadedPairnameObject = people.find(person => person.name === preloadedPairname);
      if (preloadedPairnameObject) setSelected(preloadedPairnameObject);
    }
  }, [preloadedPairname]);

  useEffect(() => {
    setPairname(selected?.name);
  }, [selected, setPairname]);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const strategyNames = await GetAllStrategyNamesById(userId);
          setStrategyNames(strategyNames);
          setIsDataLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  const filteredPeople = query === '' ? people : people.filter((person) =>
    person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
  );

  return (
    <div>

      {isDataLoading ? (

        <div className="overflow-hidden relative w-[205px] sm:w-[385px] rounded-md background-color-accent before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent px-4">
          <div className="h-10 rounded-lg text-color"></div>
        </div>

      ) : (
        <div className="w-full mb-4">
          <label
            className="block text-sm font-medium text-accent mb-1"
          >
            {label}
          </label>


          <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
              <div className="relative block w-full appearance-none rounded-md   shadow-sm focus:outline-none focus:ring-2   focus:ring-purple-600 sm:text-sm font-medium border-1 border-primary">

                <Combobox.Input
                  className="appearance-none rounded-md bg-input-primary shadow-sm focus:outline-none focus:ring-2   focus:ring-indigo-500 sm:text-sm font-medium w-full h-[40px] text-accent"
                  displayValue={(person) => preloadedPairname && !selected ? preloadedPairname : person.name}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPairname(event.target.value);
                  }}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm z-[10]">
                  {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-accent">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[var(--color-hover-primary)] text-accent' : 'text-accent'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate  ${selected ? 'font-normal no-underline ' : 'font-normal no-underline text-accent'
                                }`} z
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3  ${active ? 'text-primary' : 'text-purple-600'
                                  }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" fill="var(--color-brand-primary)" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}
    </div>
  )
}