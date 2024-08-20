import React, { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader';
import Image from 'next/image';
import {
  getInvoiceById,
  fetchInvoiceComments,
} from '@/app/client/supabase/SupabaseUserData';
import CurrencySymbol from '@/app/client/hooks/formatting/CurrencySymbol';
import TradeStatusChip from '@/app/components/ui/Chips/TradeStatusChip';
import {
  addInvoiceComment,
  getInvoicePaidStatus,
  updateInvoicePaidStatus,
  getInvoiceStatus,
  getInvoiceAuthorizer
} from '@/app/client/supabase/SupabaseUserData';
import {
  AddCommentSuccessNotification,
  InvoiceApprovedSuccessNotification,
} from '@/app/components/ui/Notifications/Notifications.jsx';
import CommentFeed from '@/app/components/ui/Timeline/CommentFeed';

import { useUserStore } from '@/app/stores/stores';

export default function InvoiceComponent({ invoice }) {
  const { user } = useUserStore();

  const [invoiceObject, setInvoiceObject] = useState(null);
  const [comments, setComments] = useState([]);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [forceRefresh, setForceRefresh] = useState(false);
  const [invoiceAuthorizer, setInvoiceAuthorizer] = useState('');

  useEffect(() => {
    if (!invoice) return;

    const fetchInvoice = async () => {
      const invoice_result = await getInvoiceById({
        invoiceId: invoice?.invoice_id,
      });
      setInvoiceObject(invoice_result);
    };

    fetchInvoice();
  }, [invoice]);

  const fetchInvoicePaidStatus = async () => {
    const status = await getInvoicePaidStatus(invoice?.invoice_id);
    setInvoicePaid(status);

    setInvoiceObject(prevState => ({
      ...prevState,
      paid: status,
    }));
  };

  const toggleInvoicePaidStatus = async () => {
    const newStatus = true; // Set status to true only

    if (invoicePaid) {
      return;
    }

    if (invoice?.invoice_id === undefined || invoice?.invoice_id === null) {
      return;
    }

    await updateInvoicePaidStatus({
      invoiceId: invoice.invoice_id,
      isPaid: newStatus,
      authorizerName: user.full_name || user.username,
      authorizerUserId: user.id,
    });
    setInvoicePaid(newStatus);

    InvoiceApprovedSuccessNotification({
      invoice_id: invoice.invoice_id,
    });
  };

  useEffect(() => {
    if (invoice?.invoice_id) {
      fetchInvoicePaidStatus();
    }
  }, [invoice]);

  const fetchInvoiceAuthorizer = async () => {
    if (!invoice?.invoice_id) return;

    const authorizer = await getInvoiceAuthorizer({ invoiceId: invoice.invoice_id });
    if (authorizer) {
      setInvoiceObject(prevState => ({
        ...prevState,
        authorizer_name: authorizer.authorizer_name,
      }));
    }
  };

  useEffect(() => {
    if (invoice?.invoice_id) {
      fetchInvoiceAuthorizer();
    }
  }, [invoice]);

  const fetchInvoiceStatus = async () => {
    const status = await getInvoiceStatus({ invoiceId: invoice?.invoice_id });
    setInvoiceStatus(status);
  };

  useEffect(() => {
    if (invoice?.invoice_id) {
      fetchInvoiceStatus();
    }
  }, [invoice]);

  useEffect(() => {
    fetchComments();
  }, [invoiceObject]);

  const fetchComments = async () => {
    const comments = await fetchInvoiceComments({
      invoiceId: invoice?.invoice_id,
    });
    setComments(comments);

    // Auto scroll to the bottom of the comment box
    const commentBox = document.getElementById('comment_box');
    if (commentBox) {
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever comments are updated
    const commentBox = document.getElementById('comment_box');
    if (commentBox) {
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  }, [comments]);


  const handleNewCommentInvoiceAuthorized = async () => {
    const name = user.full_name || user.username;

    await toggleInvoicePaidStatus();
    await fetchInvoiceStatus();

    await addInvoiceComment({
      invoiceId: invoice?.invoice_id,
      comment: 'Invoice has been authorized',
      userId: user.id,
      username: name,
      profile_pic: user.profile_picture,
      type: 'paid',
    });

    await fetchComments();
    setForceRefresh(!forceRefresh);
  };

  return (
    <>
      <main>
        <header className="mx-auto max-w-[79rem]  px-8  sm:px-6  ">
          <div className="absolute inset-0 -z-10 " aria-hidden="true">
            <div className="absolute inset-x-0 bottom-0 h-px bg-primary" />
          </div>

          <div className="mx-auto  py-10 sm:ml-[65px]">
            <div className="mx-auto flex flex-col gap-y-4 sm:flex-row  w-full sm:items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">

              <div className="flex items-center gap-x-6">

                <div className="h-[64px] w-[64px] ">
                  {invoiceObject?.company_profile_pic ? (
                    <Image
                      src={invoiceObject?.company_profile_pic}
                      alt=""
                      className="h-16 w-16 flex-none rounded-md ring-1 ring-gray-900/10"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <SkeletonLoader />
                  )}
                </div>

                <h1>

                  <div className="h-[24px] w-[140px] ">
                    {invoiceObject?.invoice_number ? (
                      <div className="text-sm leading-6 px-2 bg-blue-primary text-blue border border-blue-500/30 rounded-md">
                        <div>{`Invoice #000${invoiceObject.invoice_number}`}</div>
                      </div>
                    ) : (
                      <SkeletonLoader />
                    )}

                  </div>
                  <div className="mt-1 text-base font-semibold leading-6 text-primary">
                    <div className="h-[24px] w-[170px] mt-[7px]">
                      {invoiceObject?.company_name ? (
                        <div>{`${invoiceObject.company_name}`}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                  </div>
                </h1>
              </div>

              <div className="flex items-center gap-x-4 sm:gap-x-6">

                {invoicePaid ? (
                  <button
                    disabled={true}
                    className="rounded-md bg-brand-disabled px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:transition flex-row flex items-center gap-x-2 select-none min-w-full"
                  >
                    <CheckIcon
                      className="h-6 w-6 text-gray-200"
                      aria-hidden="true"
                    />
                    Already paid
                  </button>
                ) : (
                  <button
                    onClick={handleNewCommentInvoiceAuthorized}
                    className="rounded-md bg-green-primary px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:transition flex-row flex items-center gap-x-2 min-w-full"
                  >
                    <CheckIcon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                    Authorize
                  </button>
                )}


              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1 border border-primary rounded-md">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-secondary shadow-sm ring-1 ring-primary">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-primary">
                      Amount
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-primary">
                      <div className="h-[24px] w-[90px]">
                        {typeof invoiceObject?.total === 'number' ? (
                          <div className="flex flex-row">
                            {invoiceObject?.total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                            {CurrencySymbol(invoiceObject?.currency)}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary select-none">
                      <div className="h-[24px] w-[50px]">
                        {typeof invoiceStatus ? (
                          <div>
                            {TradeStatusChip({
                              tradeStatus: invoiceStatus,
                            })}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-primary px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon
                        className="h-6 w-5 text-secondary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-primary ">
                      <div className="h-[24px] w-[180px] text-secondary">
                        {typeof invoiceObject?.authorizer_name ? (
                          <div>{invoiceObject?.authorizer_name || 'Awaiting authoritive user'}</div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon
                        className="h-6 w-5 text-secondary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-secondary select-none">
                      <div className="h-[24px] w-[110px]">
                        {invoiceObject?.due_date ? (
                          <div>
                            {new Date(
                              invoiceObject?.due_date.replace(
                                /(\d{2})-(\d{1,2})-(\d{4})/,
                                '$2/$1/$3'
                              )
                            ).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <CreditCardIcon
                        className="h-6 w-5 text-secondary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-secondary">
                      <div className="h-[24px] w-[140px]">
                        {typeof invoiceObject?.payment_method ? (
                          <div>
                            {invoiceObject?.paid ? (
                              `Paid with ${invoiceObject?.payment_method}`
                            ) : (
                              'Awaiting payment'
                            )}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-primary px-6 py-6">
                  {/* <a href="#" className="text-sm font-semibold leading-6 text-brand-primary select-none">
                    Download invoice
                  </a> */}
                </div>
              </div>
            </div>

            {/* Invoice */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-primary sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-base font-semibold leading-6 text-primary">
                Invoice
              </h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-secondary">Issued on</dt>{' '}
                  <dd className="inline text-primary">
                    <div className="h-[24px] w-[110px]">
                      {invoiceObject?.issue_date ? (
                        <div>
                          {new Date(
                            invoiceObject?.issue_date.replace(
                              /(\d{1,2})-(\d{1,2})-(\d{4})/,
                              '$2/$1/$3'
                            )
                          ).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-secondary">Due on</dt>{' '}
                  <dd className="inline text-primary">
                    <div className="h-[24px] w-[110px]">
                      {invoiceObject?.due_date ? (
                        <div>
                          {new Date(
                            invoiceObject?.due_date.replace(
                              /(\d{1,2})-(\d{1,2})-(\d{4})/,
                              '$2/$1/$3'
                            )
                          ).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                  </dd>
                </div>
                <div className="mt-6 border-t border-primary pt-6 sm:pr-4">
                  <dt className="font-semibold text-primary">From</dt>
                  <dd className="mt-2 text-secondary">
                    <span className="font-medium text-primary">
                      <div className="h-[24px] w-[110px]">
                        {invoiceObject?.sender ? (
                          <div className="font-medium text-primary">
                            {invoiceObject?.sender}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </span>
                    <div className="h-[24px] w-[110px] mt-2">
                      {invoiceObject?.from_address_line_1 ? (
                        <div>{invoiceObject?.from_address_line_1}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[140px] mt-1">
                      {invoiceObject?.from_state ? (
                        <div>
                          {invoiceObject?.from_state},{' '}
                          {invoiceObject?.from_postal_code}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[110px] mt-1">
                      {invoiceObject?.from_country ? (
                        <div>{invoiceObject?.from_country}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-primary sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-primary">To</dt>
                  <dd className="mt-2 text-secondary">
                    <div className="h-[24px] w-[110px]">
                      {invoiceObject?.recipient ? (
                        <div className="font-medium text-primary">
                          {invoiceObject?.recipient}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[110px] mt-2">
                      {invoiceObject?.to_address_line_1 ? (
                        <div>{invoiceObject?.to_address_line_1}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[140px] mt-1">
                      {invoiceObject?.to_state ? (
                        <div>
                          {invoiceObject?.to_state},{' '}
                          {invoiceObject?.to_postal_code}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[110px] mt-1">
                      {invoiceObject?.to_country ? (
                        <div>{invoiceObject?.to_country}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-primary text-primary">
                  <tr>

                  </tr>
                </thead>

                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      className="px-0 pb-0 pt-6 font-normal text-primary sm:hidden"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden px-0 pb-0 pt-6 text-right font-normal text-primary sm:table-cell"
                    >
                      Subtotal
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-primary">
                      <div className="h-[24px] w-[60px]">
                        {invoiceObject?.subtotal ? (
                          <div className="font-medium text-primary">
                            {invoiceObject?.subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {CurrencySymbol(invoiceObject?.currency)}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 font-normal text-primary sm:hidden select-none "
                    >
                      Fee
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4  text-right font-normal text-primary sm:table-cell"
                    >
                      Fee
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-primary ">
                      <div className="h-[24px] w-[60px]">
                        {invoiceObject?.fee ? (
                          <div className="font-medium text-primary">
                            <span className="text-transparent select-none">iiiiii</span>{invoiceObject?.fee.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {CurrencySymbol(invoiceObject?.currency)}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pt-4 font-semibold text-primary sm:hidden"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 text-right font-semibold text-primary sm:table-cell"
                    >
                      Total
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-primary">
                      <div className="h-[24px] w-[60px]">
                        {invoiceObject?.total ? (
                          <div className="font-medium text-primary">
                            {invoiceObject?.total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {CurrencySymbol(invoiceObject?.currency)}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="pb-[100px]">
              {/* Activity feed */}
              < CommentFeed
                tableName='invoices_comments'
                columnName='invoice_id'
                columnValue={invoice?.invoice_id}
                forceRefresh={forceRefresh}
              />

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
