import React from 'react'

const SkeletonLoader = ({
    marginTop = 0,
    transparent = false
}) => {
    const formattedMarginTop = `mt-[${marginTop}px]`;

    return (
        <div className={`w-full h-full overflow-hidden relative rounded-md ${transparent ? 'bg-transparent' : 'bg-skeleton'} before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-400/30 before:to-transparent ${formattedMarginTop}`}>
            <div className={`w-full h-full rounded-lg text-color ${transparent ? 'bg-transparent' : 'bg-skeleton'}`}></div>
        </div>
    )
}

export default SkeletonLoader