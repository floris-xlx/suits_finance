// SupabaseUserData.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);


export async function IsUserIdGlobalAdmin(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('super_admin')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return false;
  }

  return data[0].super_admin;
}


export async function UpdateUserPreferences(
  userId,
  preferenceKey,
  preferenceValue
) {
  if (preferenceKey === 'organization') {
    throw new Error('Updating organization is not allowed.');
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      [preferenceKey]: preferenceValue
    })
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

export async function UpdateOrgPreferences(
  organization,
  preferenceKey,
  preferenceValue
) {
  if (preferenceKey === 'organization') {
    throw new Error('Updating organization is not allowed.');
  }

  const { data, error } = await supabase
    .from('organizations')
    .update({
      [preferenceKey]: preferenceValue
    })
    .eq('organization_name', organization);

  if (error) throw error;

  return data;
}

export async function UpdateAlgoPreferences(
  algorithmId,
  preferenceKey,
  preferenceValue
) {
  if (preferenceKey === 'organization' || preferenceKey === 'algorithm_id') {
    throw new Error('Updating organization is not allowed.');
  }

  const { data, error } = await supabase
    .from('algorithms')
    .update({
      [preferenceKey]: preferenceValue
    })
    .eq('algorithm_id', algorithmId);

  if (error) throw error;

  return data;
}

export async function UpdateTradePreferences(
  tradeHash,
  preferenceKey,
  preferenceValue
) {
  if (preferenceKey === 'trade_hash') {
    throw new Error('Updating trade_hash is not allowed.');
  } else if (preferenceKey === 'organization') {
    throw new Error('Updating organization is not allowed.');
  }

  const { data, error } = await supabase
    .from('trades')
    .update({
      [preferenceKey]: preferenceValue
    })
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data;
}


export async function GetTradePreferences(tradeHash, preferenceKey) {
  const { data, error } = await supabase
    .from('trades')
    .select(preferenceKey)
    .eq('trade_hash', tradeHash);

  if (error) throw error;

  return data[0];
}


export async function AddAuditLogEntry(username, userId, route, action) {
  const current_unixtime = Math.floor(Date.now() / 1000);

  const { data, error } = await supabase
    .from('audit_log')
    .insert([
      {
        username: username,
        user_id: userId,
        action: action,
        unix_time: current_unixtime,
        route: route
      }
    ]);

  if (error) throw error;

  return data;
}


export async function GetAlgorithmsByOrganization(organization) {
  const { data, error } = await supabase
    .from('algorithms')
    .select('name')
    .eq('organization', organization);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}
