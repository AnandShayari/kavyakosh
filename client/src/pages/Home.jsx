import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PoetryCard from '../components/PoetryCard';
import ParticleBackground from '../components/ParticleBackground';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const fallbackTrending = [
  { title: 'Aasu Ka Safar', excerpt: 'A cinematic ode to silent nights and golden dreams.', author: 'Ayesha', mood: 'Dreamy' },
  { title: 'Shab-e-Tanhai', excerpt: 'Ghazal pulses with longing in a moonlit cityscape.', author: 'Rahil', mood: 'Melancholy' },
  { title: 'Kavya Sa Saahil', excerpt: 'A voice that drifts between love and the horizon.', author: 'Mira', mood: 'Hopeful' },
];

const CHALLENGE_HOURS = 24;

function getTimeLeft() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = end - now;
  const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trending, setTrending] = useState(fallbackTrending);
  const [followed, setFollowed] = useState({});
  const [countdown, setCountdown] = useState(getTimeLeft());

  useEffect(() => {
    apiService.getTrendingPoems(3)
      .then((res) => {
        if (res.data?.data?.length > 0) {
          setTrending(res.data.data.map((p) => ({
            id: p._id,
            title: p.title,
            excerpt: p.content?.slice(0, 80) + '...',
            author: p.author?.name || 'Unknown',
            mood: p.mood || 'Reflective',
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFollow = (name) => {
    if (!isAuthenticated) return navigate('/login');
    setFollowed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleJoinChallenge = () => {
    if (!isAuthenticated) return navigate('/login');
    navigate('/competitions');
  };

  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-12 lg:px-10">
      <ParticleBackground />
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-border bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),transparent_35%),linear-gradient(180deg,_rgba(12,12,18,0.9),_rgba(11,11,15,0.98))] p-10 shadow-[0_0_80px_rgba(212,175,55,0.12)] lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-primary">
              AI Poetry Universe
            </p>
            <h1 className="text-5xl font-display leading-tight tracking-tight text-text md:text-6xl">
              Dil ki baatein, <span className="text-primary">ab AI ke saath.</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted">
              KavyaKosh blends generative intelligence with soulful verse, premium reading flows, and poetic community rituals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button onClick={() => navigate('/publish')} className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-glow transition hover:bg-yellow-500">
                Start Writing <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/explore')} className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/90 px-6 py-3 text-sm text-text transition hover:border-primary hover:text-primary">
                Explore Stories <Sparkles size={18} />
              </button>
            </div>
          </div>
          <div className="relative rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl backdrop-blur-2xl cursor-pointer" onClick={() => navigate('/ai-studio')}>
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-background/80 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">AI Poetry Lab</p>
                <h2 className="mt-3 text-2xl font-semibold text-text">Generate a soulful shayari in seconds</h2>
                <p className="mt-3 text-sm leading-7 text-muted">Choose emotion, language, and style to craft your next unforgettable line.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Emotion</p>
                  <p className="mt-3 text-lg font-semibold text-text">Longing</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Genre</p>
                  <p className="mt-3 text-lg font-semibold text-text">Ghazal</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Language</p>
                  <p className="mt-3 text-lg font-semibold text-text">Hinglish</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Mood</p>
                  <p className="mt-3 text-lg font-semibold text-text">Dreamy</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl space-y-8">
        <SectionHeading title="Trending" subtitle="Emerging verses and glowing feeds" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trending.map((item) => (
            <PoetryCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-[2rem] border border-border bg-surface/80 p-10 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Featured Writers</p>
            <h2 className="text-3xl font-semibold text-text">Classic voices, curated for today.</h2>
            <p className="max-w-xl leading-7 text-muted">Discover creators with rich stories, new collections, and curated themes shaped by our AI studio.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {['Ayesha', 'Rahil', 'Mira'].map((name) => (
              <div key={name} className="glass-card p-5 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/15" />
                <h3 className="text-lg font-semibold text-text">{name}</h3>
                <p className="mt-2 text-sm text-muted">Featured Poet</p>
                <button
                  onClick={() => handleFollow(name)}
                  className={`mt-4 rounded-full border px-4 py-2 text-sm transition ${
                    followed[name]
                      ? 'bg-primary border-primary text-background'
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {followed[name] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-10">
          <div className="flex items-center gap-4 text-primary">
            <BookOpen size={24} />
            <p className="uppercase tracking-[0.28em] text-sm">Marketplace Preview</p>
          </div>
          <h3 className="mt-4 text-3xl font-semibold text-text">Premium books for the poetic collector.</h3>
          <p className="mt-4 text-sm leading-7 text-muted">Limited-edition collections, beautifully designed covers, and immersive reading formats tailored for the KavyaKosh member.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Versebound', 'Luminous Lines'].map((item) => (
              <div key={item} onClick={() => navigate('/marketplace')} className="rounded-3xl border border-border bg-background/85 p-5 cursor-pointer hover:border-primary transition">
                <p className="text-sm font-semibold text-text">{item}</p>
                <p className="mt-2 text-sm text-muted">Curated anthology with AI-powered annotations.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-10">
          <div className="flex items-center gap-4 text-primary">
            <Sparkles size={24} />
            <p className="uppercase tracking-[0.28em] text-sm">Daily Challenge</p>
          </div>
          <h3 className="mt-4 text-3xl font-semibold text-text">Write from the heart today.</h3>
          <p className="mt-4 text-sm leading-7 text-muted">Join the 24-hour verse challenge and share your poem with a community of emerging literary voices.</p>
          <div className="mt-8 rounded-3xl bg-background/90 p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">Countdown</p>
            <p className="mt-3 text-4xl font-semibold text-text">{countdown}</p>
            <button onClick={handleJoinChallenge} className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500">
              Join Challenge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
