import React from 'react';
import { Input } from '@headlessui/react';

const InputFieldRead = ({
    value = '',
    setValue,
    label = 'Email address',
    type = 'email',
    disabled = false
}) => {
    return (
        <div>
            <label
                htmlFor={type}
                className="block text-sm font-medium text-secondary select-none"
            >
                {label}
            </label>
            <div className="mt-1 w-full">

                <input
                    id={type}s
                    name={type}
                    type={type}
                    required
                    onChange={(e) => setValue(e.target.value)}

                    disabled={disabled}
                    value={value}
                    className={`block w-full appearance-none px-3 py-2 shadow-sm ${type === 'text' ? 'focus:ring-2' : 'focus:ring-1'} sm:text-sm focus:ring-purple-600 font-medium bg-input-primary rounded-md !border border-primary h-[40px] text-secondary select-none mt-1`}
                />
            </div>
        </div>
    );
};

export default InputFieldRead;