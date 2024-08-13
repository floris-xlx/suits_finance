import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


const animals = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
];

export default function App({ label = "Favorite Animal", options = animals, width = "full", setValue = () => { } }) {
    const placements = [
        "outside",
    ];

    const handleForat = (valueLocal) => {
        // make a label with first letter caps and rest lower case of each word and remove all  space by _ insteaf ftac
        const label = valueLocal.replace(/\s+/g, '_').toLowerCase();
        const value = valueLocal.toLowerCase();
        const objectValue = { label, value };
        setValue(objectValue);
        return objectValue;
    }

    return (
        <div className={`w-${width}`}>

            <label
                className="block text-sm font-medium text-accent select-none mb-1"
            >
                {label}
            </label>

            <div className="w-full flex flex-col ">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {placements.map((placement, index) => (
                            <Autocomplete
                                key={index}
                                defaultItems={options}
                                color={'success'}
                                onSelectionChange={(e) => handleForat(e)}
                                defaultInputValue={options[0].label}

                                className=" border border-primary rounded-md shadow-sm bg-primary "
                            >
                                {(item) => <AutocompleteItem className="" key={item.value}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
