import Layout from '@/components/Layout'
import { Search, Heart, MessageCircle } from 'lucide-react'

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594938291221-94f313b0e69a?w=400&h=500&fit=crop',
    tags: ['#casual', '#summer', '#streetwear'],
    likes: 234,
    comments: 12,
    user: {
      name: 'Sarah Johnson',
      avatar: 'bg-primary-100',
      timeAgo: '2 hours ago',
    },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
    tags: ['#formal', '#business', '#elegant'],
    likes: 189,
    comments: 8,
    user: {
      name: 'Michael Chen',
      avatar: 'bg-primary-200',
      timeAgo: '5 hours ago',
    },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop',
    tags: ['#vintage', '#retro', '#classic'],
    likes: 456,
    comments: 23,
    user: {
      name: 'Emily Davis',
      avatar: 'bg-primary-100',
      timeAgo: '8 hours ago',
    },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    tags: ['#sporty', '#active', '#comfort'],
    likes: 312,
    comments: 15,
    user: {
      name: 'James Wilson',
      avatar: 'bg-primary-100',
      timeAgo: '12 hours ago',
    },
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
    tags: ['#trendy', '#modern', '#fashion'],
    likes: 567,
    comments: 34,
    user: {
      name: 'Lisa Anderson',
      avatar: 'bg-primary-100',
      timeAgo: '1 day ago',
    },
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
    tags: ['#minimalist', '#clean', '#simple'],
    likes: 278,
    comments: 19,
    user: {
      name: 'David Brown',
      avatar: 'bg-primary-200',
      timeAgo: '1 day ago',
    },
  },
]

export default function FeedPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts, tags, or users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Image Container */}
              <div className="relative aspect-[4/5] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                  <div className="text-6xl">👕</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                {/* User Info */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${post.user.avatar} dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold">
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white truncate">{post.user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.user.timeAgo}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Likes and Comments */}
                <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-300">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 dark:text-red-400" />
                    <span className="text-xs sm:text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-300">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

