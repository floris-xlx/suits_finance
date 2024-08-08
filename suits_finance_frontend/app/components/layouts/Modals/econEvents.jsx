import React, { Fragment, useState, useEffect } from 'react';

import { GetEconEvents } from '@/app/client/supabase/SupabaseUserData';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';

const EconEvents = () => {
    const [econEvents, setEconEvents] = useState([]);

    let unix_time = Math.floor(Date.now() / 1000) ;

    useEffect(() => {
        GetEconEvents(unix_time).then((data) => {
            if (data) {
                setEconEvents(data);
            } else {
                setEconEvents([]);
            }
        });
    }, []);

    const relativeTimeUnix = (unixTime) => {
        // calculate time difference from now
        const difference = unixTime - Math.floor(Date.now() / 1000);

        // calculate days, hours, and minutes
        const minutes = Math.floor(Math.abs(difference) / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;

        const dayLabel = days === 1 ? 'day' : 'days';
        const hourLabel = remainingHours === 1 ? 'hour' : 'hours';
        const minuteLabel = remainingMinutes === 1 ? 'minute' : 'minutes';

        
        const formatTime = ({ prefix, days, dayLabel, hours, hourLabel, minutes, minuteLabel, suffix = '' }) => {
            let result = '';
            if (days > 0) {
                result += `${prefix} ${days} ${dayLabel}`;
                if (hours > 0) {
                    result += ` ${hours} ${hourLabel}`;
                }
                if (minutes > 0) {
                    result += ` ${minutes} ${minuteLabel}`;
                }
            } else if (hours > 0) {
                result += `${prefix} ${hours} ${hourLabel}`;
                if (minutes > 0) {
                    result += ` ${minutes} ${minuteLabel}`;
                }
            } else {
                result += `${prefix} ${minutes} ${minuteLabel}`;
            }
            return result + suffix;
        };

        if (difference > 0) {
            if (days > 0) {
                return formatTime({ prefix: 'in', days, dayLabel, hours: remainingHours, hourLabel, minutes: remainingMinutes, minuteLabel });
            } else if (hours > 0) {
                return formatTime({ prefix: 'in', days: 0, dayLabel: '', hours, hourLabel, minutes: remainingMinutes, minuteLabel });
            } else {
                return `in ${remainingMinutes} ${minuteLabel}`;
            }
        } else {
            let timeAgo;
            if (days > 0) {
                timeAgo = formatTime({ prefix: '', days, dayLabel, hours: remainingHours, hourLabel, minutes: remainingMinutes, minuteLabel, suffix: ' ago' });
            } else if (hours > 0) {
                timeAgo = formatTime({ prefix: '', days: 0, dayLabel: '', hours, hourLabel, minutes: remainingMinutes, minuteLabel, suffix: ' ago' });
            } else {
                timeAgo = `${remainingMinutes} ${minuteLabel} ago`;
            }
            
            return timeAgo;
        }
    }


    const getEventImpactClass = (eventImpactTitle) => {
        switch (eventImpactTitle) {
            case 'Low':
                return 'bg-accent text-primary';
            case 'Medium':
                return 'bg-orange-400 text-black';
            case 'High':
                return 'bg-red-primary text-white';
            default:
                return '';
        }
    };


    const isDateTodayOrTomorrow = (date) => {
        const inputDate = new Date(date).toDateString();
        const todayDate = new Date().toDateString();
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        
        return inputDate === todayDate || inputDate === tomorrowDate.toDateString();
    }


    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full mx-auto">
                <div className="flex flex-col w-full">
                    {econEvents.length > 0 ? (
                        Object.entries(
                            econEvents.reduce((acc, event) => {
                                const date = new Date(event.datetime).toDateString();
                                if (!acc[date]) acc[date] = {};
                                if (!acc[date][event.event_title]) {
                                    acc[date][event.event_title] = event;
                                }
                                return acc;
                            }, {})
                        ).map(([date, events], index) => (
                            <div key={index} className="flex flex-col w-full bg-primary p-2 rounded-md mt-2">

                                <h2 className="text-lg font-bold pl-2">
                                    {isDateTodayOrTomorrow(date) ? 'Today' : isDateTodayOrTomorrow(new Date(date).setDate(new Date(date).getDate() - 1)) ? 'Tomorrow' : date}
                                </h2>

                                {Object.values(events)
                                    .sort((a, b) => {
                                        const impactOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
                                        return impactOrder[a.event_impact_title] - impactOrder[b.event_impact_title];
                                    })

                                    .map((event, idx) => (
                                        <div key={idx} className="flex flex-row w-full justify-between items-center py-1">
                                            <div className="flex flex-col ">
                                                <p className="text-secondary text-sm font-semibold pl-2">
                                                    {event.event_title}
                                                </p>
                                                <p className="text-accent text-xs font-semibold pl-2">
                                                    {relativeTimeUnix(event.unixtime)}
                                                </p>
                                            </div>
                                            <div className="flex flex-row gap-x-1">

                                                <p className={`text-[12px] font-semibold items-center flex ${getEventImpactClass(event.event_impact_title)} p-1 rounded`}>
                                                    {event.event_impact_title}
                                                </p>
                                                <p className="text-[12px] font-semibold items-center flex bg-accent text-primary p-1 rounded-md">
                                                    {event.currency}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            
                            </div>
                        ))
                    ) : (
                        <div className="mx-auto flex w-full justify-center py-3">
                            <p className="text-secondary text-sm font-semibold">No economic events available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default EconEvents;
