// SupabaseUserData.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

import { openDB } from 'idb';

async function getDB() {
  return openDB('tradeDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('trades')) {
        db.createObjectStore('trades', { keyPath: 'organization_id' });
      }
    },
  });
}




export async function GetPendingTradesByOrganization(organization, force = false) {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('organization_id', organization)
    .eq('awaiting_archive', false)

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}



export async function GetAlertStatusByTradeHash(tradeHash) {
  const { data, error } = await supabase
    .from('trades')
    .select('alerting')
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].alerting;
}

export async function UpdateTradeAlertStatus(tradeHash, alertStatus) {
  const { data, error } = await supabase
    .from('trades')
    .update({ alerting: alertStatus })
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data;
}


export async function UpdateTradeStatus(tradeHash, tradeStatus, pending = true) {
  const { data, error } = await supabase
    .from('trades')
    .update({
      trade_status: tradeStatus,
      pending: pending
    })
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data;
}


export async function UpdateArchiveTrade(tradeHash) {
  const { data, error } = await supabase
    .from('trades')
    .update({
      awaiting_archive: true,
    })
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data;
}


export async function UpdateMetadataBool(tradeHash, metadataBool) {
  const { data, error } = await supabase
    .from('trades')
    .update({ metadata_updating: metadataBool })
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data;
}

export async function IsTradeHashExoticToOrganization(tradeHash, organization) {
  const { data, error } = await supabase
    .from('trades')
    .select('trade_hash')
    .eq('trade_hash', tradeHash)
    .neq('organization_id', organization);

  if (error) throw error;

  return data.length >= 1;
}


export async function IsTradeHashValid(tradeHash) {
  const { data, error } = await supabase
    .from('trades')
    .select('trade_hash')
    .eq('trade_hash', tradeHash)

  if (error) throw error;

  return data.length >= 1;
}


export async function GetTradeStatusByTradeHash(tradeHash) {
  const { data, error } = await supabase
    .from('trades')
    .select('trade_status')
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].trade_status;
}