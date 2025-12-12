'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutGrid, 
  Users, 
  Users2, 
  MessageSquare, 
  Award, 
  Settings, 
  ChevronLeft,
  X,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Logo from './Logo'

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Users2, label: 'Groups', path: '/groups' },
  { icon: MessageSquare, label: 'Feed', path: '/feed' },
  { icon: Award, label: 'Badges', path: '/badges' },
  { icon: Sparkles, label: 'Outfit Generation', path: '/outfit-generation' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (onClose) {
      onClose()
    }
  }, [pathname])

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gray-50 dark:bg-gray-800 h-screen flex flex-col transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } lg:relative lg:z-auto`}
      >
        {/* Logo */}
        <div className={`p-4 sm:p-6 flex items-center ${collapsed ? 'justify-center flex-col gap-3' : 'justify-between'} transition-all duration-300`}>
          {collapsed ? (
            <>
              <Logo showText={false} size="sm" />
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronLeft className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform rotate-180`} />
              </button>
            </>
          ) : (
            <>
              <Logo showText={true} size="md" />
              <div className="flex items-center gap-2">
                {/* Desktop collapse button */}
                <button 
                  onClick={() => setCollapsed(!collapsed)}
                  className="hidden lg:block p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <ChevronLeft className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform`} />
                </button>
                {/* Mobile close button */}
                <button 
                  onClick={onClose}
                  className="lg:hidden p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Menu Items */}
        <nav className={`flex-1 overflow-y-auto transition-all duration-300 ${collapsed ? 'px-2' : 'px-2 sm:px-4'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} ${collapsed ? 'px-2' : 'px-3 sm:px-4'} py-3 mb-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="lg:block whitespace-nowrap">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

