'use client'

import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Bell, Send, Calendar, Users, Settings as SettingsIcon, Moon, Sun, UserPlus, Save, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'update' | 'announcement' | 'maintenance' | 'feature'
  target: 'all' | 'active' | 'new'
  sentAt: string
  sentBy: string
  status: 'sent' | 'scheduled'
}

interface AdminUser {
  id: number
  name: string
  email: string
  role: 'Super Admin' | 'Admin' | 'Moderator'
  createdAt: string
  lastLogin: string
}

const sentNotifications: Notification[] = [
  {
    id: 1,
    title: 'New AI Outfit Generator Feature',
    message: 'We\'ve launched an amazing new AI-powered outfit generator! Try it now and get personalized style recommendations.',
    type: 'feature',
    target: 'all',
    sentAt: '2024-12-15 10:30 AM',
    sentBy: 'Admin',
    status: 'sent',
  },
  {
    id: 2,
    title: 'App Update Available',
    message: 'A new version of DrobeAI is available with bug fixes and performance improvements. Update now for the best experience!',
    type: 'update',
    target: 'all',
    sentAt: '2024-12-14 2:15 PM',
    sentBy: 'Admin',
    status: 'sent',
  },
  {
    id: 3,
    title: 'Holiday Fashion Challenge',
    message: 'Join our holiday fashion challenge! Share your festive outfits and win exclusive badges and rewards.',
    type: 'announcement',
    target: 'active',
    sentAt: '2024-12-13 9:00 AM',
    sentBy: 'Admin',
    status: 'sent',
  },
]

const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@drobeai.com',
    role: 'Super Admin',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-15 9:30 AM',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@drobeai.com',
    role: 'Admin',
    createdAt: '2024-03-20',
    lastLogin: '2024-12-15 8:15 AM',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@drobeai.com',
    role: 'Moderator',
    createdAt: '2024-06-10',
    lastLogin: '2024-12-14 5:45 PM',
  },
]

