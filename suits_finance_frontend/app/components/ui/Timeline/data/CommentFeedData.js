// CommentFeedData.js

import { createClient } from '@supabase/supabase-js';
import { SetKeyLocalStorage } from '@/app/client/caching/LocalStorageRouter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);


/**
 * Fetches comments from a specified table based on a column name and its value.
 * !!!! This relies on the `comments` column being present in the table. !!!!
 *
 * @param {Object} params - The parameters for fetching comments.
 * @param {string} params.table - The name of the table to fetch comments from.
 * @param {string} params.columnName - The name of the column to equal to.
 * @param {string|number} params.columnValue - The value of the column to match.
 * @returns {Promise<Object|null>} - Returns the first comment object if found, or null if no comments exist.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchComments({
    table,
    columnName,
    columnValue
}) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(columnName, columnValue);

    if (error) throw error;

    if (data.length === 0) {
        return null;
    }

    return data[0].comments;
}


/**
 * Adds a comment to a specified table and updates the comments array.
 *
 * @param {Object} params - The parameters for adding a comment.
 * @param {string} params.table - The name of the table to add the comment to.
 * @param {string} params.columnName - The name of the column to match.
 * @param {string|number} params.columnValue - The value of the column to match.
 * @param {string} params.comment - The comment text to be added.
 * @param {string} params.userId - The ID of the user adding the comment.
 * @param {string} params.username - The username of the user adding the comment.
 * @param {string} params.profile_pic - The profile picture URL of the user.
 * @param {string} params.type - The type of comment being added.
 * @returns {Promise<Object>} - Returns the updated comment data.
 * @throws {Error} - Throws an error if the add operation fails.
 */
export async function addComment({
    table,
    columnName,
    columnValue,
    comment,
    userId,
    username,
    profile_pic,
    type
}) {
    const commentId = `${columnValue}-${randomId()}`;

    // Check if the invoice_id is already present
    const {
        data: existingData,
        error: existingError
    } = await supabase
        .from(table)
        .select('comments')
        .eq(columnName, columnValue);

    if (existingError) throw existingError;

    if (existingData.length > 0) {
        // If columnValue (row id or similar) is present, update the comments key
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
            .from(table)
            .update({
                comments: updatedComments
            })
            .eq(columnName, columnValue);

        if (error) throw error;

        return data;
        
    } else {
        // If comment id is not present, insert a new record
        const { data, error } = await supabase
            .from(table)
            .insert([
                {
                    invoice_id: columnValue,
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

/**
 * Deletes a comment from a specified table.
 *
 * @param {Object} params - The parameters for deleting a comment.
 * @param {string} params.table - The name of the table to delete the comment from.
 * @param {string} params.columnName - The name of the column to match.
 * @param {string|number} params.columnValue - The value of the column to match.
 * @param {string} params.commentId - The ID of the comment to delete.
 * @returns {Promise<Object>} - Returns the updated comment data.
 * @throws {Error} - Throws an error if the delete operation fails.
 */
export async function deleteComment({
    table,
    columnName,
    columnValue,
    commentId, 
}) {
    const { data, error } = await supabase
        .from(table)
        .select('comments')
        .eq(columnName, columnValue);

    if (error) throw error;

    const updatedComments = data[0].comments.filter((comment) => comment.comment_id !== commentId);

    const { data: updatedData, error: updateError } = await supabase
        .from(table)
        .update({
            comments: updatedComments
        })
        .eq(columnName, columnValue);

    if (updateError) throw updateError;

    return updatedData;
}


/**
 * Generates a random ID for comments.
 * @returns {number} - A random integer between 0 and 999999.
 */
const randomId = () => Math.floor(Math.random() * 1000000);