import React, { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { GetAllStrategyNamesById } from "@/app/client/supabase/SupabaseUserData.js";
import { useRequireAuth } from "@/app/auth/hooks/useRequireAuth";

export default function Example({
  setSelectedStrategy
}) {
  const { userId } = useRequireAuth();
  const [query, setQuery] = useState('')
  const [strategyNames, setStrategyNames] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const people = strategyNames.map((strategy) => {
    return { id: strategy.id, name: strategy.name }
  });

  const [selected, setSelected] = useState(people[0])

  useEffect(() => {
    setSelectedStrategy({ name: selected?.name, id: selected?.id });
  }, [selected, setSelectedStrategy]);

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
      }
      fetchData();
    }
  }, [userId]);


  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
  return (
    <div>

      {isDataLoading ? (

        <div className="overflow-hidden relative w-[205px] sm:w-[385px] rounded-md bg-accent before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent ">
          <div className="h-10 rounded-lg text-color"></div>
        </div>

      ) : (
        <div className="w-[205px] sm:w-[385px] ">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-secondary text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm pl-4 border-primary border">

                {/* This controls the actual base styles */}
                <Combobox.Input
                  className="w-full border-none pr-10 text-sm leading-5 text-secondary font-semibold focus:ring-0 h-[40px] bg-secondary"
                  displayValue={(person) => person.name}
                  onChange={(event) => setQuery(event.target.value)}
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
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm z-[10] border-primary">
                  {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-secondary">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative select-none py-2 pl-10 pr-4 hover:bg-accent transition cursor-pointer ${active ? 'bg-accent text-primary' : 'text-primary'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate  ${selected ? 'font-normal no-underline ' : 'font-normal no-underline '
                                }`}z
                            >
                              {person.name}
                            </span>
                            {selected && person.name === selected.name ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-primary' : 'text-brand-primary'
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
