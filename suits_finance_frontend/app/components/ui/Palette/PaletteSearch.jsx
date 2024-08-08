"use client";

import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import React, { useEffect, useState } from "react";

import { GetKeyLocalStorage, SetKeyLocalStorage } from "@/app/client/caching/LocalStorageRouter";
import { GetPendingTradesByOrganization } from '@/app/client/supabase/SupabaseTradeData';

// zustand
import { useUserStore, useOrganizationStore } from "@/app/stores/stores";

const PaletteSearch = ({ isOpen, setIsOpen }) => {
    const { user } = useUserStore();
    const { organization } = useOrganizationStore();



    const [pendingTrades, setPendingTrades] = useState([]);


    useEffect(() => {
        const fetchPendingTrades = async () => {
            let pendingTrades = await GetPendingTradesByOrganization(user.organization, true);
            
            if (organization.isMember) {
                pendingTrades = pendingTrades.filter(trade => trade.trade_status !== 'invalid' && trade.trade_status !== 'loss' && trade.trade_status !== 'unapproved');
            }
            
            setPendingTrades(pendingTrades);
        }

        fetchPendingTrades();
    }, []);


    const alphanumeric = /^[0-9a-zA-Z]+$/;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleKeyPress = (e) => {
                const isBlocked = GetKeyLocalStorage("BLOCKED_FROM_PALETTE_EVENT") === "true";
                if (isBlocked) return;


                // only allow alphanumeric keys
                if (!alphanumeric.test(e.key)) {
                    return;
                }

                // prevent left control key if theres no f within 200ms
                if (e.key === 'Control' && !e.repeat) {
                    setTimeout(() => {
                        if (GetKeyLocalStorage("BLOCKED_FROM_PALETTE_EVENT") === "true") {
                            SetKeyLocalStorage("BLOCKED_FROM_PALETTE_EVENT", "false");
                        }
                    }, 200);

                    SetKeyLocalStorage("BLOCKED_FROM_PALETTE_EVENT", "true");
                    return;
                }

                if (e.target.tagName.toLowerCase() !== 'input' && e.target.tagName.toLowerCase() !== 'textarea' && (e.key.match(/^[a-z]+$/i) || (e.key === 'f' && e.ctrlKey))) {
                    handleOpenPalette();
                }
            };

            window.addEventListener("keydown", handleKeyPress);

            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, []);


    const [page, setPage] = useState("root");
    const [search, setSearch] = useState("");

    // search  pallette

    // button handler
    const handleOpenPalette = () => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        // set the search query to cachedPaletteSearchQuery
        if (search) {
            SetKeyLocalStorage("cachedPaletteSearchQuery", search);
        }
    }, [search]);
    const headingOrder = ["Pending", "Unapproved", "Entry", "Tp1", "Tp2", "Tp3", "Loss", "Invalid"];

    const filteredPendingTrades = organization.isMember
        ? pendingTrades.filter(trade => !["loss", "unapproved", "invalid"].includes(trade.trade_status.toLowerCase()))
        : pendingTrades;

    const groupedTrades = filteredPendingTrades.reduce((acc, trade) => {
        const heading = headingOrder.includes(trade.trade_status.charAt(0).toUpperCase() + trade.trade_status.slice(1))
            ? trade.trade_status.charAt(0).toUpperCase() + trade.trade_status.slice(1)
            : "Unsorted";

        const existingGroup = acc.find(group => group.heading === heading);

        const tradeItem = {
            id: trade.id,
            children: ` ${trade.pairname} - ${trade.trade_hash}`, // Include pair_name for searchability
            href: `${window.location.pathname}?trade_hash=${trade.trade_hash}`,
        };

        if (existingGroup) {
            existingGroup.items.push(tradeItem);
        } else {
            acc.push({
                heading: heading,
                id: trade.id,
                items: [tradeItem],
            });
        }
        return acc;
    }, []);


    groupedTrades.sort((a, b) => headingOrder.indexOf(a.heading) - headingOrder.indexOf(b.heading));

    const filteredItems = filterItems(groupedTrades, search);
    return (



        <CommandPalette
            onChangeSearch={setSearch}
            onChangeOpen={setIsOpen}
            search={search}
            isOpen={isOpen}
            page={page}

        >

            <CommandPalette.Page id="root" className="!text-primary">
                {filteredItems.length ? (
                    filteredItems.map((list) => (
                        <CommandPalette.List key={list.id} heading={list.heading} className="text-primary">
                            {list.items.map(({ id, ...rest }) => (
                                <CommandPalette.ListItem
                                    key={id}
                                    index={getItemIndex(filteredItems, id)}
                                    {...rest}
                                />
                            ))}
                        </CommandPalette.List>
                    ))
                ) : (
                    <CommandPalette.FreeSearchAction />
                )}
            </CommandPalette.Page>

            <CommandPalette.Page id="projects">
                {/* Projects page */}
            </CommandPalette.Page>
        </CommandPalette>

    );
};

export default PaletteSearch;