import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";

// caching
import { SetKeyLocalStorage, GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

const TabVertical = ({
    label,
    options = ["Option 1", "Option 2", "Option 3"],
    cacheValueKey,
    setCacheValue = null
}) => {
  const [value, setValue] = useState(GetKeyLocalStorage(cacheValueKey) || options[0]);

  // value caching
  useEffect(() => {
    if (value) {
      SetKeyLocalStorage(cacheValueKey, value);

      if (setCacheValue) {
        setCacheValue(value);
      }
    }
  }, [value]);


  return (
    <div className="flex w-full flex-col mt-4">
        <label className="block text-sm font-medium text-accent mb-1">
            {label}
        </label>
      <Tabs 
        isVertical={true}
        radius="sm" 
        aria-label="Options" 
        fullWidth 
        size="lg"
        className="border border-primary rounded-md shadow-sm"
        selectedKey={value}
        onSelectionChange={setValue}
      >
        {options.map((name) => (
          <Tab 
            key={name.toLowerCase().replace(/ /g, "_")} 
            title={name} 
            className="focus:outline-none"
          >
          </Tab>
        ))}
      </Tabs>
    </div>  
    );
};

export default TabVertical;