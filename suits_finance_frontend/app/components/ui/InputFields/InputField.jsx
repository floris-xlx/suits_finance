import React from "react";
import { Tooltip as ToolTipNext } from "@nextui-org/react";

const InputField = ({
    label,
    value,
    setValue,
    type = "number",
    placeholder = "",
    disabled = false,
    tooltip = false,
    tooltipContent = "This is an input field. It allows you to input data.",
    width = 200,
    padding = 4,
    marginTop = 0
}) => {
    const formattedWidth = width !== "full" ? `w-[${width}px]` : "w-full";
    const formattedPadding = `p-${padding}`;
    const formattedMarginTop = `mt-${marginTop}`;

    return (
        <div className={`${formattedWidth} ${formattedPadding} ${formattedMarginTop}`}>
            <div>
                {tooltip === true ? (

                    <ToolTipNext className="font-normal bg-primary border border-primary text-primary max-w-[300px]"
                        content={tooltipContent}
                    >

                        <label
                            className="block text-sm font-medium text-accent select-none"
                        >
                            {label}
                        </label>

                    </ToolTipNext>

                ) : (

                    <label
                        className="block text-sm font-medium text-accent select-none"
                    >
                        {label}
                    </label>


                )}

                <div className="mt-[6px]">

                    {disabled === false ? (

                        <input
                            id="account-size"
                            name="account-size"
                            type={type}
                            autoComplete="account-size"
                            placeholder={placeholder}
                            required
                            onChange={(e) => setValue(e.target.value)}
                            step={10}

                            value={value}
                            className={`block w-full appearance-none px-3 py-2 shadow-sm ${type === 'text' ? 'focus:ring-2' : 'focus:ring-1'} sm:text-sm focus:ring-purple-600 font-medium bg-input-primary rounded-md !border border-primary h-[40px] text-secondary select-none`}
                        />

                    ) : (

                        <input
                            id="account-size"
                            name="account-size"
                            type={type}
                            autoComplete="account-size"
                            placeholder={placeholder}
                            disabled
                            value={value}
                            className="block w-full appearance-none input-field px-3 py-2 shadow-sm sm:text-sm font-medium cursor-default text-accent bg-hover-primary rounded-md border border-primary"
                        />

                    )}
                </div>
            </div>
        </div>
    );
}

export default InputField;