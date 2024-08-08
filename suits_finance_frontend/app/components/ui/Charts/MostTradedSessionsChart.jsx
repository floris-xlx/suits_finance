import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';

import { GetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import {
  GetAllSessionsByStrategyHash,
  SaveMostTradedSessionByStrategyHash
} from "@/app/client/supabase/SupabaseUserData.js";

import countSessions from "@/app/client/compute/MostTradedSession.js";


const MostTradedSessionsChart = ({ userId }) => {
  const [mostTradedSession, setMostTradedSession] = useState(null);

  useEffect(() => {
    const strategyHash = GetKeyLocalStorage('strategyHash');
    const SessionData = GetAllSessionsByStrategyHash(strategyHash, userId);

    SessionData.then((sessions) => {
      const mostTradedSession = countSessions({ sessions });
      SaveMostTradedSessionByStrategyHash(strategyHash, mostTradedSession);
      setMostTradedSession(mostTradedSession);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mostTradedSession} className="text-sm font-normal">
        <PolarGrid stroke="var(--color-chart-contrast)"/>
          <PolarAngleAxis
            dataKey="session"
            stroke="var(--color-text-accent)"
          />

        <Radar
          name="Amount of trades"
          dataKey="trades"
          stroke="var(--color-brand-primary)"
          fill="var(--color-brand-disabled)"
          fillOpacity={0.6}
        />

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}


export default MostTradedSessionsChart;