import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// utils
import { getRelativeTime } from '@/app/client/hooks/datetime/RelativeDate';
import { useUserStore } from '@/app/stores/stores';

// ui
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import NoChat from '@/app/components/ui/EmptyStates/NoChat';

// supabase
import { fetchComments, addComment, deleteComment, getAllUsers } from '@/app/components/ui/Timeline/data/CommentFeedData';

// notifications
import { AddCommentSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

interface Comment {
    comment_id: number;
    username: string;
    profile_pic: string;
    comment: string;
    datetime: string;
    type: string;
    user_id: string;
    mention_user_id: string;
}

interface CommentFeedProps {
    title: string;
    tableName: string;
    columnValue: string;
    columnName: string;
    forceRefresh: boolean;
}

const CommentFeed: React.FC<CommentFeedProps> = ({
    title = 'Activity',
    tableName,
    columnValue,
    columnName,
    forceRefresh = false,
}) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMention, setIsMention] = useState<boolean>(false);
    const [tagUsers, setTagUsers] = useState([]);
    const [selectedTagUser, setSelectedTagUser] = useState(0);
    console.log("setSelectedTagUser", selectedTagUser);
    const { user } = useUserStore();

    console.log(tagUsers);

    useEffect(() => {
        handleFetchComments();
    }, []);

    const handleFetchComments = async () => {
        if (!tableName || !columnValue || !columnName) return

        const fetchedComments = await fetchComments({
            table: tableName,
            columnName: columnName,
            columnValue: columnValue,
        }) as Comment[]; // Ensure the fetched comments are of type Comment
        setLoading(false);
        setComments(fetchedComments || []);
    };

    const handleFetchUsers = async () => {
        const fetchedUsers = await getAllUsers();

        if (fetchedUsers) {
            setTagUsers(fetchedUsers);
        }
    };

    const handleNewComments = async () => {
        if (!comment.trim()) return; // Prevent empty comments

        const newComment = await addComment({
            table: tableName,
            columnName: columnName,
            columnValue: columnValue,
            comment: comment,
            userId: user?.id,
            username: user?.username,
            profile_pic: user?.profile_picture,
            type: 'commented',
            mentionUserId: tagUsers[selectedTagUser]?.user_id,
        });
        await handleFetchComments(); // Fetch comments again to update the UI
        setComment(''); // Clear the input field
        AddCommentSuccessNotification(); // Notify user of success
    };

    const handleDeleteComment = async (commentId: string) => {
        const result = await deleteComment({
            table: tableName,
            commentId: commentId,
            columnName: columnName,
            columnValue: columnValue,
        })

        // Fetch comments again to update the UI
        await handleFetchComments();
    };

    useEffect(() => {
        handleFetchComments();
        handleFetchUsers();
    }, [tableName, columnValue, columnName, forceRefresh]);

    // Scroll to the bottom whenever comments are updated
    useEffect(() => {
        const commentBox = document.getElementById('comment_box');
        if (commentBox) {
            commentBox.scrollTop = commentBox.scrollHeight;
        }



    }, [comments]);

    useEffect(() => {
        const mentionResult = doesCommentMention();
        setIsMention(mentionResult);
    }, [comment]);

    const handleAddUserToComment = () => {
        setComment((comment) => {
            const newComment = `${comment.replace(/@\w*\s*$/, '')}@${tagUsers[selectedTagUser].username}`;
            const textarea = document.getElementById('comment') as HTMLTextAreaElement;
            if (textarea) {
                const cursorPosition = textarea.selectionStart + tagUsers[selectedTagUser].username.length;
                setTimeout(() => {
                    textarea.setSelectionRange(cursorPosition, cursorPosition);
                }, 0);
            }
            return newComment;
        });
        setIsMention(false);
    }
    

    const handleAddUserToCommentWithClick = (username) => {
        setComment((comment) => {
            const newComment = `${comment.replace(/@\w*\s*$/, '')}@${username}`;
            return newComment;
        });
        setIsMention(false);
    }


    const doesCommentMention = () => {
        const mentionRegex = /@\w+/g;
        const matches = comment.match(mentionRegex);
        if (matches) {
            for (const match of matches) {
                const username = match.slice(1); // Remove the '@' character
                if (tagUsers.some(user => user.username === username)) {
                    return false; // Ignore if it's an existing username
                }
            }
        }
        return comment.includes('@');
    }


    const handleKeyDown = (e) => {
        if (!isMention) return;

        if (e.key === 'ArrowDown') {
            setSelectedTagUser((prev) => (prev + 1) % tagUsers.length);
            e.preventDefault(); // Prevent default behavior to ensure the arrow key works
        } else if (e.key === 'ArrowUp') {
            setSelectedTagUser((prev) => (prev - 1 + tagUsers.length) % tagUsers.length);
            e.preventDefault(); // Prevent default behavior to ensure the arrow key works
        } else if (e.key === 'Enter') {
            handleAddUserToComment();
            e.preventDefault(); // Prevent default behavior to ensure the enter key works
        }
    };

    return (
        <div className="lg:col-start-3">
            <h2 className="text-sm font-semibold leading-6 text-primary select-none">
                {title}
            </h2>
            <ul
                role="list"
                id="comment_box"
                key="comment_box"
                className={`mt-6 space-y-1 overflow-y-auto ${isMention ? 'max-h-[322px]' : 'max-h-96'} overflow-x-hidden max-w-[400px]`}
            >
                {loading && (
                    <div className="w-[382px] h-[250px] overflow-hidden mb-4">
                        <SkeletonLoader />
                    </div>
                )}

                < NoChat show={comments?.length === 0 && loading === false} text='No activity yet' />

                {comments?.map((commentItem, commentItemIdx) => (
                    <li
                        key={commentItem?.comment_id}
                        className="relative flex gap-x-2"
                    >
                        <div
                            className={`absolute left-0 top-0 flex w-6 justify-center ${commentItemIdx === comments?.length - 1 ? 'h-6' : '-bottom-6'}`}
                        >
                            <div className="w-px bg-accent" />
                        </div>
                        {commentItem?.type === 'commented' ? (
                            <>
                                <Image
                                    src={commentItem?.profile_pic}
                                    alt=""
                                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-secondary"
                                    width={24}
                                    height={24}
                                />
                                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-primary">
                                    <div className="flex justify-between ">
                                        <div className="py-0.5 text-xs leading-5 text-secondary">
                                            <span className="font-medium text-primary select-none">
                                                {commentItem?.username}
                                            </span>{' '}
                                            commented
                                        </div>
                                        <div className="flex flex-col">
                                            <time
                                                dateTime={commentItem?.datetime}
                                                className="flex-none py-0.5 text-xs leading-5 text-secondary"
                                            >
                                                {getRelativeTime(commentItem?.datetime)}
                                            </time>



                                        </div>
                                    </div>
                                    <div className="w-full  rounded-md ">
                                        <p className={`text-sm leading-6 break-words w-[320px] ${commentItem?.mention_user_id === user.id ? ' bg-orange-primary text-primary border-l-2 border-orange-secondary rounded-r-md pl-2 w-full' : 'text-secondary'}`}>
                                            {commentItem?.mention_user_id === user.id ? (
                                                commentItem?.comment
                                            ) : (
                                                commentItem?.comment.split(' ').map((word, index) => (
                                                    <span key={index} className={word.startsWith('@') ? 'bg-accent pl-[5px] pb-[3px] pt-[1px] px-[4px] mr-[4px] rounded-md' : ''}>
                                                        {word}{' '}
                                                    </span>
                                                ))
                                            )}
                                        </p>
                                    </div>

                                    </div>
                                </>
                                ) : (
                                <>
                                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-primary ">
                                        {commentItem?.type === 'paid' ? (
                                            <CheckCircleIcon
                                                className="h-6 w-6 text-brand-primary"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <div className="h-1.5 w-1.5 rounded-full bg-secondary ring-1 ring-primary" />
                                        )}
                                    </div>
                                    <p className="flex-auto py-0.5 text-xs leading-5 text-secondary ml-3  ">
                                        <span className="font-medium text-primary select-none">
                                            {commentItem?.username}
                                        </span>{' '}
                                        {commentItem?.type} the invoice.
                                    </p>
                                    <time
                                        dateTime={commentItem?.datetime}
                                        className="flex-none py-0.5 text-xs leading-5 text-secondary pr-[4px] select-none"
                                    >
                                        {getRelativeTime(commentItem?.datetime)}
                                    </time>
                                </>
                        )}
                            </li>
                ))}
                    </ul>

            {/* New comment form */ }
            { isMention && (
                        <div className="pl-[36px]">
                            <div className="w-full mt-1 border border-primary rounded-md min-h-[50px] mb-2 flex p-2 px-3 flex-col gap-y-3 overflow-y-scroll"
                                onKeyDown={handleKeyDown}
                                
                                tabIndex={0}
                            >
                                {tagUsers && tagUsers.map((user, index) => (
                                    <button
                                        key={user.username}
                                        onClick={() => handleAddUserToCommentWithClick(user.username)}
                                        className={`text-sm text-primary rounded-md p-2 cursor-pointer hover:bg-accent select-none ${selectedTagUser === index ? 'bg-blue-300/40 ' : ''}`}
                                    >
                                        {user.username}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                <div className=" flex gap-x-3 mt-2">
                    <Image
                        src={user?.profile_picture}
                        alt=""
                        className="h-6 w-6 flex-none rounded-full bg-secondary"
                        width={24}
                        height={24}
                    />

                    <div className="relative flex-auto">

                        <div className="p-2 px-4 overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-primary focus-within:ring-2 focus-within:ring-indigo-600 border border-primary">


                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>


                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                value={comment}

                                onChange={(e) => {
                                    if (!isMention || (isMention && e.nativeEvent.inputType === 'deleteContentBackward')) {
                                        setComment(e.target.value);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !isMention) {
                                        handleNewComments();
                                    } else if (isMention && e.key === 'ArrowDown') {
                                        e.preventDefault();
                                    } else {
                                        handleKeyDown(e);
                                    }
                                }}

                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-primary placeholder:text-secondary focus:ring-0 sm:text-sm sm:leading-6 h-[50px] pointer-events-auto"
                                placeholder=""
                            />


                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                            <button
                                onClick={handleNewComments}
                                type="button"
                                className="rounded-md bg-input-primary px-2.5 py-1.5 text-sm font-normal text-primary shadow-sm  ring-primary hover:bg-accent border border-primary hover:transition select-none"
                            >
                                Comment

                            </button>

                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CommentFeed;