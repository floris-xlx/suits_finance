import React, { useState, useEffect } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from '@nextui-org/react';
import { BugAntIcon } from '@heroicons/react/24/outline';
import SendBugReport from '@/app/client/api/SendBugReport';
import { BugReportSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';

export default function BugReport() {
    const [value, setValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOnChange = async (value) => {
        if (!value) return;

        try {
            await SendBugReport(value);
            BugReportSuccessNotification();
            setIsSubmitted(false); // Close the popover after successful submission
            setValue('');
        } catch (error) {
            console.error('Error sending bug report:', error);
        }
    };

    const content = (
        <PopoverContent className="w-[240px] bg-primary">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-primary" {...titleProps}>
                        Bug Report
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                        <label className="block text-sm font-medium text-accent">
                            Try to be as descriptive as possible
                        </label>
                        <textarea
                            className="bg-input-primary rounded-md mt-2 resize-none focus:outline-none focus:ring-2 active:ring-purple-600 focus:ring-purple-600 0 w-full text-sm font-normal h-[80px] border border-primary text-accent p-2"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            spellCheck="false"
                        ></textarea>

                        <Button
                            color={value ? 'default' : 'danger'}
                            variant="flat"
                            className="capitalize text-white transition duration-300"
                            onClick={() => handleOnChange(value)}
                            disabled={!value}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            )}
        </PopoverContent>
    );

    return (
        <div className="flex flex-wrap gap-4">
            <Popover
                isOpen={isSubmitted}
                showArrow
                offset={10}
                placement="bottom"
                backdrop="blur"
                onClose={() => setIsSubmitted(false)} // Close the popover when clicking outside
            >
                <PopoverTrigger>
                    <Button
                        color="warning"
                        variant="flat"
                        className="capitalize"
                        onClick={() => setIsSubmitted(true)}
                    >
                        <BugAntIcon className="w-5 h-5 icon" />
                    </Button>
                </PopoverTrigger>
                {content}
            </Popover>
        </div>
    );
}
