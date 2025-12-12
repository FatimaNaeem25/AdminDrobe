import Layout from '@/components/Layout'
import { Search, Eye, Edit, UserMinus } from 'lucide-react'

const users = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8901',
    status: 'active',
    posting: 'Yes',
    commenting: 'Yes',
    avatar: 'bg-primary-100',
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '+1 234 567 8902',
    status: 'active',
    posting: 'Yes',
    commenting: 'Yes',
    avatar: 'bg-primary-200',
  },
  {
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 234 567 8903',
    status: 'inactive',
    posting: 'No',
    commenting: 'Yes',
    avatar: 'bg-primary-100',
  },
  {
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    phone: '+1 234 567 8904',
    status: 'active',
    posting: 'Yes',
    commenting: 'No',
    avatar: 'bg-primary-100',
  },
]

export default function UsersPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">User</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Phone</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hidden lg:table-cell">Posting</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hidden lg:table-cell">Commenting</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${user.avatar} dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold">{user.name[0]}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white truncate">{user.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-1">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">{user.phone}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' 
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {user.status}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2 lg:hidden">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.posting === 'Yes' 
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          Post: {user.posting}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.commenting === 'Yes' 
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          Comment: {user.commenting}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 hidden lg:table-cell">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        user.posting === 'Yes' 
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {user.posting}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 hidden lg:table-cell">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        user.commenting === 'Yes' 
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {user.commenting}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded">
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                          <UserMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

