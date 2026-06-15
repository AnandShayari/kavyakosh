import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function getTimeLeft(endDate) {
  if (!endDate) return '00:00:00';
  const diff = new Date(endDate) - new Date();
  if (diff <= 0) return '00:00:00';
  const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const rankColors = ['text-yellow-400', 'text-gray-400', 'text-amber-600'];
const rankLabels = ['🥇', '🥈', '🥉'];

function Competitions() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [countdown, setCountdown] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const [userPoems, setUserPoems] = useState([]);
  const [selectedPoem, setSelectedPoem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadingLB, setLoadingLB] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api.get('/competitions')
      .then((res) => {
        const list = res.data?.data || [];
        setCompetitions(list);
        if (list.length > 0) selectCompetition(list[0]);
      })
      .catch(() => {});
  }, []);

  const selectCompetition = (comp) => {
    setSelected(comp);
    setLeaderboard([]);
    setLoadingLB(true);
    api.get(`/competitions/${comp._id}/leaderboard`)
      .then((res) => setLeaderboard(res.data?.data || []))
      .catch(() => setLeaderboard([]))
      .finally(() => setLoadingLB(false));
  };

  useEffect(() => {
    if (!selected) return;
    const timer = setInterval(() => setCountdown(getTimeLeft(selected.endDate)), 1000);
    setCountdown(getTimeLeft(selected.endDate));
    return () => clearInterval(timer);
  }, [selected]);

  const handleSubmitEntry = async () => {
    if (!isAuthenticated) return navigate('/login');
    if (!selected) return;
    setShowSubmit(true);
    try {
      const auth = JSON.parse(localStorage.getItem('kavyakosh_auth') || '{}');
      if (auth.accessToken) {
        const me = await api.get('/auth/current-user');
        const userId = me.data?.data?._id;
        if (userId) {
          const poems = await api.get(`/poems/user/${userId}`);
          setUserPoems(poems.data?.data || []);
        }
      }
    } catch {}
  };

  const handleSubmit = async () => {
    if (!selectedPoem) return showToast('error', 'Please select a poem');
    setSubmitting(true);
    try {
      await api.post(`/competitions/${selected._id}/submit`, { poemId: selectedPoem });
      showToast('success', 'Entry submitted successfully!');
      setShowSubmit(false);
      setSelectedPoem('');
      selectCompetition(selected);
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Competitions" subtitle="Cinematic challenges and live rankings" />

      {competitions.length === 0 ? (
        <div className="mt-16 text-center text-muted">No active competitions right now. Check back soon!</div>
      ) : (
        <>
          {/* Competition tabs */}
          {competitions.length > 1 && (
            <div className="mt-8 flex gap-3 flex-wrap">
              {competitions.map((c) => (
                <button
                  key={c._id}
                  onClick={() => selectCompetition(c)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition border ${
                    selected?._id === c._id
                      ? 'bg-primary text-background border-primary'
                      : 'border-border text-muted hover:border-primary hover:text-primary'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            {/* Competition details */}
            <div className="rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-primary">Current Competition</p>
              <h2 className="mt-4 text-3xl font-semibold text-text">{selected?.title}</h2>
              <p className="mt-4 leading-7 text-muted">{selected?.description}</p>
              {selected?.theme && (
                <p className="mt-3 text-sm text-primary">Theme: <span className="text-text">{selected.theme}</span></p>
              )}
              {selected?.totalPrizePool > 0 && (
                <p className="mt-2 text-sm text-primary">Prize Pool: <span className="text-text font-semibold">₹{selected.totalPrizePool}</span></p>
              )}
              <div className="mt-8 rounded-3xl border border-border bg-background/90 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-muted">Time Remaining</p>
                <p className="mt-3 text-4xl font-semibold text-text font-mono">{countdown}</p>
              </div>
              <div className="mt-6 text-sm text-muted">
                <span>{selected?.submissionCount || 0} submissions</span>
                <span className="mx-3">•</span>
                <span>{selected?.entrantCount || 0} participants</span>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="rounded-[2rem] border border-border bg-background/90 p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-primary" />
                <p className="text-sm uppercase tracking-[0.28em] text-primary">Leaderboard</p>
              </div>

              <div className="mt-6 space-y-3">
                {loadingLB ? (
                  <p className="text-sm text-muted text-center py-6">Loading...</p>
                ) : leaderboard.length === 0 ? (
                  <p className="text-sm text-muted text-center py-6">No submissions yet. Be the first!</p>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between rounded-3xl border border-border bg-surface/80 px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-6">{idx < 3 ? rankLabels[idx] : `${idx + 1}.`}</span>
                        <div>
                          <p className={`text-sm font-semibold ${idx < 3 ? rankColors[idx] : 'text-text'}`}>
                            {entry.user?.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-muted">{entry.poem?.title || ''}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary">{entry.score} pts</span>
                    </motion.div>
                  ))
                )}
              </div>

              <button
                onClick={handleSubmitEntry}
                className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500"
              >
                Submit Entry
              </button>
            </div>
          </div>
        </>
      )}

      {/* Submit Entry Modal */}
      <AnimatePresence>
        {showSubmit && (
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
              className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-text">Submit Your Entry</h3>
                <button onClick={() => setShowSubmit(false)} className="text-muted hover:text-text transition">
                  <X size={20} />
                </button>
              </div>

              {userPoems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted mb-4">You have no published poems yet.</p>
                  <button
                    onClick={() => { setShowSubmit(false); navigate('/publish'); }}
                    className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-background hover:bg-yellow-500 transition"
                  >
                    Write a Poem
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted mb-4">Select one of your published poems:</p>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {userPoems.map((poem) => (
                      <div
                        key={poem._id}
                        onClick={() => setSelectedPoem(poem._id)}
                        className={`rounded-2xl border px-4 py-3 cursor-pointer transition ${
                          selectedPoem === poem._id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <p className="text-sm font-semibold text-text">{poem.title}</p>
                        <p className="text-xs text-muted mt-1">{poem.mood} • {poem.category}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !selectedPoem}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500 disabled:opacity-50"
                  >
                    <Send size={16} />
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-6 py-4 text-sm font-semibold shadow-lg ${
          toast.type === 'success' ? 'bg-primary text-background' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Competitions;
