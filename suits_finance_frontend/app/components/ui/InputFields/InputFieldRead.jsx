import React from 'react';

const InputFieldRead = ({
    value = '',
    setValue,
    label = 'Email address',
    type = 'email',
}) => {
    return (
        <div>
            <label
                htmlFor={type}
                className="block text-sm font-medium text-secondary select-none"
            >
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={type}
                    name={type}
                    type={type}
                    autoComplete={type}
                    placeholder=""
                    required
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className="block w-full appearance-none rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm font-medium"
                />
            </div>
        </div>
    );
};

export default InputFieldRead;