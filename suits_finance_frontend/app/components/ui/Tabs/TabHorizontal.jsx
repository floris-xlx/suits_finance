import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";

// caching
import { SetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import PropTypes from "prop-types";


const TabHorizontal = ({
    label = null,
    options = ["Option 1", "Option 2", "Option 3"],
    cacheValueKey,
    setCacheValue = null,
    variant = "solid"
}) => {
  const [value, setValue] = useState(options[0]);

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
        radius="sm" 
        aria-label="Options" 
        fullWidth 
        variant={variant}
        size="lg"
        className="border border-primary rounded-md shadow-sm select-none"
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

export default TabHorizontal;

TabHorizontal.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  cacheValueKey: PropTypes.string,
  setCacheValue: PropTypes.func,
  setValueExternal: PropTypes.func,
};