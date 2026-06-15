import { Link } from 'react-router-dom';
import { Activity, Bookmark, PenLine, Settings, Sparkles, User } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { Badge } from '../components/ui/Card';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

function UserPanel() {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'KK';

  const stats = [
    { label: 'Poems', value: user?.totalPoems || 0, icon: PenLine },
    { label: 'Saved', value: user?.favorites?.length || 0, icon: Bookmark },
    { label: 'Followers', value: user?.totalFollowers || 0, icon: User },
    { label: 'AI Limit', value: user?.usageLimit || 10, icon: Sparkles },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <SectionHeading title="User Panel" subtitle="Your KavyaKosh account, writing tools, and activity" />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-background">
                {initials}
              </div>
              <div>
                <h2 className="text-2xl font-display text-text">{user?.name}</h2>
                <p className="mt-1 text-sm text-muted">{user?.email}</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="primary">{user?.role || 'user'}</Badge>
                  <Badge variant={user?.premium ? 'success' : 'secondary'}>
                    {user?.premium ? 'Premium' : 'Free Plan'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/settings">
                <SecondaryButton icon={Settings}>Settings</SecondaryButton>
              </Link>
              <Link to="/ai-studio">
                <PrimaryButton icon={Sparkles}>Create</PrimaryButton>
              </Link>
            </div>
          </div>
        </section>

        <aside className="glass-card p-8">
          <h3 className="text-lg font-semibold text-text">Quick Actions</h3>
          <div className="mt-5 space-y-3">
            <Link to="/ai-studio" className="block rounded-2xl bg-surface/70 px-4 py-3 text-sm text-text transition hover:text-primary">
              Generate shayari
            </Link>
            <Link to="/publish" className="block rounded-2xl bg-surface/70 px-4 py-3 text-sm text-text transition hover:text-primary">
              Publish a poem
            </Link>
            <Link to="/explore" className="block rounded-2xl bg-surface/70 px-4 py-3 text-sm text-text transition hover:text-primary">
              Explore community
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6">
            <stat.icon size={24} className="text-primary" />
            <p className="mt-5 text-3xl font-display text-text">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 glass-card p-8">
        <div className="flex items-center gap-3">
          <Activity size={22} className="text-primary" />
          <h3 className="text-xl font-semibold text-text">Recent Activity</h3>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">
          Your saved poems, generated verses, and publishing activity will appear here as you use the platform.
        </p>
      </section>
    </div>
  );
}

export default UserPanel;
