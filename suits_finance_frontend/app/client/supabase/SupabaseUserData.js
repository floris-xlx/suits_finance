// SupabaseUserData.js

import { createClient } from '@supabase/supabase-js';
import CreateTradeHash from '@/app/client/api/TradeApi';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import { user } from '@nextui-org/react';
import stripNameFromEmail from '../hooks/formatting/StripNameFromEmail';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

export async function GetUserNameById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  const username = data[0].username;

  SetKeyLocalStorage('username', username);

  return username;
}


// fetch the complete algo data from table dashboard_algos
// get owner_name, build_id, recent_activity, status, name
export async function GetAlgoDataById(id) {
  const { data, error } = await supabase
    .from('dashboard_algos')
    .select('owner_name, build_id, recent_activity, status, name')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function GetTradesById(id) {
  const { data, error } = await supabase
    .from('trades')
    .select('trade_id, created_at, pairname, summary, outcome')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function GetTotalGeneratedSignals(id) {
  const { data, error } = await supabase
    .from('dashboard_users_stats')
    .select('total_generated_signals')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].total_generated_signals;
}

// get current pending trades
export async function GetPendingTrades(id) {
  const { data, error } = await supabase
    .from('dashboard_users_stats')
    .select('pending_trades')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].pending_trades;
}

export async function GetTotalProcessedCandles(id) {
  const { data, error } = await supabase
    .from('dashboard_users_stats')
    .select('total_processed_candles')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }
  return data[0].total_processed_candles;
}

// get user notifications_amount
export async function GetNotificationsAmount(id) {
  const { data, error } = await supabase
    .from('dashboard_users_stats')
    .select('notifications_amount')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].notifications_amount;
}

// estimated_winrate
export async function GetEstimatedWinrate(id) {
  const { data, error } = await supabase
    .from('dashboard_users_stats')
    .select('estimated_winrate')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].estimated_winrate;
}

export async function GetSubscriptionTypeById(id) {
  const { data, error } = await supabase
    .from('dashboard_users')
    .select('subscription_type')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].subscription_type;
}

export async function GetProfilePicById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('profile_pic')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }

  return data[0].profile_pic;
}

export async function UpdateOrganizationById(organization, id) {
  const username = await GetUserNameById(id);

  // Upsert the user_id separately
  const { error: userIdError } = await supabase
    .from('users')
    .upsert({ user_id: id });

  if (userIdError) throw userIdError;

  // Update the organization and username
  const { data, error } = await supabase
    .from('users')
    .update({ 
      organization: organization, 
      username: username 
    })
    .eq('user_id', id);

  if (error) throw error;

  return data;
}


export async function GetEmailById(id) {
  const { data, error } = await supabase
    .from('dashboard_users')
    .select('email')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].email;
}


export async function CreateNewStrategyById(strategyName, id, strategyHash) {
  const { data, error } = await supabase.from('strategies').insert([
    {
      name: strategyName,
      user_id: id,
      strategy_hash: strategyHash,
    },
  ]);

  if (error) throw error;

  return data;
}

export async function AddCurrencyById(currency, id) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ currency: currency, user_id: id }]);

  // 23505 is the error code for unique constraint violation
  // upsert it then

  if (error && error.code === '23505') {
    const { data, error } = await supabase
      .from('users')
      .upsert([{ currency: currency, user_id: id }]);

    if (error) throw error;
  }

  return data;
}

export async function UpdateCurrencyById(currency, id) {
  const { data, error } = await supabase
    .from('users')
    .update({ currency: currency })
    .eq('user_id', id);

  if (error) throw error;

  return data;
}

export async function GetCurrencyById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('currency')
    .eq('user_id', id);

  if (error) throw error;
  if (data.length === 0) {
    return null;
  }
  return data[0].currency;
}

