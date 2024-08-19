// SupabaseUserData.js

import { createClient } from '@supabase/supabase-js';
import CreateTradeHash from '@/app/client/api/TradeApi';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';
import { user } from '@nextui-org/react';
import stripNameFromEmail from '../hooks/formatting/StripNameFromEmail';
import AddAuditLogEntry from '@/app/client/supabase/auditLog';

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


export async function addTransaction({
  user_id,
  title,
  amount,
  currency,
  recipient,
  sender,
  card = null,
}) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        user_id,
        title,
        amount,
        currency,
        recipient,
        sender,
        card,
        status: 'pending'
      }
    ]);

  if (error) throw error;

  return data;
}


export async function fetchTransactions({
  userId,
}) {
  if (!userId) {
    console.error('No user id provided');
    return [];
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)


  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('No transactions found for user:', userId);
    return [];
  }

  return data;
}


export async function deleteTransaction({
  transactionId,
}) {
  // Fetch the transaction to be deleted
  const { data: transactionData, error: fetchError } = await supabase
    .from('transactions')
    .select('*')
    .eq('transaction_id', transactionId)
    .single();

  if (fetchError) throw fetchError;

  // Insert the transaction into the transactions_archive table
  const { error: insertError } = await supabase
    .from('transactions_archive')
    .insert([transactionData]);

  if (insertError) throw insertError;

  // Delete the transaction from the transactions table
  const { data, error: deleteError } = await supabase
    .from('transactions')
    .delete()
    .eq('transaction_id', transactionId);

  if (deleteError) throw deleteError;

  return data;
}


export async function fetchUserInvoices({
  userId,
  invoiceId
}) {
  if (!userId) {
    console.error('No user id provided');
    return [];
  }

  const { data, error } = await supabase
    .from('invoices')
    .select('user_id, payoneer_invoice_id, payoneer_invoice_reference, invoice_id')
    .eq('user_id', userId)
    .eq('invoice_id', invoiceId);

  if (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('No invoices found for user:', userId);
    return [];
  }

  return data;

}

export async function getInvoiceById({
  invoiceId
}) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('invoice_id', invoiceId);

  console.log(data);
  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0];

}


export async function getUsernameById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('username, full_name')
    .eq('user_id', userId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0];
}


export async function fetchInvoiceComments({
  invoiceId
}) {
  const { data, error } = await supabase
    .from('invoices_comments')
    .select('*')
    .eq('invoice_id', invoiceId);

  if (error) throw error;

  if (data.length === 0) {
    return null;
  }

  return data[0].comments;
}


export async function addInvoiceComment({
  invoiceId,
  comment,
  userId,
  username,
  profile_pic,
  type
}) {
  const randomId = Math.floor(Math.random() * 1000000);
  const commentId = `${invoiceId}-${randomId}`;


  // Check if the invoice_id is already present
  const { data: existingData, error: existingError } = await supabase
    .from('invoices_comments')
    .select('comments')
    .eq('invoice_id', invoiceId);

  if (existingError) throw existingError;

  if (existingData.length > 0) {
    // If invoice_id is present, update the comments key
    const updatedComments = [
      ...existingData[0].comments,
      {
        comment: comment,
        user_id: userId,
        datetime: new Date().toISOString(),
        username: username,
        profile_pic: profile_pic,
        type: type,
        comment_id: commentId
      }
    ];

    const { data, error } = await supabase
      .from('invoices_comments')
      .update({ comments: updatedComments })
      .eq('invoice_id', invoiceId);

    if (error) throw error;

    return data;
  } else {
    // If invoice_id is not present, insert a new record
    const { data, error } = await supabase
      .from('invoices_comments')
      .insert([
        {
          invoice_id: invoiceId,
          comments: [
            {
              comment: comment,
              user_id: userId,
              datetime: new Date().toISOString(),
              username: username,
              profile_pic: profile_pic,
              type: type,
              comment_id: commentId
            }
          ]
        }
      ]);

    if (error) throw error;

    return data;
  }
}


export async function getInvoicePaidStatus(invoiceId) {
  const { data, error } = await supabase
    .from('invoices')
    .select('paid')
    .eq('invoice_id', invoiceId)
    .single();

  if (error) throw error;

  return data?.paid || false; // Return false if no data found
}

export async function updateInvoicePaidStatus({ invoiceId, isPaid }) {
  const { data, error } = await supabase
    .from('invoices')
    .update({
      paid: isPaid,
      status: isPaid ? 'paid' : 'unpaid'
    })
    .eq('invoice_id', invoiceId);

  if (error) throw error;

  return data;
}

export async function getInvoiceStatus({ invoiceId }) {
  const { data, error } = await supabase
    .from('invoices')
    .select('status')
    .eq('invoice_id', invoiceId)
    .single();

  if (error) throw error;

  return data?.status || 'unpaid'; // Return 'unpaid' if no data found
}