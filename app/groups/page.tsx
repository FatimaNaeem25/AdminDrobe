import Layout from '@/components/Layout'
import { Search, Eye, Trash2, Calendar } from 'lucide-react'

const groups = [
  {
    name: 'Fashion Lovers',
    description: 'A community for fashion enthusiasts',
    members: 1234,
    created: 'Nov 15, 2024',
  },
  {
    name: 'Streetwear',
    description: 'Urban street fashion community',
    members: 892,
    created: 'Oct 22, 2024',
  },
  {
    name: 'Minimalist Style',
    description: 'Less is more - minimalist fashion',
    members: 567,
    created: 'Sep 10, 2024',
  },
  {
    name: 'Vintage Collection',
    description: 'Classic and timeless fashion',
    members: 445,
    created: 'Aug 5, 2024',
  },
  {
    name: 'Designer Brands',
    description: 'Luxury fashion and designer pieces',
    members: 678,
    created: 'Jul 20, 2024',
  },
]

export default function GroupsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-semibold rounded-full">
                  {group.members} members
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">{group.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4">{group.description}</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Created {group.created}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>View</span>
                </button>
                <button className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

