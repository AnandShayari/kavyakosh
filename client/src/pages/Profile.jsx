import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Bookmark, Activity, Settings, LogOut, Edit2, Heart, MessageCircle, Share2 } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { Badge } from '../components/ui/Card';
import { staggerContainer, staggerItem } from '../utils/animations';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = [
    { icon: User, label: 'Poems', value: '38', color: 'text-primary' },
    { icon: Heart, label: 'Likes', value: '1.2K', color: 'text-error' },
    { icon: Bookmark, label: 'Saved', value: '127', color: 'text-secondary' },
    { icon: Activity, label: 'Followers', value: '892', color: 'text-primary' },
  ];

  const poems = [
    {
      id: 1,
      title: 'Moonlit Whispers',
      excerpt: 'In the silence of night...',
      date: '2 days ago',
      mood: 'Romantic',
      likes: 342,
      comments: 89,
    },
    {
      id: 2,
      title: 'City Dreams',
      excerpt: 'Neon lights dancing...',
      date: '1 week ago',
      mood: 'Nostalgic',
      likes: 521,
      comments: 142,
    },
  ];

  const recentActivity = [
    { action: 'You published', item: 'Moonlit Whispers', time: '2 days ago' },
    { action: 'You saved', item: 'Urban Poetry Collection', time: '5 days ago' },
    { action: 'You earned', item: '100 hearts milestone', time: '1 week ago' },
    { action: 'You received', item: 'Featured Poet badge', time: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 glass-card rounded-3xl p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[200px_1fr_auto]">
            {/* Avatar */}
            <div className="flex items-center justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-display text-background"
              >
                KP
              </motion.div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-display text-text mb-2">Kavya Poet</h1>
              <p className="text-muted mb-4">@kavyapoet • Joined 3 months ago</p>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Passionate about Hindi poetry, AI innovation, and storytelling. Creating verses that resonate with the soul.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Featured Poet</Badge>
                <Badge variant="secondary">Premium Member</Badge>
                <Badge variant="success">Verified</Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 lg:justify-center">
              <SecondaryButton icon={Edit2}>Edit Profile</SecondaryButton>
              <SecondaryButton icon={Settings}>Settings</SecondaryButton>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-12 grid gap-6 grid-cols-2 md:grid-cols-4"
        >
          {userStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="glass-card rounded-3xl p-6 text-center"
            >
              <stat.icon size={32} className={`mx-auto mb-4 ${stat.color}`} />
              <p className="text-3xl font-display text-text mb-1">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex gap-4 border-b border-border"
        >
          {['overview', 'poems', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition relative ${
                activeTab === tab ? 'text-primary' : 'text-muted hover:text-text'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Poems */}
            <div>
              <h2 className="text-2xl font-display text-text mb-6">Top Poems</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {poems.map((poem) => (
                  <motion.div
                    key={poem.id}
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-3xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-display text-text mb-1">{poem.title}</h3>
                        <p className="text-xs text-muted">{poem.date}</p>
                      </div>
                      <Badge variant="secondary">{poem.mood}</Badge>
                    </div>
                    <p className="text-sm text-muted line-clamp-2 mb-4">{poem.excerpt}</p>
                    <div className="flex gap-4 text-xs text-muted border-t border-border pt-4">
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        {poem.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {poem.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={14} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-display text-text mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-card rounded-3xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm text-text">
                        <span className="font-semibold text-primary">{item.action}</span>{' '}
                        <span className="text-muted">{item.item}</span>
                      </p>
                      <p className="text-xs text-muted mt-1">{item.time}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'poems' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center py-12">
              <p className="text-muted">All poems view coming soon</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center py-12">
              <p className="text-muted">Detailed activity view coming soon</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Profile;
