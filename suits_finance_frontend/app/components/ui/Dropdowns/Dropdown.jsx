import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";


const animals = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
    {
        label: "Dolphin",
        value: "dolphin",
        description: "A widely distributed and diverse group of aquatic mammals",
    },
    { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
    { label: "Zebra", value: "zebra", description: "A several species of African equids" },
    {
        label: "Shark",
        value: "shark",
        description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
        label: "Whale",
        value: "whale",
        description: "Diverse group of fully aquatic placental marine mammals",
    },
    { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
    { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
];

export default function App({ label = "Favorite Animal", options = animals, width = "full" }) {
    const placements = [
        "outside",
    ];

    return (
        <div className={`w-${width}`}>

            <label
                className="block text-sm font-medium text-accent select-none mb-1"
            >
                {label}
            </label>

            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {placements.map((placement, index) => (
                            <Autocomplete
                                key={index}
                                defaultItems={options}
                                color={'success'}


                                className="max-w-xs border border-primary rounded-md shadow-sm bg-primary "
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
