import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const NoPendingTrades = () => {
    return (
        <div className="text-center">
            <div>
                <div>
                    < ClipboardDocumentIcon className="h-12 w-12 text-brand-primary mx-auto" aria-hidden="true" />
                </div>

                <div>
                    <h3 className="mt-2 text-xl font-medium text-primary select-none">
                        No pending trades found
                    </h3>
                    <p className="mt-1 text-sm text-secondary font-normal select-none">
                        As more trades are generated, they will appear here
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoPendingTrades;