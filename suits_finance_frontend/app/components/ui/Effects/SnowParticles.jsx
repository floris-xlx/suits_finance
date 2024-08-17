import React from 'react';
import Snowfall from 'react-snowfall';

const SnowingParticles = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Snowfall snowflakeCount={200} />
    </div>
);

export default SnowingParticles;