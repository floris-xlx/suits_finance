import React, { useEffect, useState, Fragment, useMemo, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Pagination,
    Spinner
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import { getRelativeTime } from "@/app/client/hooks/datetime/RelativeDate.js";
import { GetTradesByStrategyId, addTransaction, fetchTransactions, deleteTransaction, isUserSuperAdmin } from "@/app/client/supabase/SupabaseUserData.js";
import TradeStatusChip from "@/app/components/ui/Chips/TradeStatusChip.jsx";
import { TradeStatus } from "@/app/types/tradeStatus"
import UpdateTradeStatusLayout from "@/app/components/layouts/Modals/updateTradeStatus";
import { PlusIcon } from "@heroicons/react/24/outline";
import CurrencySymbol from "@/app/client/hooks/formatting/CurrencySymbol";

// da modal component
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import { refreshPage } from '@/app/client/hooks/refreshPage';
import { DrawerHero, useDrawer } from "@/app/components/ui/Drawers/DrawerViewTrade";
import DrawerViewTradeLayout from "@/app/components/layouts/Drawers/DrawerViewTrade";
import DrawerViewTransactionLayout from "@/app/components/layouts/Drawers/DrawerViewTransaction";
import { useTradeFiltersStore, useUserStore } from "@/app/stores/stores";
import { AddTransactionSuccessNotification } from "@/app/components/ui/Notifications/Notifications.jsx";

// layout 
import AddTransactionLayout from "@/app/components/layouts/Forms/AddTransaction";


// statics
const INITIAL_VISIBLE_COLUMNS = ["created_at", "amount", "recipient", "sender", "status", "actions"];



import PropTypes from "prop-types";

export default function App({
    strategyId = null,
    isSuperAdmin = false
}) {
    // zustand
    const { tradeFilters, setIsTradeStatusFilters } = useTradeFiltersStore();
    const { user } = useUserStore();

    console.log(isSuperAdmin);

    // modal shit
    const { modalRef: modalRef_updateTradeStatus, handleOpenModal: handleOpenModal_updateTradeStatus } = useModal();
    const { modalRef: modalRef_deleteTransaction, handleOpenModal: handleOpenModal_deleteTransaction } = useModal();

    const { drawerRef: drawerRef_viewTrade, handleOpenDrawer: handleOpenDrawer_viewTrade } = useDrawer();
    const { drawerRef: drawerRef_addTransaction, handleOpenDrawer: handleOpenDrawer_addTransaction } = useDrawer();

    // these are the main loaded objects
    const [tradeObjects, setTradeObjects] = useState([]);
    const [isLoading, setIsDataLoading] = useState(true);
    const [transactionObjects, setTransactionObjects] = useState([]);

    // transaction
    const [scopedTransaction, setScopedTransaction] = useState([]);
    const [scopedTransactionHash, setScopedTransactionHash] = useState('');



    // states
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [statusFilter, setStatusFilter] = useState(tradeFilters.isTradeStatusFilters);
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [scopedTradeHash, setScopedTradeHash] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [page, setPage] = useState(1);
    console.log('tradeObjects', tradeObjects);

    const [unsavedTransaction, setUnsavedTransaction] = useState({});
    console.log('unsavedTransaction', unsavedTransaction);

    const handleAddTransaction = async () => {
        const { sender, recipient, amount, title } = unsavedTransaction;
        if (sender && recipient && amount > 0 && title) {
            const { title, amount, currency, recipient, sender } = unsavedTransaction;
            const user_id = user.id;
            await addTransaction({ user_id, title, amount, currency, recipient, sender });
        }
    };

    const handleDeleteTransaction = async () => {
        const result = await deleteTransaction({
            transactionId
        });
        console.log(result);

        if (result) {
            setTradeObjects(tradeObjects.filter((trade) => trade.transaction_id !== transactionId));
        }
    };

    const handleTransactionDeletePress = ({ transactionId }) => {
        // close the drawer
        handleOpenDrawer_viewTrade();
        if (!transactionId) { return null; }
        if (!isSuperAdmin) { return null; }

        setTransactionId(transactionId);
        handleOpenModal_deleteTransaction();
    }


    useEffect(() => {

        const fetchTrades = async () => {
            const trades = await fetchTransactions({
                userId: user.id,
            });
            trades.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setTradeObjects(trades);
            setTransactionObjects(trades);
            setIsDataLoading(false);
        };

        fetchTrades();
    }, [strategyId]);



    // handle trade editing
    const handleTradeEdit = (tradeHash) => {
        if (!tradeHash) { return null; }

        setScopedTradeHash(tradeHash);
        handleOpenModal_updateTradeStatus();
    };

    const tradeObjectOfHash = tradeObjects.find((trade) => trade.hash === scopedTradeHash);

    const handleDrawerOpen = (tradeHash) => {
        setScopedTradeHash(tradeHash);
        handleOpenDrawer_viewTrade();
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "position_size",
        direction: "ascending",
    });


    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        const filteredColumns = columns;
        if (visibleColumns === "all") return filteredColumns;

        return filteredColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredTrades = [...tradeObjects];

        if (hasSearchFilter) {
            filteredTrades = filteredTrades.filter((trade) =>
                trade.recipient.toLowerCase().includes(filterValue.toLowerCase()) ||
                trade.sender.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredTrades = filteredTrades.filter((trade) =>
                Array.from(statusFilter).includes(trade.status),
            );
        }

        return filteredTrades;
    }, [tradeObjects, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);


    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);


    // these are the final objects
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];


            if (sortDescriptor.column === "created_at") {
                first = new Date(a.created_at).getTime();
                second = new Date(b.created_at).getTime();

            } else if (sortDescriptor.column === "status") {
                const statusOrder = ["loss", "pending", "rejected", "approved"];
                first = statusOrder.indexOf(a.status.toLowerCase());
                second = statusOrder.indexOf(b.status.toLowerCase());
            }


            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);


    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "amount":
                return (
                    <div
                        classNames={{ description: "text-primary font-normal text-xs" }}
                        className="text-primary font-normal text-xs"
                        description={user.amount}
                        name={cellValue}
                    >
                        {CurrencySymbol(user.currency)} {parseFloat(user.amount).toFixed(2)}
                    </div>
                );

            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="font-normal text-sm text-primary">{getRelativeTime(user.created_at)}</p>
                        {/* this is where we display the relative time */}
                        <p className="font-normal text-sm capitalize text-secondary">
                            {
                                new Date(user.created_at).toLocaleString(
                                    [],
                                    {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }
                                )
                            }
                        </p>
                    </div>
                ); // sessions should go here FIXME {user.pnl}

            case "status":
                return (
                    < TradeStatusChip tradeStatus={user.status} />
                );

            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-primary border-1 border-primary rounded-md" aria-label="Actions Menu">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light" aria-labelledby="actionsMenuButton">
                                    <VerticalDotsIcon className="text-secondary" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className="rounded-md" aria-labelledby="actionsMenu">

                                <DropdownItem id="viewAction" onClick={() => { handleDrawerOpen(user.hash) }}>
                                    View
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );

            default:
                if (typeof cellValue === 'number') {
                    return cellValue.toFixed(4);
                }
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">

                    <div className="flex flex-col gap-y-2 sm:flex-row gap-x-1 sm:justify-between  w-full">
                        <Input
                            isClearable
                            classNames={{
                                base: "w-full sm:max-w-[30%] h-unit-8 focus:outline-none focus:ring-2 focus:ring-purple-500  hover:transition hover:border-brand-primary bg-secondary rounded-md text-primary ",
                            }}
                            size="xs"
                            radius="md"
                            startContent={<SearchIcon className="text-secondary" />}
                            value={filterValue}
                            variant="bordered"
                            onClear={() => setFilterValue("")}
                            onValueChange={onSearchChange}
                        />

                        <div className="flex flex-row gap-3  ">
                            <div className="flex flex-row w-full gap-x-2 justify-between sm:justify-end">
                                {/* this handles the trade status dropdown */}
                                <Dropdown className="bg-secondary border border-primary">
                                    <DropdownTrigger className="sm:flex w-full sm:w-fit">
                                        <Button
                                            endContent={<ChevronDownIcon className="text-small" />}
                                            size="md"
                                            variant="bordered"
                                            className="bg-secondary "
                                        >
                                            Transaction Status
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Table Columns"
                                        closeOnSelect={false}
                                        selectedKeys={statusFilter}
                                        selectionMode="multiple"
                                        onSelectionChange={setStatusFilter}
                                        accessKey="trade_status"
                                        className="bg-secondary"

                                    >
                                        {Object.values(TradeStatus).map((outcome) => (
                                            <DropdownItem key={outcome} className="capitalize">
                                                {capitalize(outcome)}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>

                                {/* this handles the columns dropdown */}
                                <Dropdown className="bg-secondary border border-primary">
                                    <   DropdownTrigger className="sm:flex w-full sm:w-fit">
                                        <Button
                                            endContent={<ChevronDownIcon className="text-small" />}
                                            size="md"
                                            variant="bordered"
                                            className="bg-secondary"
                                        >
                                            Columns
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Table Columns"
                                        closeOnSelect={false}
                                        selectedKeys={visibleColumns}
                                        selectionMode="multiple"
                                        onSelectionChange={setVisibleColumns}
                                        className="bg-secondary"
                                    >
                                        {columns.map((column) => (
                                            <DropdownItem key={column.uid} className="capitalize hover:bg-primary">
                                                {capitalize(column.name)}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>

                                <button
                                    className="bg-brand-primary hover:bg-brand-accent hover:transition text-white rounded-md flex flex-row items-center p-2 gap-x-2 text-sm"
                                    onClick={handleOpenDrawer_addTransaction}
                                >
                                    <PlusIcon className="h-5 w-5 text-white" />
                                    Add transaction
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        tradeObjects.length,
        hasSearchFilter,
    ]);


    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                {!isLoading && (
                    <Pagination
                        showControls
                        classNames={{
                            cursor: "bg-brand-primary text-white group-focus:false border-none z-0",
                        }}
                        color="default"
                        isDisabled={hasSearchFilter}
                        page={page}
                        total={Math.max(pages, 1)} // this fixed xlx-1984 https://linear.app/xylex/issue/XLX-1984/
                        variant="light"
                        onChange={setPage}
                    />
                )}
            </div>
        );
    }, [selectedKeys, page, pages, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                "group-data-[middle=true]:before:rounded-none",
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Fragment>
            <Modal
                ref={modalRef_updateTradeStatus}
                buttonText={'Update'}
                title={'Change trade status'}
                onButtonPress={refreshPage}
            >
                <UpdateTradeStatusLayout trade_hash={scopedTradeHash} />
            </Modal>

            <DrawerHero
                title={'Add Transaction'}
                // buttonText={'Add'}
                ref={drawerRef_addTransaction}
                onClick={handleAddTransaction}
            >
                <AddTransactionLayout setUnsavedTransaction={setUnsavedTransaction} />
            </DrawerHero>


            <DrawerHero
                title={'View transaction'}
                ref={drawerRef_viewTrade}
            >
                <DrawerViewTransactionLayout transaction={tradeObjectOfHash} />

                {isSuperAdmin && (
                    <Button
                        className="rounded-md p-2 bg-red-primary hover:transition hover:bg-red-secondary  text-white mt-8"
                        onClick={() => handleTransactionDeletePress({ transactionId: tradeObjectOfHash.transaction_id })}
                    >
                        Delete transaction
                    </Button>
                )}
            </DrawerHero>

            <Modal
                ref={modalRef_deleteTransaction}
                buttonText={'Delete'}
                title={'Delete transaction'}
                onButtonPress={handleDeleteTransaction}
            >
                <div className="flex flex-col gap-4">
                    <p className="text-primary">Are you sure you want to delete this transaction?</p>
                </div>
            </Modal>

            {/* Scrollable Container */}
            <div className="scrollable-x overflow-y-hidden !scroll-my-0 scroll">
                <Table
                    isCompact
                    removeWrapper
                    aria-label="Trades table"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    checkboxesProps={{
                        classNames: {
                            wrapper: "after:bg-brand-primary after:text-background text-background transition-none",
                        },
                    }}
                    classNames={classNames}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                                className="transition-none"
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody emptyContent={"No trades found"} items={sortedItems} isLoading={isLoading} >
                        {(item) => (
                            <TableRow key={item.hash}>
                                {(columnKey) => (
                                    <TableCell>
                                        <span
                                            style={{
                                                textWrap: "nowrap",
                                                fontSize: renderCell(item, columnKey).length > 10 ? '14px' : 'inherit'
                                            }}
                                        >
                                            {renderCell(item, columnKey)}
                                        </span>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {isLoading && (<div className="flex flex-col mx-auto">
                    <Spinner color="warning" size="lg" label="Loading transactions..." />
                </div>)}
            </div>
        </Fragment>
    );
}

App.propTypes = {
    userId: PropTypes.string,
    strategyId: PropTypes.string
};