import Layout from '@/components/Layout'
import { Users, FileText, Zap, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Total Users',
    value: '12,847',
    change: '+12.5%',
    icon: Users,
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-600',
  },
  {
    label: 'Total Posts',
    value: '48,392',
    change: '+8.2%',
    icon: FileText,
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-600',
  },
  {
    label: 'AI Generations',
    value: '156,234',
    change: '+23.5%',
    icon: Zap,
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-600',
  },
  {
    label: 'Engagement Rate',
    value: '68.4%',
    change: '+5.1%',
    icon: TrendingUp,
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-700',
  },
]

const recentUsers = [
  { name: 'Sarah', email: 'sarah@email.com', joined: 'Dec 10, 2024', status: 'active' },
  { name: 'Chen', email: 'chen@email.com', joined: 'Dec 9, 2024', status: 'active' },
  { name: 'Emily', email: 'emily@email.com', joined: 'Dec 8, 2024', status: 'active' },
  { name: 'James', email: 'james@email.com', joined: 'Dec 7, 2024', status: 'active' },
]

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} dark:bg-primary-900/30 p-2 sm:p-3 rounded-lg`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor} dark:text-primary-300`} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</h3>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  <span className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-semibold">{stat.change}</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">from last month</p>
              </div>
            )
          })}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Outfit Generations Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">AI Outfit Generations</h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">4,230</p>
              <span className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-semibold">+23.5% from last month</span>
            </div>
            <div className="h-32 sm:h-48 flex items-end gap-1 sm:gap-2 overflow-x-auto">
              {[65, 75, 70, 80, 85, 90, 95, 100, 95, 90, 85, 88, 92, 95, 98, 100, 95, 90, 88, 92, 95, 98, 100, 95, 90, 88, 92, 95, 98, 100].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ 
                    height: `${height}%`,
                    background: `linear-gradient(to top, #5603CD, #4646CD, #3494CC)`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Recent Users</h2>
              <a href="/users" className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View All →
              </a>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">User</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Email</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Joined</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-3 sm:px-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-brand flex-shrink-0"></div>
                            <div className="min-w-0">
                              <span className="font-medium text-sm sm:text-base text-gray-800 dark:text-white block truncate">{user.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">{user.email}</td>
                        <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">{user.joined}</td>
                        <td className="py-3 px-3 sm:px-4">
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

