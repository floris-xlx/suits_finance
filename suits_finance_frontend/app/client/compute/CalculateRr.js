const calculateRR = (entry, sl, tp1, tp2, tp3) => {
  const rr = (tp) => ((tp - entry) / (entry - sl)).toFixed(1);
  return {
    rr_tp1: parseFloat(rr(tp1)),
    rr_tp2: parseFloat(rr(tp2)),
    rr_tp3: parseFloat(rr(tp3)),
  };
};

export default calculateRR;