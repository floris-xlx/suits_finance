import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  CheckIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import SkeletonLoader from '@/app/components/ui/Loading/SkeletonLoader'
import Image from 'next/image'
import { getInvoiceById, getUsernameById, fetchInvoiceComments } from '@/app/client/supabase/SupabaseUserData'
import CurrencySymbol from '@/app/client/hooks/formatting/CurrencySymbol'
import TradeStatusChip from '@/app/components/ui/Chips/TradeStatusChip'
import TimeChip from '@/app/components/ui/Chips/TimeChip'
import { addInvoiceComment, getInvoicePaidStatus, updateInvoicePaidStatus } from '@/app/client/supabase/SupabaseUserData'
import { AddCommentSuccessNotification } from '@/app/components/ui/Notifications/Notifications.jsx'


const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}

import { useUserStore } from '@/app/stores/stores'

const activity = [
  { id: 1, type: 'created', person: { name: 'Dave Diederen' }, date: '7d ago', dateTime: '2024-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Dave Diederen' }, date: '6d ago', dateTime: '2024-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Dave Diederen' }, date: '6d ago', dateTime: '2024-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Dave Diederen',
      imageUrl:
        'https://xylex.ams3.cdn.digitaloceanspaces.com/suits_finance/profilePics/dave.png',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2024-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Floris' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Floris' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({
  invoice
}) {
  const { user } = useUserStore()

  const [invoiceObject, setInvoiceObject] = useState(null)
  const [comments, setComments] = useState([])
  const [invoicePaid, setInvoicePaid] = useState(false)
  console.log("comments: ", comments);



  console.log(invoiceObject);
  console.log(invoice?.invoice_id);
  console.log(user);

  useEffect(() => {
    console.log(invoice);
    if (!invoice) return

    const fetchInvoice = async () => {
      const invoice_result = await getInvoiceById({
        invoiceId: invoice?.invoice_id
      })
      console.log(invoice_result);
      setInvoiceObject(invoice_result)
    }

    fetchInvoice()
  }, [invoice])


  const fetchInvoicePaidStatus = async () => {
    const status = await getInvoicePaidStatus(invoice?.invoice_id);
    setInvoicePaid(status);
  };

  const toggleInvoicePaidStatus = async () => {
    const newStatus = !invoicePaid;
    await updateInvoicePaidStatus(invoice?.invoice_id, newStatus);
    setInvoicePaid(newStatus);
  };

  useEffect(() => {
    if (invoice?.invoice_id) {
      fetchInvoicePaidStatus();
    }
  }, [invoice]);


  const [commentField, setCommentField] = useState('')


  useEffect(() => {
    fetchComments()
  }, [invoiceObject])

  const fetchComments = async () => {
    const comments = await fetchInvoiceComments({
      invoiceId: invoice?.invoice_id
    })
    setComments(comments)
    console.log(comments);

    // Auto scroll to the bottom of the comment box
    const commentBox = document.getElementById('comment_box');
    if (commentBox) {
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  }

  useEffect(() => {
    // Scroll to the bottom whenever comments are updated
    const commentBox = document.getElementById('comment_box');
    if (commentBox) {
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  }, [comments]);

  const handleNewComments = async () => {
    if (commentField.length === 0) return

    const name = user.full_name || user.username;

    await addInvoiceComment({
      invoiceId: invoice?.invoice_id,
      comment: commentField,
      userId: user.id,
      username: name,
      profile_pic: user.profile_picture,
      type: 'commented'
    })

    setCommentField('')
    AddCommentSuccessNotification();
    await fetchComments();
  }

  const handleNewCommentInvoiceAuthorized = async () => {
    const name = user.full_name || user.username;

    await addInvoiceComment({
      invoiceId: invoice?.invoice_id,
      comment: 'Invoice has been authorized',
      userId: user.id,
      username: name,
      profile_pic: user.profile_picture,
      type: 'paid'
    })

    await fetchComments();
  }



  return (
    <>


      <main>
        <header className="relative isolate">
          <div className="absolute inset-0 -z-10 " aria-hidden="true">

            <div className="absolute inset-x-0 bottom-0 h-px bg-primary" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <Image
                  src="https://xylex.ams3.cdn.digitaloceanspaces.com/profilePics/xylexIcon.png"
                  alt=""
                  className="h-16 w-16 flex-none rounded-md ring-1 ring-gray-900/10"
                  width={64}
                  height={64}
                />
                <h1>
                  <div className="text-sm leading-6  bg-blue-primary text-blue border border-blue-500/30 rounded-md px-1">

                    <div className="h-[24px] w-[140px] ">
                      {invoiceObject?.invoice_number ? (
                        <div>{`Invoice #000${invoiceObject.invoice_number}`}</div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>

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


                <button
                  onClick={handleNewCommentInvoiceAuthorized}
                  className="rounded-md bg-green-primary px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:transition flex-row flex items-center gap-x-2"
                >
                  <CheckIcon className="h-6 w-6 text-black" aria-hidden="true" />
                  Authorize
                </button>


                <Menu as="div" className="relative sm:hidden">
                  <Menu.Button className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon className="h-5 w-5 text-secondary" aria-hidden="true" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-primary py-2 shadow-lg ring-1 ring-primary focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-secondary' : '',
                              'block w-full px-3 py-1 text-left text-sm leading-6 text-primary'
                            )}
                          >
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-secondary' : '',
                              'block px-3 py-1 text-sm leading-6 text-primary'
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
                    <dt className="text-sm font-semibold leading-6 text-primary">Amount</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-primary">

                      <div className="h-[24px] w-[90px]">
                        {typeof invoiceObject?.total === 'number' ? (
                          <div className="flex flex-row">
                            {invoiceObject?.total} {CurrencySymbol(invoiceObject?.currency)}
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
                        {typeof invoiceObject?.status ? (
                          <div>
                            {TradeStatusChip({
                              tradeStatus: invoiceObject?.status
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
                      <UserCircleIcon className="h-6 w-5 text-secondary" aria-hidden="true" />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-primary ">
                      <div className="h-[24px] w-[110px]">
                        {typeof invoiceObject?.authorizer_name ? (
                          <div>
                            {invoiceObject?.authorizer_name}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon className="h-6 w-5 text-secondary" aria-hidden="true" />
                    </dt>
                    <dd className="text-sm leading-6 text-secondary select-none">
                      <div className="h-[24px] w-[110px]">
                        {invoiceObject?.due_date ? (
                          <div>
                            {new Date(invoiceObject?.due_date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
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
                      <CreditCardIcon className="h-6 w-5 text-secondary" aria-hidden="true" />
                    </dt>
                    <dd className="text-sm leading-6 text-secondary">
                      <div className="h-[24px] w-[140px]">
                        {typeof invoiceObject?.payment_method ? (
                          <div>
                            Paid with {invoiceObject?.payment_method}
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
              <h2 className="text-base font-semibold leading-6 text-primary">Invoice</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-secondary">Issued on</dt>{' '}
                  <dd className="inline text-primary">
                    <div className="h-[24px] w-[110px]">
                      {invoiceObject?.issue_date ? (
                        <div>
                          {new Date(invoiceObject?.issue_date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
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
                          {new Date(invoiceObject?.due_date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
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
                        <div>
                          {invoiceObject?.from_address_line_1}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[140px] mt-1">
                      {invoiceObject?.from_state ? (
                        <div>
                          {invoiceObject?.from_state}, {invoiceObject?.from_postal_code}
                        </div>
                      ) : (
                        <SkeletonLoader />
                      )}
                    </div>
                    <div className="h-[24px] w-[110px] mt-1">
                      {invoiceObject?.from_country ? (
                        <div>
                          {invoiceObject?.from_country}
                        </div>
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
                    <br />
                    886 Walter Street
                    <br />
                    New York, NY 12345
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
                    {/* <th scope="col" className="px-0 py-3 font-semibold">
                      Projects
                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      Hours
                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      Rate
                    </th> 
                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                      Price
                    </th>*/}
                  </tr>
                </thead>
                <tbody>
                  {invoice?.items?.map((item) => (
                    <tr key={item?.id} className="border-b border-primary">
                      <td className="max-w-0 px-0 py-5 align-top">
                        <div className="truncate font-medium text-primary">{item?.title}</div>
                        <div className="truncate text-secondary">{item?.description}</div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-primary sm:table-cell">
                        {item?.hours}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-primary sm:table-cell">
                        {item?.rate}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-primary">{item?.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className="px-0 pb-0 pt-6 font-normal text-primary sm:hidden">
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
                            {invoiceObject?.subtotal}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="pt-4 font-normal text-primary sm:hidden select-none">
                      Fee
                    </th>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 text-right font-normal text-primary sm:table-cell"
                    >
                      Fee
                    </th>
                    <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-primary">
                      <div className="h-[24px] w-[60px]">
                        {invoiceObject?.fee ? (
                          <div className="font-medium text-primary">
                            {invoiceObject?.fee}
                          </div>
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="pt-4 font-semibold text-primary sm:hidden">
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
                            {invoiceObject?.total}
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

            <div className="lg:col-start-3">
              {/* Activity feed */}
              <h2 className="text-sm font-semibold leading-6 text-primary select-none">Activity</h2>
              <ul role="list" id="comment_box" key="comment_box" className="mt-6 space-y-1 overflow-y-auto max-h-96">
                {comments?.map((commentItem, commentItemIdx) => (
                  <li key={commentItem?.comment_id} className="relative flex gap-x-2">
                    <div
                      className={classNames(
                        commentItemIdx === comments?.length - 1 ? 'h-6' : '-bottom-6',
                        'absolute left-0 top-0 flex w-6 justify-center'
                      )}
                    >
                      <div className="w-px bg-gray-200" />
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
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-xs leading-5 text-secondary">
                              <span className="font-medium text-primary">{commentItem?.username}</span> commented
                            </div>
                            <time
                              dateTime={commentItem?.datetime}
                              className="flex-none py-0.5 text-xs leading-5 text-secondary"
                            >
                              {new Date(commentItem?.datetime).toLocaleDateString()}
                            </time>
                          </div>
                          <p className="text-sm leading-6 text-secondary">{commentItem?.comment}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-primary">
                          {commentItem?.type === 'paid' ? (
                            <CheckCircleIcon className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                          ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-secondary ring-1 ring-primary" />
                          )}
                        </div>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-secondary">
                          <span className="font-medium text-primary">{commentItem?.username}</span>{' '}
                          {commentItem?.type} the invoice.
                        </p>
                        <time
                          dateTime={commentItem?.datetime}
                          className="flex-none py-0.5 text-xs leading-5 text-secondary"
                        >
                          {new Date(commentItem?.datetime).toLocaleDateString()}
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
                <div action="#" className="relative flex-auto">
                  <div className="p-2 px-4 overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-primary focus-within:ring-2 focus-within:ring-indigo-600 border border-primary">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={2}
                      name="comment"
                      id="comment"
                      value={commentField}
                      onChange={(e) => setCommentField(e.target.value)}
                      className="block w-full resize-none border-0 bg-transparent py-1.5 text-primary placeholder:text-secondary focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      defaultValue={''}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">

                    <button
                      onClick={handleNewComments}
                      type="submit"
                      className="rounded-md bg-input-primary px-2.5 py-1.5 text-sm font-normal text-primary shadow-sm  ring-primary hover:bg-accent border border-primary hover:transition"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
