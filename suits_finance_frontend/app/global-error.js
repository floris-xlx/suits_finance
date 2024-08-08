'use client'

import React from 'react';

export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body>
                <h2 className="text-primary">Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}