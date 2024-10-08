import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";

// caching
import { SetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import PropTypes from "prop-types";


const TabHorizontal = ({
    label = null,
    options = ["Option 1", "Option 2", "Option 3"],
    cacheValueKey = null,
    setCacheValue = null,
    setValueExternal = null,
    show = true,
    title = null,
    preSetValue = null,
    variant = "solid",
}) => {
  const [value, setValue] = useState(preSetValue || options[0]);

  // value caching
  useEffect(() => {
    if (value) {
      //SetKeyLocalStorage(cacheValueKey, value);
      if (setValueExternal) {
        setValueExternal(value);
      }

      if (setCacheValue) {
        setCacheValue(value);
      }
    }
  }, [value]);

  if (!show) {
    return null;
  }

  return (
    <div className="flex w-full flex-col mt-4">
      {title && <p className="text-base font-medium text-primary select-none">{title}</p>}
        <label className="block text-sm font-medium text-accent mb-1">
            {label}
        </label>

      <Tabs 
        radius="sm" 
        aria-label="Options" 
        fullWidth 
        variant={variant}
        key={variant}
        size="lg"
        className={variant === "underlined" ? "" : "border border-primary rounded-md shadow-sm"}
        selectedKey={value}
        onSelectionChange={setValue}
    >

        {options.map((option, index) => (
          <Tab 
            key={typeof option === 'string' ? option.toLowerCase().replace(/ /g, "_") : `option_${index}`} 
            title={typeof option === 'string' ? option : option.label} 
            className="focus:outline-none text-xs font-semibold md:text-base md:font-normal"
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