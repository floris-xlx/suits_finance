import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";

// caching
import { SetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";

const VerticalTabFullWidth = ({
    label,
    organizationNames = ["Suits Finance"],
    value
}) => {
  // organization
  const [organization, setOrganization] = useState(null);
  
  useEffect(() => {
    if (organization) {
      SetKeyLocalStorage("cachedOrganization", organization);
    }
  }, [organization]);

  return (

    <div className="flex w-full flex-col mt-4">
        <label className="block text-sm font-medium text-accent mb-1">
            {label}
        </label>

      <Tabs 
        radius="sm" 
        aria-label="Options" 
        fullWidth 
        size="lg"
        className="border border-primary rounded-md shadow-sm"
        selectedKey={value}
        onSelectionChange={setOrganization}
    >

        {organizationNames.map((name) => (
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

export default VerticalTabFullWidth;