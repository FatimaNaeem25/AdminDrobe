'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}