type Tab = 'notifications' | 'panel-settings' | 'admin-users' | 'appearance'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>('notifications')
  const [notifications, setNotifications] = useState<Notification[]>(sentNotifications)
  const [admins, setAdmins] = useState<AdminUser[]>(adminUsers)
  const [showForm, setShowForm] = useState(false)
  const [showAdminForm, setShowAdminForm] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement' as 'update' | 'announcement' | 'maintenance' | 'feature',
    target: 'all' as 'all' | 'active' | 'new',
    schedule: false,
    scheduledDate: '',
    scheduledTime: '',
  })

  const [adminFormData, setAdminFormData] = useState({
    name: '',
    email: '',
    role: 'Admin' as 'Super Admin' | 'Admin' | 'Moderator',
  })

  const [panelSettings, setPanelSettings] = useState({
    appName: 'DrobeAI',
    maintenanceMode: false,
    allowUserRegistration: true,
    maxFileUploadSize: '10',
    sessionTimeout: '30',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newNotification: Notification = {
      id: notifications.length + 1,
      title: formData.title,
      message: formData.message,
      type: formData.type,
      target: formData.target,
      sentAt: formData.schedule 
        ? `${formData.scheduledDate} ${formData.scheduledTime}`
        : new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
      sentBy: 'Admin',
      status: formData.schedule ? 'scheduled' : 'sent',
    }

    setNotifications([newNotification, ...notifications])
    setFormData({
      title: '',
      message: '',
      type: 'announcement',
      target: 'all',
      schedule: false,
      scheduledDate: '',
      scheduledTime: '',
    })
    setShowForm(false)
    
    if (!formData.schedule) {
      alert(`Notification sent to ${formData.target === 'all' ? 'all users' : formData.target === 'active' ? 'active users' : 'new users'}!`)
    } else {
      alert('Notification scheduled successfully!')
    }
  }

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdmin: AdminUser = {
      id: admins.length + 1,
      name: adminFormData.name,
      email: adminFormData.email,
      role: adminFormData.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    }
    setAdmins([...admins, newAdmin])
    setAdminFormData({ name: '', email: '', role: 'Admin' })
    setShowAdminForm(false)
    alert('Admin user added successfully!')
  }

  const handleDeleteAdmin = (id: number) => {
    if (confirm('Are you sure you want to remove this admin user?')) {
      setAdmins(admins.filter(admin => admin.id !== id))
    }
  }

  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'update':
        return 'bg-blue-100 text-blue-700'
      case 'feature':
        return 'bg-primary-100 text-primary-700'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700'
      case 'announcement':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTargetLabel = (target: string) => {
    switch (target) {
      case 'all':
        return 'All Users'
      case 'active':
        return 'Active Users'
      case 'new':
        return 'New Users'
      default:
        return target
    }
  }

  const tabs = [
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'panel-settings' as Tab, label: 'Panel Settings', icon: SettingsIcon },
    { id: 'admin-users' as Tab, label: 'Admin Users', icon: Users },
    { id: 'appearance' as Tab, label: 'Appearance', icon: Sun },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-base">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="p-4 sm:p-6 bg-white dark:bg-gray-800">
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Notification Management</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center gap-2 px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm sm:text-base"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Send Notification'}</span>
                    <span className="sm:hidden">{showForm ? 'Cancel' : 'Send'}</span>
                  </button>
                </div>

                {showForm && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Create New Notification</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g., New Feature Available"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Enter the notification message..."
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                          <select
                            required
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          >
                            <option value="announcement">Announcement</option>
                            <option value="update">App Update</option>
                            <option value="feature">New Feature</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target *</label>
                          <select
                            required
                            value={formData.target}
                            onChange={(e) => setFormData({ ...formData, target: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          >
                            <option value="all">All Users</option>
                            <option value="active">Active Users Only</option>
                            <option value="new">New Users Only</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="schedule"
                          checked={formData.schedule}
                          onChange={(e) => setFormData({ ...formData, schedule: e.target.checked })}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="schedule" className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule for later</label>
                      </div>
                      {formData.schedule && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                            <input
                              type="date"
                              required={formData.schedule}
                              value={formData.scheduledDate}
                              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                            <input
                              type="time"
                              required={formData.schedule}
                              value={formData.scheduledTime}
                              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold">
                          <Send className="w-4 h-4" />
                          {formData.schedule ? 'Schedule' : 'Send Now'}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Notification History</h3>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800 dark:text-white">{notification.title}</h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                              {notification.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{getTargetLabel(notification.target)}</span>
                            <span>•</span>
                            <span>{notification.sentAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel Settings Tab */}
            {activeTab === 'panel-settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">App Name</label>
                    <input
                      type="text"
                      value={panelSettings.appName}
                      onChange={(e) => setPanelSettings({ ...panelSettings, appName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable maintenance mode to restrict access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={panelSettings.maintenanceMode}
                        onChange={(e) => setPanelSettings({ ...panelSettings, maintenanceMode: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Allow User Registration</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable or disable new user registrations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={panelSettings.allowUserRegistration}
                        onChange={(e) => setPanelSettings({ ...panelSettings, allowUserRegistration: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max File Upload Size (MB)</label>
                    <input
                      type="number"
                      value={panelSettings.maxFileUploadSize}
                      onChange={(e) => setPanelSettings({ ...panelSettings, maxFileUploadSize: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={panelSettings.sessionTimeout}
                      onChange={(e) => setPanelSettings({ ...panelSettings, sessionTimeout: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* Admin Users Tab */}
            {activeTab === 'admin-users' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Admin Users</h2>
                  <button
                    onClick={() => setShowAdminForm(!showAdminForm)}
                    className="flex items-center justify-center gap-2 px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold text-sm sm:text-base"
                  >
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    {showAdminForm ? 'Cancel' : 'Add Admin'}
                  </button>
                </div>

                {showAdminForm && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Add New Admin User</h3>
                    <form onSubmit={handleAddAdmin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={adminFormData.name}
                          onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={adminFormData.email}
                          onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                          placeholder="admin@drobeai.com"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role *</label>
                        <select
                          required
                          value={adminFormData.role}
                          onChange={(e) => setAdminFormData({ ...adminFormData, role: e.target.value as any })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Moderator">Moderator</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button type="submit" className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold">
                          <UserPlus className="w-4 h-4" />
                          Add Admin
                        </button>
                        <button type="button" onClick={() => setShowAdminForm(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="space-y-4">
                  {admins.map((admin) => (
                    <div key={admin.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white">{admin.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                              {admin.role}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Last login: {admin.lastLogin}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Appearance Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {theme === 'light' ? (
                        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Theme</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark mode</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Note:</strong> Theme changes are saved automatically and applied across the entire admin panel. Changes take effect immediately.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
