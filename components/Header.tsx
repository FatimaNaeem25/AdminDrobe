'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell, Menu } from 'lucide-react'
import { useState } from 'react'
import ProfileDropdown from './ProfileDropdown'
import NotificationModal from './NotificationModal'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Users Management',
  '/groups': 'Private Groups',
  '/feed': 'Feed',
  '/badges': 'Badges Management',
  '/outfit-generation': 'Outfit Generation',
  '/settings': 'Settings',
}

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Dashboard'
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        
        {/* Page Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:block relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
        
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        {/* Mobile Search Input - Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden fixed top-[73px] left-0 right-0 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 shadow-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                autoFocus
              />
            </div>
          </div>
        )}
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
              3
            </span>
          </button>
        </div>
        
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
      
      <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </header>
  )
}

