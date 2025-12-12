'use client'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { Search, Plus, Edit, Trash2, Save, Sparkles, Image as ImageIcon, MessageSquare, Calendar, Heart } from 'lucide-react'
import { useState } from 'react'

// Types
interface Event {
  id: number
  name: string
  description: string
  createdAt: string
}

interface Mood {
  id: number
  name: string
  description: string
  createdAt: string
}

interface Prompt {
  id: number
  type: 'outfit-generation' | 'flat-lay' | 'outfit-image'
  title: string
  prompt: string
  createdAt: string
}

interface Feedback {
  id: number
  userId: string
  userName: string
  outfitId: string
  rating: number
  comment: string
  createdAt: string
}

type Tab = 'events-moods' | 'prompts' | 'feedbacks'

// Initial Data
const initialEvents: Event[] = [
  { id: 1, name: 'Casual Day Out', description: 'Perfect for everyday activities', createdAt: '2024-01-15' },
  { id: 2, name: 'Formal Event', description: 'Business meetings and formal occasions', createdAt: '2024-01-16' },
  { id: 3, name: 'Date Night', description: 'Romantic evening outfits', createdAt: '2024-01-17' },
  { id: 4, name: 'Beach Party', description: 'Summer beach and pool events', createdAt: '2024-01-18' },
]

const initialMoods: Mood[] = [
  { id: 1, name: 'Elegant', description: 'Sophisticated and refined style', createdAt: '2024-01-15' },
  { id: 2, name: 'Casual', description: 'Relaxed and comfortable', createdAt: '2024-01-16' },
  { id: 3, name: 'Bold', description: 'Daring and statement-making', createdAt: '2024-01-17' },
  { id: 4, name: 'Minimalist', description: 'Simple and clean aesthetic', createdAt: '2024-01-18' },
]

const initialPrompts: Prompt[] = [
  {
    id: 1,
    type: 'outfit-generation',
    title: 'Default Outfit Generation',
    prompt: 'Create a stylish outfit that matches the selected event and mood. Consider current fashion trends and color coordination.',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    type: 'flat-lay',
    title: 'Default Flat Lay',
    prompt: 'Generate a beautiful flat lay image showing the outfit items arranged aesthetically on a neutral background with good lighting.',
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    type: 'outfit-image',
    title: 'Default Outfit Image',
    prompt: 'Create a high-quality outfit image with a model wearing the complete outfit in a professional setting with good lighting.',
    createdAt: '2024-01-15',
  },
]

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    userId: 'user1',
    userName: 'Sarah Johnson',
    outfitId: 'outfit-123',
    rating: 5,
    comment: 'Love this outfit! Perfect for my date night.',
    createdAt: '2024-01-20',
  },
  {
    id: 2,
    userId: 'user2',
    userName: 'Michael Chen',
    outfitId: 'outfit-124',
    rating: 4,
    comment: 'Great combination, but would prefer different colors.',
    createdAt: '2024-01-21',
  },
  {
    id: 3,
    userId: 'user3',
    userName: 'Emily Davis',
    outfitId: 'outfit-125',
    rating: 5,
    comment: 'Absolutely stunning! The AI really understood my style.',
    createdAt: '2024-01-22',
  },
  {
    id: 4,
    userId: 'user4',
    userName: 'James Wilson',
    outfitId: 'outfit-126',
    rating: 3,
    comment: 'Not quite what I was looking for, but decent.',
    createdAt: '2024-01-23',
  },
]

