import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Share2 } from 'lucide-react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function PoemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    apiService.getPoem(id)
      .then((res) => {
        setPoem(res.data.data);
        setLikeCount(res.data.data.likeCount || 0);
      })
      .catch(() => navigate('/explore'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) return navigate('/login');
    try {
      if (liked) {
        await apiService.unlikePoem(id);
        setLikeCount((c) => c - 1);
      } else {
        await apiService.likePoem(id);
        setLikeCount((c) => c + 1);
      }
      setLiked(!liked);
    } catch {}
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = { title: poem?.title, text: poem?.content?.slice(0, 100) + '...', url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>
  );

  if (!poem) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background px-6 py-12 lg:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted hover:text-primary transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="glass-card rounded-3xl p-10">
          {poem.mood && (
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
              {poem.mood}
            </span>
          )}

          <h1 className="mt-6 text-4xl font-display text-text">{poem.title}</h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              {poem.author?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{poem.author?.name || 'Unknown'}</p>
              {poem.publishedDate && (
                <p className="text-xs text-muted">{new Date(poem.publishedDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          <div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-text font-light">
            {poem.content}
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition border ${
                liked ? 'bg-primary text-background border-primary' : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              {likeCount}
            </button>
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition ${
                copied ? 'border-primary text-primary' : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              <Share2 size={16} /> {copied ? 'Link Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PoemDetail;
