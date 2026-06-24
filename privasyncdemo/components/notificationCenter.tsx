"use client";

import { useState } from "react";
import { Check, MoreHorizontal, Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "15m",
    unread: false,
  },
  {
    id: "2",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "15m",
    unread: true,
  },
  {
    id: "3",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "4",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "5",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "6",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const markAllRead = (): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleMenu = (id: string): void => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const markOneRead = (id: string): void => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setOpenMenuId(null);
  };

  const removeOne = (id: string): void => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setOpenMenuId(null);
  };

 return (
  <div className="min-h-screen w-full bg-gray-50">
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your latest activity
          </p>
        </div>

        <button
          onClick={markAllRead}
          title="Mark all as read"
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          <Check size={16} strokeWidth={3} />
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {notifications.length === 0 ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">
              <Bell size={30} className="text-cyan-600" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                You&apos;re all caught up
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No new notifications at the moment.
              </p>
            </div>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`group relative flex gap-4 bg-white px-6 py-5 transition-all hover:bg-gray-50 ${
                n.unread ? "border-l-4 border-cyan-600" : ""
              }`}
            >
              {/* Unread Indicator */}
              <div className="flex-shrink-0 pt-2">
                {n.unread ? (
                  <span className="block h-3 w-3 rounded-full bg-cyan-600" />
                ) : (
                  <span className="block h-3 w-3 rounded-full bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {n.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {n.body}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs text-gray-400">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => toggleMenu(n.id)}
                  className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <MoreHorizontal size={18} />
                </button>

                {openMenuId === n.id && (
                  <div className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    {n.unread && (
                      <button
                        onClick={() => markOneRead(n.id)}
                        className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => removeOne(n.id)}
                      className="block w-full px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      Remove notification
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}
