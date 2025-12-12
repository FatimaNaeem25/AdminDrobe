'use client'

import { X, Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'New User Registration',
    message: 'Sarah Johnson has just joined the platform',
    type: 'info',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'System Update',
    message: 'Maintenance scheduled for tonight at 2 AM',
    type: 'warning',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'High Engagement',
    message: 'Your latest post has reached 1000 likes!',
    type: 'success',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    title: 'New Badge Created',
    message: 'Fashion Icon badge has been added successfully',
    type: 'success',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    title: 'API Error',
    message: 'Failed to sync user data. Please check logs.',
    type: 'error',
    time: '1 day ago',
    read: true,
  },
]

export default function NotificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifs, setNotifs] = useState<Notification[]>(notifications)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-primary-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-primary-50 dark:bg-primary-900/20'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20'
      default:
        return 'bg-blue-50 dark:bg-blue-900/20'
    }
  }

  const unreadCount = notifs.filter(n => !n.read).length

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40" onClick={onClose} />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed right-6 top-20 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto notification-scroll">
          {notifs.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifs.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                  }`}
                  onClick={() => {
                    setNotifs(notifs.map(n => 
                      n.id === notification.id ? { ...n, read: true } : n
                    ))
                  }}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationBg(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-1 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifs.length > 0 && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setNotifs(notifs.map(n => ({ ...n, read: true })))
              }}
              className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium py-2"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  )
}

