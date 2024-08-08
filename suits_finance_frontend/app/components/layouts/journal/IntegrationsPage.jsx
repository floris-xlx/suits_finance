import React from "react";

const IntegrationsPage = ({ setNotification, userId }) => {
    return (
        <div>
            <div className="bg-secondary rounded-md border-primary border sm:h-[200px] h-[220px] w-full">
                <div className="flex flex-row border-b border-primary">
                    <h1 className="text-xl font-semibold text-primary p-4 ">
                        Integrations
                    </h1>
                </div>

                <div className="flex flex-wrap gap-2 mx-auto mt-4 sm:pl-4 flex-col">
                    <div className="flex flex-col sm:flex-row items-center justify-between pr-8">
                        <h1 className="text-sm sm:text-md font-normal text-primary p-4">
                            Integrate economic events alerts to your Discord server
                        </h1>

                        <a
                            href="https://xylex.ai/add-me"
                            target="_blank"
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition  max-w-full ml-[32px] sm:ml-[0px] sm:max-w-[170px] h-[40px]"
                        >
                            Connect to Discord
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntegrationsPage;