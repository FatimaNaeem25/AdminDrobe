'use client'

import { LogOut, User, Settings} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden cursor-pointer">
          <div className="w-full h-full gradient-brand flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@drobeai.com</p>
          </div>
          
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/settings')
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/settings')
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

