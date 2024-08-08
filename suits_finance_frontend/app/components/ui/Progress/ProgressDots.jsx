import React, { useState, useEffect } from 'react';

const ProgressDots = ({ progressDots }) => {
    return (
        <div className="flex items-center gap-6 select-none">
            <div className={`w-3 h-3 rounded-full ${progressDots >= 1 ? 'bg-brand-primary' : 'bg-accent'} `}></div>
            <div className={`w-3 h-3 rounded-full ${progressDots >= 2 ? 'bg-brand-primary' : 'bg-accent'} `}></div>
            <div className={`w-3 h-3 rounded-full ${progressDots >= 3 ? 'bg-brand-primary' : 'bg-accent'} `}></div>
        </div>
    )
}

export default ProgressDots;