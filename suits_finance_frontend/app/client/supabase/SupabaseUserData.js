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


export async function UpsertUser(
  user_id,
  full_name,
  email,
  username
) {
  // Assume empty string if any parameter except user_id is null
  full_name = full_name || '';
  email = email || '';
  username = username || '';

  const { data, error } = await supabase
    .from('users')
    .select('user_id')
    .eq('user_id', user_id);

  if (error) {
    console.error('Error fetching user:', error);
    throw error;
  }

  if (data.length === 0) {
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        "user_id": user_id,
        "last_sign_in": Math.floor(Date.now() / 1000),
        "full_name": full_name,
        "email": email,
        "username": username
      });

    if (insertError) {
      console.error('Error inserting user:', insertError);
      throw insertError;
    }
    return { upserted: true };
  }

  return { upserted: false };
}

export async function getUserObjectById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0];
}

export async function IsEmailUnique(email, userId) {
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .neq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return true;
  }

  return false;
}

export async function IsEmailUniqueRoles({ email }) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('email')
    .eq('email', email)


  if (error) throw error;

  if (data.length === 0) {
    return true;
  }

  return false;
}


export async function getUserBalance(id) {
  const { data, error } = await supabase
    .from('users')
    .select('balance')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].balance;
}

export async function getUserCards(id) {
  const { data, error } = await supabase
    .from('cards')
    .select('user_id, card_holder_name, provider, last_4, iban, card_id')
    .eq('user_id', id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data;
}

export async function addPayoneerCard({
  user_id,
  card_holder_name,
  card_expiry,
  card_iban,
}) {
  const last_4 = card_iban.slice(-4);
  const provider = 'Payoneer';

  const { data, error } = await supabase.from('cards').insert([
    {
      user_id,
      card_holder_name,
      card_expiry,
      provider,
      last_4,
      iban: card_iban,
    },
  ]);

  if (error) throw error;

  return data;
}


export async function archivePayoneerCard({
  card_id,
}) {
  const { data: cardData, error: fetchError } = await supabase
    .from('cards')
    .select('*')
    .eq('card_id', card_id)
    .single();

  if (fetchError) throw fetchError;

  const { data: archiveData, error: archiveError } = await supabase
    .from('cards_archived')
    .insert([cardData]);

  if (archiveError) throw archiveError;

  const { data: deleteData, error: deleteError } = await supabase
    .from('cards')
    .delete()
    .eq('card_id', card_id);

  if (deleteError) throw deleteError;

  return archiveData;
}

export async function isUserSuperAdmin({ user_id }) {
  const { data, error } = await supabase
    .from('users')
    .select('super_admin')
    .eq('user_id', user_id);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].super_admin;
}


export async function addUserRoleObject({ email, role }) {
  let userId = null;

  // Try to get the user_id from the users table using the email
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('user_id')
    .eq('email', email)
    .single();

  if (userError && userError.code !== 'PGRST116') { // PGRST116: No rows found
    throw userError;
  }

  if (userData) {
    userId = userData.user_id;
  }

  const { data, error, status } = await supabase.from('user_roles').insert([
    {
      email,
      role,
      status: userId ? 'complete' : 'pending',
      user_id: userId
    },
  ]);

  if (error) throw error;
  console.log(status);

  return status;
}



export async function fetchUserRoles(
  page = 1,
  pageSize = 10
) {
  const offset = (page - 1) * pageSize;

  const { data: userRolesData, error: userRolesError } = await supabase
    .from('user_roles')
    .select('*')
    .order('id', { ascending: true })
    .range(offset, offset + pageSize - 1);

  if (userRolesError) throw userRolesError;

  const userIds = userRolesData.map(role => role.user_id);

  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('user_id', userIds);

  if (usersError) throw usersError;

  const combinedData = userRolesData.map(role => {
    const user = usersData.find(user => user.user_id === role.user_id);
    if (user && role.status === 'pending') {
      role.status = 'complete';
    }
    return {
      ...role,
      user
    };
  });

  return combinedData;
}


export async function deleteUserRole(
  userId
) {
  const column = typeof userId === 'number' ? 'id' : 'user_id';

  const { data, error } = await supabase
    .from('user_roles')
    .delete()
    .eq(column, userId);

  if (error) throw error;

  return data;
}


export async function freezeUserAccount(
  userId,
  freeze
) {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .update({
      is_frozen: freeze,
      status: freeze ? 'frozen' : 'active'
    })
    .eq('user_id', userId);

  if (userError) throw userError;

  const status = freeze ? 'frozen' : 'active';

  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .update({
      status: status
    })
    .eq('user_id', userId);

  if (roleError) throw roleError;

  return { userData, roleData };
}


export async function isFrozenUserId(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('is_frozen')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].is_frozen;
}


export async function flagUserAccount(userId, flag) {
  const { data, error } = await supabase
    .from('users')
    .update({
      is_flagged: flag
    })
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}


export async function isFlaggedUserId(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('is_flagged')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].is_flagged;
}