const countSessions = ({ sessions }) => {

  if (!sessions) {
    return [
      { session: "Asia", trades: 0 },
      { session: "Asia - London", trades: 0 },
      { session: "London", trades: 0 },
      { session: "London - New York", trades: 0 },
      { session: "New York", trades: 0 }
    ];
  }

  const sessionTrades = sessions.reduce((acc, { session }) => {
    if (!acc[session]) {
      acc[session] = 1;
    } else {
      acc[session] += 1;
    }
    return acc;

  }, {
    "Asia": 0,
    "Asia - London": 0,
    "London": 0,
    "London - New York": 0,
    "New York": 0
  });

  return Object.entries(sessionTrades).map(([session, trades]) => ({
    session,
    trades,
  }));
};

export default countSessions;
