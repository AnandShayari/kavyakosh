import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, MessageCircle, Share2, X, Send, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../components/ui/Input';
import { Badge } from '../components/ui/Card';
import { EmptyState } from '../components/ui/Feedback';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const moods = ['Romantic', 'Melancholy', 'Hopeful', 'Nostalgic', 'Passionate', 'Peaceful', 'Reflective', 'Sad', 'Happy'];
const genres = ['Shayari', 'Ghazal', 'Poem', 'Quote', 'Caption', 'Lyrics', 'Free Verse', 'Sonnet', 'Haiku'];
const languages = ['Hindi', 'Urdu', 'Hinglish', 'English'];

function Explore() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [likedPoems, setLikedPoems] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [commentPoem, setCommentPoem] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchPoems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedMood) params.mood = selectedMood;
      if (selectedLanguage) params.language = selectedLanguage;
      const res = await apiService.getPoems(params);
      let data = res.data?.data || [];
      if (selectedGenre) data = data.filter(p => p.category === selectedGenre);
      setPoems(data);
      const counts = {};
      data.forEach(p => { counts[p._id] = p.likeCount || 0; });
      setLikeCounts(counts);
    } catch {
      setPoems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, [selectedMood, selectedLanguage, selectedGenre]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchPoems(), 400);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleLike = async (poem) => {
    if (!isAuthenticated) return navigate('/login');
    const isLiked = likedPoems[poem._id];
    setLikedPoems(prev => ({ ...prev, [poem._id]: !isLiked }));
    setLikeCounts(prev => ({ ...prev, [poem._id]: isLiked ? prev[poem._id] - 1 : prev[poem._id] + 1 }));
    try {
      if (isLiked) await apiService.unlikePoem(poem._id);
      else await apiService.likePoem(poem._id);
    } catch {
      setLikedPoems(prev => ({ ...prev, [poem._id]: isLiked }));
      setLikeCounts(prev => ({ ...prev, [poem._id]: isLiked ? prev[poem._id] + 1 : prev[poem._id] - 1 }));
    }
  };

  const handleShare = async (poem) => {
    const url = `${window.location.origin}/poems/${poem._id}`;
    const shareData = { title: poem.title, text: poem.content?.slice(0, 100) + '...', url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopiedId(poem._id);
      setTimeout(() => setCopiedId(null), 2000);
      showToast('success', 'Link copied to clipboard!');
    }
  };

  const handleOpenComments = async (poem) => {
    if (!isAuthenticated) return navigate('/login');
    setCommentPoem(poem);
    setComments([]);
    try {
      const res = await apiService.getComments(poem._id);
      setComments(res.data?.data || []);
    } catch {}
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await apiService.addComment(commentPoem._id, { text: commentText });
      setComments(prev => [res.data?.data, ...prev]);
      setCommentText('');
      showToast('success', 'Comment added!');
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-display text-text mb-2">Explore Poetry</h1>
          <p className="text-muted">Discover voices, moods, and verses from our community</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <TextInput
                placeholder="Search by title, author, or mood..."
                value={searchQuery}
                onChange={handleSearch}
                icon={Search}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-2xl border px-4 py-3 text-text transition flex items-center gap-2 ${showFilters ? 'border-primary text-primary' : 'border-border hover:border-primary'}`}
            >
              <Filter size={18} /> Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-3xl p-6 space-y-4"
            >
              {[
                { label: 'Mood', items: moods, selected: selectedMood, setSelected: setSelectedMood },
                { label: 'Genre', items: genres, selected: selectedGenre, setSelected: setSelectedGenre },
                { label: 'Language', items: languages, selected: selectedLanguage, setSelected: setSelectedLanguage },
              ].map(({ label, items, selected, setSelected }) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-text mb-3">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <button
                        key={item}
                        onClick={() => setSelected(selected === item ? null : item)}
                        className={`rounded-full px-4 py-2 text-sm transition ${selected === item ? 'bg-primary text-background' : 'bg-surface/70 text-text border border-transparent hover:border-primary'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 animate-pulse h-64" />
            ))}
          </div>
        ) : poems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {poems.map((poem, idx) => (
              <motion.div
                key={poem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 transition"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    {poem.author?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{poem.author?.name || 'Unknown'}</p>
                    <p className="text-xs text-muted">{poem.mood}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 mb-4">
                  <h3 className="text-lg font-display text-text mb-2 line-clamp-2">{poem.title}</h3>
                  <p className="text-sm text-muted line-clamp-3 leading-relaxed">{poem.content?.slice(0, 100)}...</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {poem.category && <Badge variant="secondary">{poem.category}</Badge>}
                  {poem.language && <Badge variant="primary">{poem.language}</Badge>}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted">
                  <div className="flex gap-3">
                    {/* Like */}
                    <button
                      onClick={() => handleLike(poem)}
                      className={`flex items-center gap-1 transition ${likedPoems[poem._id] ? 'text-red-500' : 'hover:text-red-400'}`}
                    >
                      <Heart size={14} fill={likedPoems[poem._id] ? 'currentColor' : 'none'} />
                      <span>{likeCounts[poem._id] || 0}</span>
                    </button>

                    {/* Comment */}
                    <button
                      onClick={() => handleOpenComments(poem)}
                      className="flex items-center gap-1 hover:text-primary transition"
                    >
                      <MessageCircle size={14} />
                      <span>{poem.commentCount || 0}</span>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    {/* Share */}
                    <button
                      onClick={() => handleShare(poem)}
                      className={`transition ${copiedId === poem._id ? 'text-primary' : 'hover:text-primary'}`}
                      title="Share"
                    >
                      <Share2 size={14} />
                    </button>

                    {/* Read */}
                    <button
                      onClick={() => navigate(`/poems/${poem._id}`)}
                      className="flex items-center gap-1 hover:text-primary transition"
                      title="Read full poem"
                    >
                      <BookOpen size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState title="No poetry found" description="Try adjusting your filters or search terms" />
        )}
      </div>

      {/* Comments Modal */}
      <AnimatePresence>
        {commentPoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-2xl max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text">Comments — {commentPoem.title}</h3>
                <button onClick={() => { setCommentPoem(null); setCommentText(''); }} className="text-muted hover:text-text transition">
                  <X size={20} />
                </button>
              </div>

              {/* Comments list */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-1">
                {comments.length === 0 ? (
                  <p className="text-sm text-muted text-center py-6">No comments yet. Be the first!</p>
                ) : (
                  comments.map((c, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-background/80 px-4 py-3">
                      <p className="text-xs font-semibold text-primary mb-1">{c?.author?.name || 'Anonymous'}</p>
                      <p className="text-sm text-text">{c?.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add comment */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-text outline-none focus:border-primary transition"
                />
                <button
                  onClick={handleAddComment}
                  disabled={submittingComment || !commentText.trim()}
                  className="rounded-2xl bg-primary px-4 py-3 text-background hover:bg-yellow-500 transition disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-6 py-4 text-sm font-semibold shadow-lg ${toast.type === 'success' ? 'bg-primary text-background' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Explore;
