import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// utils
import { getRelativeTime } from '@/app/client/hooks/datetime/RelativeDate';
import { useUserStore } from '@/app/stores/stores';

// ui
import { CheckCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import NoChat from '@/app/components/ui/EmptyStates/NoChat';

// supabase
import { fetchComments, addComment } from '@/app/components/ui/Timeline/data/CommentFeedData';

// notifications
import { AddCommentSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx';

interface Comment {
    comment_id: number;
    username: string;
    profile_pic: string;
    comment: string;
    datetime: string;
    type: string;
}

interface CommentFeedProps {
    title: string;
    tableName: string;
    columnValue: string;
    columnName: string;
}

const CommentFeed: React.FC<CommentFeedProps> = ({
    title = 'Activity',
    tableName,
    columnValue,
    columnName
}) => {
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUserStore();

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
        });
        await handleFetchComments(); // Fetch comments again to update the UI
        setComment(''); // Clear the input field
        AddCommentSuccessNotification(); // Notify user of success
    };

    useEffect(() => {
        handleFetchComments();
    }, [tableName, columnValue]);

    // Scroll to the bottom whenever comments are updated
    useEffect(() => {
        const commentBox = document.getElementById('comment_box');
        if (commentBox) {
            commentBox.scrollTop = commentBox.scrollHeight;
        }
    }, [comments]);

    return (
        <div className="lg:col-start-3">
            <h2 className="text-sm font-semibold leading-6 text-primary select-none">
                {title}
            </h2>
            <ul
                role="list"
                id="comment_box"
                key="comment_box"
                className="mt-6 space-y-1 overflow-y-auto max-h-96 overflow-x-hidden max-w-[400px]"
            >
                {loading && (
                    <div className="w-[382px] h-[250px] overflow-hidden">
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
                                        <time
                                            dateTime={commentItem?.datetime}
                                            className="flex-none py-0.5 text-xs leading-5 text-secondary"
                                        >
                                            {getRelativeTime(commentItem?.datetime)}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-6 text-secondary break-words w-[320px] ">
                                        {commentItem?.comment}
                                    </p>
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

            {/* New comment form */}
            <div className="mt-6 flex gap-x-3">
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
                            onChange={(e) => setComment(e.target.value)}
                            className="block w-full resize-none border-0 bg-transparent py-1.5 text-primary placeholder:text-secondary focus:ring-0 sm:text-sm sm:leading-6"
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