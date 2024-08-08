import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { Spinner } from "@nextui-org/react";

const NoStrategyState = ({
    loading,
    onCreateStrategy
}) => {
    if (loading) {
        return <Spinner label="Loading journal..." color="secondary" labelColor="secondary" size="lg" />;
    }

    return (
        <div className="text-center">
            <div>
                <div>
                    < CubeTransparentIcon className="h-12 w-12 text-brand-primary mx-auto" aria-hidden="true" />
                </div>

                <div>
                    <h3 className="mt-2 text-xl font-medium text-primary">Let's create your first strategy to get started.</h3>
                    <p className="mt-1 text-sm text-secondary font-normal">
                        To journal accurately, we need to create a strategy first.
                    </p>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                        onClick={onCreateStrategy}
                    >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Create Strategy
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NoStrategyState;