export default function OutfitGenerationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('events-moods')
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [moods, setMoods] = useState<Mood[]>(initialMoods)
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [feedbacks] = useState<Feedback[]>(initialFeedbacks)
  
  // Search states
  const [eventSearchTerm, setEventSearchTerm] = useState('')
  const [moodSearchTerm, setMoodSearchTerm] = useState('')
  const [promptSearchTerm, setPromptSearchTerm] = useState('')
  const [feedbackSearchTerm, setFeedbackSearchTerm] = useState('')
  
  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false)
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingMood, setEditingMood] = useState<Mood | null>(null)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  
  // Form states
  const [eventFormData, setEventFormData] = useState({ name: '', description: '' })
  const [moodFormData, setMoodFormData] = useState({ name: '', description: '' })
  const [promptFormData, setPromptFormData] = useState({
    type: 'outfit-generation' as 'outfit-generation' | 'flat-lay' | 'outfit-image',
    title: '',
    prompt: '',
  })

  // Filtered data
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(eventSearchTerm.toLowerCase())
  )

  const filteredMoods = moods.filter(
    (mood) =>
      mood.name.toLowerCase().includes(moodSearchTerm.toLowerCase()) ||
      mood.description.toLowerCase().includes(moodSearchTerm.toLowerCase())
  )

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(promptSearchTerm.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(promptSearchTerm.toLowerCase()) ||
      prompt.type.toLowerCase().includes(promptSearchTerm.toLowerCase())
  )

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.userName.toLowerCase().includes(feedbackSearchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(feedbackSearchTerm.toLowerCase())
  )

  // Event handlers
  const handleAddEvent = () => {
    setEditingEvent(null)
    setEventFormData({ name: '', description: '' })
    setIsEventModalOpen(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setEventFormData({ name: event.name, description: event.description })
    setIsEventModalOpen(true)
  }

  const handleDeleteEvent = (event: Event) => {
    if (confirm(`Are you sure you want to delete "${event.name}" event?`)) {
      setEvents(events.filter((e) => e.id !== event.id))
      alert('Event deleted successfully!')
    }
  }

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, name: eventFormData.name, description: eventFormData.description }
            : e
        )
      )
      alert('Event updated successfully!')
    } else {
      const newEvent: Event = {
        id: events.length + 1,
        name: eventFormData.name,
        description: eventFormData.description,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setEvents([...events, newEvent])
      alert('Event added successfully!')
    }
    setIsEventModalOpen(false)
    setEventFormData({ name: '', description: '' })
    setEditingEvent(null)
  }

  const handleAddMood = () => {
    setEditingMood(null)
    setMoodFormData({ name: '', description: '' })
    setIsMoodModalOpen(true)
  }

  const handleEditMood = (mood: Mood) => {
    setEditingMood(mood)
    setMoodFormData({ name: mood.name, description: mood.description })
    setIsMoodModalOpen(true)
  }

  const handleDeleteMood = (mood: Mood) => {
    if (confirm(`Are you sure you want to delete "${mood.name}" mood?`)) {
      setMoods(moods.filter((m) => m.id !== mood.id))
      alert('Mood deleted successfully!')
    }
  }

  const handleSubmitMood = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMood) {
      setMoods(
        moods.map((m) =>
          m.id === editingMood.id
            ? { ...m, name: moodFormData.name, description: moodFormData.description }
            : m
        )
      )
      alert('Mood updated successfully!')
    } else {
      const newMood: Mood = {
        id: moods.length + 1,
        name: moodFormData.name,
        description: moodFormData.description,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setMoods([...moods, newMood])
      alert('Mood added successfully!')
    }
    setIsMoodModalOpen(false)
    setMoodFormData({ name: '', description: '' })
    setEditingMood(null)
  }

  const handleAddPrompt = () => {
    setEditingPrompt(null)
    setPromptFormData({ type: 'outfit-generation', title: '', prompt: '' })
    setIsPromptModalOpen(true)
  }

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setPromptFormData({ type: prompt.type, title: prompt.title, prompt: prompt.prompt })
    setIsPromptModalOpen(true)
  }

  const handleDeletePrompt = (prompt: Prompt) => {
    if (confirm(`Are you sure you want to delete "${prompt.title}" prompt?`)) {
      setPrompts(prompts.filter((p) => p.id !== prompt.id))
      alert('Prompt deleted successfully!')
    }
  }

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPrompt) {
      setPrompts(
        prompts.map((p) =>
          p.id === editingPrompt.id
            ? { ...p, type: promptFormData.type, title: promptFormData.title, prompt: promptFormData.prompt }
            : p
        )
      )
      alert('Prompt updated successfully!')
    } else {
      const newPrompt: Prompt = {
        id: prompts.length + 1,
        type: promptFormData.type,
        title: promptFormData.title,
        prompt: promptFormData.prompt,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setPrompts([...prompts, newPrompt])
      alert('Prompt added successfully!')
    }
    setIsPromptModalOpen(false)
    setPromptFormData({ type: 'outfit-generation', title: '', prompt: '' })
    setEditingPrompt(null)
  }

  const getPromptTypeLabel = (type: string) => {
    switch (type) {
      case 'outfit-generation':
        return 'Outfit Generation'
      case 'flat-lay':
        return 'Flat Lay Image'
      case 'outfit-image':
        return 'Outfit Image'
      default:
        return type
    }
  }

  const getPromptTypeIcon = (type: string) => {
    switch (type) {
      case 'outfit-generation':
        return <Sparkles className="w-5 h-5" />
      case 'flat-lay':
        return <ImageIcon className="w-5 h-5" />
      case 'outfit-image':
        return <ImageIcon className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('events-moods')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'events-moods'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events & Moods
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'prompts'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Prompts
            </button>
            <button
              onClick={() => setActiveTab('feedbacks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'feedbacks'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Feedbacks
            </button>
          </div>
        </div>

        {/* Events & Moods Tab */}
        {activeTab === 'events-moods' && (
          <div className="space-y-6">
            {/* Events Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Events</h2>
                <button
                  onClick={handleAddEvent}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Event</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={eventSearchTerm}
                  onChange={(e) => setEventSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 relative"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{event.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created: {event.createdAt}</p>
                  </div>
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">No events found</div>
              )}
            </div>

            {/* Moods Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Moods</h2>
                <button
                  onClick={handleAddMood}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Mood</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search moods..."
                  value={moodSearchTerm}
                  onChange={(e) => setMoodSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMoods.map((mood) => (
                  <div
                    key={mood.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 relative"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditMood(mood)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit mood"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMood(mood)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete mood"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{mood.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{mood.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created: {mood.createdAt}</p>
                  </div>
                ))}
              </div>
              {filteredMoods.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">No moods found</div>
              )}
            </div>
          </div>
        )}

        {/* Prompts Tab */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Prompts</h2>
                <button
                  onClick={handleAddPrompt}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Prompt</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={promptSearchTerm}
                  onChange={(e) => setPromptSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 relative"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditPrompt(prompt)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit prompt"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(prompt)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete prompt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {getPromptTypeIcon(prompt.type)}
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                        {getPromptTypeLabel(prompt.type)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{prompt.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">{prompt.prompt}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created: {prompt.createdAt}</p>
                  </div>
                ))}
              </div>
              {filteredPrompts.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">No prompts found</div>
              )}
            </div>
          </div>
        )}

        {/* Feedbacks Tab */}
        {activeTab === 'feedbacks' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Feedbacks</h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search feedbacks by user or comment..."
                  value={feedbackSearchTerm}
                  onChange={(e) => setFeedbackSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-4">
                {filteredFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{feedback.userName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Outfit ID: {feedback.outfitId}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Heart
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{feedback.comment}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date: {feedback.createdAt}</p>
                  </div>
                ))}
              </div>
              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">No feedbacks found</div>
              )}
            </div>
          </div>
        )}

        {/* Event Modal */}
        <Modal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false)
            setEventFormData({ name: '', description: '' })
            setEditingEvent(null)
          }}
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
        >
          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Name *
              </label>
              <input
                type="text"
                required
                value={eventFormData.name}
                onChange={(e) => setEventFormData({ ...eventFormData, name: e.target.value })}
                placeholder="e.g., Casual Day Out"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={eventFormData.description}
                onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                placeholder="Brief description of the event"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold"
              >
                <Save className="w-4 h-4" />
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEventModalOpen(false)
                  setEventFormData({ name: '', description: '' })
                  setEditingEvent(null)
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* Mood Modal */}
        <Modal
          isOpen={isMoodModalOpen}
          onClose={() => {
            setIsMoodModalOpen(false)
            setMoodFormData({ name: '', description: '' })
            setEditingMood(null)
          }}
          title={editingMood ? 'Edit Mood' : 'Add New Mood'}
        >
          <form onSubmit={handleSubmitMood} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood Name *
              </label>
              <input
                type="text"
                required
                value={moodFormData.name}
                onChange={(e) => setMoodFormData({ ...moodFormData, name: e.target.value })}
                placeholder="e.g., Elegant"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={moodFormData.description}
                onChange={(e) => setMoodFormData({ ...moodFormData, description: e.target.value })}
                placeholder="Brief description of the mood"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold"
              >
                <Save className="w-4 h-4" />
                {editingMood ? 'Update Mood' : 'Create Mood'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoodModalOpen(false)
                  setMoodFormData({ name: '', description: '' })
                  setEditingMood(null)
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* Prompt Modal */}
        <Modal
          isOpen={isPromptModalOpen}
          onClose={() => {
            setIsPromptModalOpen(false)
            setPromptFormData({ type: 'outfit-generation', title: '', prompt: '' })
            setEditingPrompt(null)
          }}
          title={editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
        >
          <form onSubmit={handleSubmitPrompt} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prompt Type *
              </label>
              <select
                required
                value={promptFormData.type}
                onChange={(e) =>
                  setPromptFormData({
                    ...promptFormData,
                    type: e.target.value as 'outfit-generation' | 'flat-lay' | 'outfit-image',
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="outfit-generation">Outfit Generation</option>
                <option value="flat-lay">Flat Lay Image</option>
                <option value="outfit-image">Outfit Image</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prompt Title *
              </label>
              <input
                type="text"
                required
                value={promptFormData.title}
                onChange={(e) => setPromptFormData({ ...promptFormData, title: e.target.value })}
                placeholder="e.g., Default Outfit Generation"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prompt Text *
              </label>
              <textarea
                required
                value={promptFormData.prompt}
                onChange={(e) => setPromptFormData({ ...promptFormData, prompt: e.target.value })}
                placeholder="Enter the prompt text..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 gradient-brand text-white rounded-lg hover:opacity-90 font-semibold"
              >
                <Save className="w-4 h-4" />
                {editingPrompt ? 'Update Prompt' : 'Create Prompt'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPromptModalOpen(false)
                  setPromptFormData({ type: 'outfit-generation', title: '', prompt: '' })
                  setEditingPrompt(null)
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}