export async function GetAllStrategyNamesById(id) {
  const { data, error } = await supabase
    .from('strategies')
    .select('name, strategy_hash')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function GetAllStrategyHashesById(id) {
  const { data, error } = await supabase
    .from('strategies')
    .select('strategy_hash')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function GetAllEconEvents() {
  const { data, error } = await supabase
    .from('econ_events')
    .select(
      'date, unixtime, event_title, event_impact_title, country, currency, forecast, previous'
    );

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }
  return data;
}

export async function AddTrade(
  tradeHash,
  symbol,
  entryLevel,
  stoplossLevel,
  takeProfitLevel,
  takeProfitLevel2,
  takeProfitLevel3,
  unixtime,
  organization,
  timeframe,
  algorithm_id
) {
  const direction = stoplossLevel > entryLevel ? 'sell' : 'buy';
  const currentUnixtime = Math.floor(new Date().getTime() / 1000);


  const { data, error } = await supabase.from('trades').insert([
    {
      user_id: organization,
      algorithm_id: algorithm_id,
      organization_id: organization,
      pairname: symbol,
      time_for_management: unixtime,
      trade_hash: tradeHash,
      entry_level: entryLevel,
      stoploss_level: stoplossLevel,
      tp1_level: takeProfitLevel,
      tp2_level: takeProfitLevel2,
      tp3_level: takeProfitLevel3,
      timeframe: timeframe,
      time: unixtime,
      stoploss_entry_level: takeProfitLevel,
      direction: direction,
      created_at_unixtime: currentUnixtime
    },
  ]);

  if (error === !null) {
    return error;
  }

  if (error) throw error;

  if (error === null) {
    return tradeHash;
  }

  return data;
}

export async function AddTradeById(trade, userId) {
  const unix_time = trade.unix_time;
  const trade_hash = await CreateTradeHash(
    trade.pairname,
    userId,
    unix_time,
    trade.entry_level
  );

  const { data, error } = await supabase.from('journal_trades').insert([
    {
      user_id: userId,
      date: trade.date,
      chart_link: trade.chart_link,
      pairname: trade.pairname,
      entry: trade.entry_level,
      sl_level: trade.stoploss_level,
      tp_level_1: trade.take_profit_level,
      tp_level_2: trade.take_profit_level2,
      tp_level_3: trade.take_profit_level3,
      strategy_hash: trade.strategy,
      trade_hash: trade_hash,
      unix_time: trade.unix_time,
      session: trade.session,
    },
  ]);

  if (error === !null) {
    return error;
  }

  if (error) throw error;

  if (error === null) {
    return trade_hash;
  }

  return data;
}

// get all trades by user_id FIXME - this should be a join with strategies

export async function GetAllTradesByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .select(
      'trade_hash, pairname, position_size, outcome, date, pnl, entry, outcome, unix_time, session'
    )
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function DeleteTradeByTradeHash(tradeHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .delete()
    .eq('trade_hash', tradeHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetTradeMetadatByTradeHash(tradeHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .select('pairname, position_size, pnl, outcome')
    .eq('trade_hash', tradeHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function UpdateTradeByTradeHash(tradeHash, userId, trade) {
  const { data, error } = await supabase
    .from('journal_trades')
    .update({
      pairname: trade.newPairname,
      position_size: trade.positionSize,
      pnl: trade.pnl,
      outcome: trade.outcome,
    })
    .eq('trade_hash', tradeHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function UpdateDescriptionByStrategyHash(
  strategyHash,
  userId,
  description
) {
  const { data, error } = await supabase
    .from('strategies')
    .update({ description: description })
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetDescriptionByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('strategies')
    .select('description')
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].description;
}

export async function SaveAccountSizeById(accountSize, userId) {
  const { data, error } = await supabase
    .from('users')
    .update({ account_size: accountSize })
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetAccountSizeById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('account_size')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].account_size;
}

export async function SaveRiskPerTradeById(riskPerTrade, userId) {
  const { data, error } = await supabase
    .from('users')
    .update({ risk_per_trade: riskPerTrade })
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetRiskPerTradeById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('risk_per_trade')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].risk_per_trade;
}

export async function GetAllSessionsByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .select('session')
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function SaveMostTradedSessionByStrategyHash(
  strategyHash,
  userId,
  session
) {
  const { data, error } = await supabase
    .from('strategies')
    .update({ most_traded_sessions: session })
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetFullStrategyObjectByStrategyHash(
  strategyHash,
  userId
) {
  const { data, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function ArchiveStrategyByStrategyHash(
  strategyHash,
  name,
  description,
  most_traded_sessions,
  userId
) {
  const { data, error } = await supabase.from('archive_strategies').insert([
    {
      strategy_hash: strategyHash,
      name: name,
      description: description,
      most_traded_sessions: most_traded_sessions,
      user_id: userId,
      is_archived: true,
    },
  ]);

  if (error) throw error;

  return data;
}

export async function DeleteStrategyByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('strategies')
    .delete()
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function GetFullTradeObjectsByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .select('*')
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function DeleteAllTradesByStrategyHash(strategyHash, userId) {
  const { data, error } = await supabase
    .from('journal_trades')
    .delete()
    .eq('strategy_hash', strategyHash)
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}


export async function GetOrganizationByUserId(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('organization')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  const organization = data[0].organization;
  SetKeyLocalStorage('organization', organization);

  return organization;
}

export async function IsUserOrgAdmin(userId) {
  if (!userId) {
    return null;
  }


  const { data, error } = await supabase
    .from('users')
    .select('organization_admin')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].organization_admin;
}


export async function IsUserOrganizationAdmin(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('global_admin')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].global_admin;
}

export async function GetUserFeatureFlags(userId) {
  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from('feature_flags')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0];
}



export async function ArchiveTradeByTradeHash(tradeObject, userId) {
  const { data, error } = await supabase.from('archive_trades').insert([
    {
      user_id: userId,
      created_at: tradeObject.created_at,
      strategy_hash: tradeObject.strategy_hash,
      date: tradeObject.date,
      session: tradeObject.session,
      chart_link: tradeObject.chart_link,
      pairname: tradeObject.pairname,
      entry: tradeObject.entry,
      sl_level: tradeObject.sl_level,
      tp_level_1: tradeObject.tp_level_1,
      tp_level_2: tradeObject.tp_level_2,
      tp_level_3: tradeObject.tp_level_3,
      position_size: tradeObject.position_size,
      trade_hash: tradeObject.trade_hash,
      outcome: tradeObject.outcome,
      pnl: tradeObject.pnl,
      unix_time: tradeObject.unix_time,
      rr_tp_1: tradeObject.rr_tp_1,
      rr_tp_2: tradeObject.rr_tp_2,
      rr_tp_3: tradeObject.rr_tp_3,
      outcome_tp_1: tradeObject.outcome_tp_1,
      outcome_tp_2: tradeObject.outcome_tp_2,
      outcome_tp_3: tradeObject.outcome_tp_3,
      outcome_total: tradeObject.outcome_total,
      rr_total: tradeObject.rr_total,
      pips_tp_1: tradeObject.pips_tp_1,
      pips_tp_2: tradeObject.pips_tp_2,
      pips_tp_3: tradeObject.pips_tp_3,
      percent_tp_1: tradeObject.percent_tp_1,
      percent_tp_2: tradeObject.percent_tp_2,
      percent_tp_3: tradeObject.percent_tp_3,
      is_archived: true,
    },
  ]);

  if (error) throw error;

  return data;
}


export async function GetEconEvents(time) {
  const { data, error } = await supabase
    .from('econ_events')
    .select('datetime, unixtime, event_impact_title, currency, forecast, previous, event_title')
    .gt('unixtime', time);

    

  if (error) throw error;
  
  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function GetStrategyById(strategy_id) {
  const { data, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('strategy_id', strategy_id);

    

  if (error) throw error;
  
  if (data.length === 0) {
    return null;
  }

  return data;
}


export async function GetTradesByStrategyId(strategy_id) {
  const { data: tradesData, error: tradesError } = await supabase
    .from('trades')
    .select('*')
    .eq('strategy_id', strategy_id);

  if (tradesError) throw tradesError;

  // const { data: archiveData, error: archiveError } = await supabase
  //   .from('trades_archiveXXX')
  //   .select('*')
  //   .eq('strategy_id', strategy_id);

  // if (archiveError) throw archiveError;

  // const combinedData = [...(tradesData || []), ...(archiveData || [])];

  if (tradesData.length === 0) {
    return null;
  }

  return tradesData;
}