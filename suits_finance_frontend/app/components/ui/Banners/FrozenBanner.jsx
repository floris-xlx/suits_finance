import { XMarkIcon } from '@heroicons/react/20/solid'

export default function FrozenBanner() {
    return (
        <div className="flex  flex-row min-h-[50px] bg-blue-primary text-blue border-2 border-blue-600/30">
            <div className="flex flex-row items-center gap-x-4 gap-y-2 mx-auto ">
                <p className="text-xs leading-6 text-blue select-none text-center mx-auto w-full sm:text-sm sm:leading-5">
                    <strong className="font-semibold select-none">Account Frozen!</strong>
                    <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    Your account has been frozen due to suspicious activity. Please contact support.
                </p>
            </div>
        </div>
    )
}