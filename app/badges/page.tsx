'use client'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { Search, Plus, Edit, Trash2, Save } from 'lucide-react'
import { useState } from 'react'

interface Badge {
  id: number
  title: string
  description: string
  requirement: string
  icon: string
  category: string
}

const initialBadges: Badge[] = [
  {
    id: 1,
    title: 'Style Starter',
    description: 'Begin your fashion journey',
    requirement: 'Upload 5 clothing items',
    icon: '👕',
    category: 'Upload',
  },
  {
    id: 2,
    title: 'AI Explorer',
    description: 'Embrace AI-powered styling',
    requirement: 'Generate 10 AI outfits',
    icon: '✨',
    category: 'AI',
  },
  {
    id: 3,
    title: 'Community Star',
    description: 'Shine in the community',
    requirement: 'Receive 100 likes on posts',
    icon: '⭐',
    category: 'Social',
  },
  {
    id: 4,
    title: 'Fashion Icon',
    description: 'Become a fashion influencer',
    requirement: 'Reach 1000 followers',
    icon: '👑',
    category: 'Social',
  },
  {
    id: 5,
    title: 'Trend Setter',
    description: 'Set the latest trends',
    requirement: 'Create 50 trending posts',
    icon: '🔥',
    category: 'Content',
  },
  {
    id: 6,
    title: 'Style Master',
    description: 'Master the art of styling',
    requirement: 'Complete 100 outfit combinations',
    icon: '🎨',
    category: 'Content',
  },
]

const categories = ['Upload', 'AI', 'Social', 'Content', 'Achievement', 'Special']

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>(initialBadges)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirement: '',
    icon: '',
    category: 'Upload',
  })

  const filteredBadges = badges.filter(
    (badge) =>
      badge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddBadge = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      title: '',
      description: '',
      requirement: '',
      icon: '',
      category: 'Upload',
    })
  }

  const handleSubmitBadge = (e: React.FormEvent) => {
    e.preventDefault()
    const newBadge: Badge = {
      id: badges.length + 1,
      ...formData,
    }
    setBadges([...badges, newBadge])
    handleCloseModal()
    alert('Badge added successfully!')
  }

  const handleEditBadge = (badge: Badge) => {
    // TODO: Open edit badge modal/form
    console.log('Edit badge:', badge)
  }

  const handleDeleteBadge = (badge: Badge) => {
    if (confirm(`Are you sure you want to delete "${badge.title}" badge?`)) {
      setBadges(badges.filter(b => b.id !== badge.id))
      alert('Badge deleted successfully!')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleAddBadge}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add New Badge</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search badges by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Badges Grid */}
        {filteredBadges.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No badges found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleEditBadge(badge)}
                    className="p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit badge"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBadge(badge)}
                    className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete badge"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Badge Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-2xl sm:text-3xl">
                  {badge.icon}
                </div>

                {/* Badge Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">{badge.title}</h3>

                {/* Badge Description */}
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">{badge.description}</p>

                {/* Category Badge */}
                <div className="mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                    {badge.category}
                  </span>
                </div>

                {/* Requirement */}
                <div className="mb-0 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Requirement:</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{badge.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges Count */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredBadges.length} of {badges.length} badges
        </div>
      </div>

      {/* Add Badge Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Badge">
        <form onSubmit={handleSubmitBadge} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Badge Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Style Starter"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the badge"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Requirement *
            </label>
            <input
              type="text"
              required
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              placeholder="e.g., Upload 5 clothing items"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji) *
              </label>
              <input
                type="text"
                required
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="👕"
                maxLength={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-center text-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold"
            >
              <Save className="w-4 h-4" />
              Create Badge
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
