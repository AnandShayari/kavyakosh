import { Link } from 'react-router-dom';
import { BarChart3, ShieldCheck, Sparkles, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { Badge } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
  const { user } = useAuth();
  const metrics = [
    { label: 'User Management', value: 'Ready', icon: Users, body: 'Review users, roles, and account access.' },
    { label: 'Content Moderation', value: 'Ready', icon: ShieldCheck, body: 'Track poems, reports, reviews, and community safety.' },
    { label: 'AI Usage', value: 'Live', icon: Sparkles, body: 'Monitor generation activity and plan limits.' },
    { label: 'Analytics', value: 'Active', icon: BarChart3, body: 'Watch platform trends and marketplace signals.' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <SectionHeading title="Admin Panel" subtitle="Admin-only moderation, users, and platform controls" />

      <section className="mt-10 glass-card p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display text-text">{user?.name || 'Admin'}</h2>
              <Badge variant="primary">Admin</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{user?.email}</p>
          </div>
          <Link to="/user" className="rounded-full border border-border px-5 py-2 text-sm text-text transition hover:border-primary hover:text-primary">
            Open User Panel
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label} className="glass-card p-6">
            <item.icon size={26} className="text-primary" />
            <div className="mt-5 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-text">{item.label}</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {item.value}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold text-text">Admin Tools</h3>
          <div className="mt-5 space-y-3">
            {['Approve reported poems', 'Manage user roles', 'Review marketplace products'].map((tool) => (
              <div key={tool} className="rounded-2xl bg-surface/70 px-4 py-3 text-sm text-muted">
                {tool}
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold text-text">Access Rules</h3>
          <p className="mt-4 text-sm leading-7 text-muted">
            This panel is visible only to accounts with the admin role. Normal users are redirected to their user panel.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
