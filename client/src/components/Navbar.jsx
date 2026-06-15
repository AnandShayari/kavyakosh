import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/ai-studio', label: 'AI Studio' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/community', label: 'Community' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const panelPath = user?.role === 'admin' ? '/admin' : '/user';
  const panelLabel = user?.role === 'admin' ? 'Admin Panel' : 'User Panel';

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-end gap-3 text-xl font-semibold tracking-wide text-text">
          <span className="text-primary">Kavya</span>
          <span className="text-muted">Kosh</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <Link to={panelPath} className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-primary hover:text-primary">
                {panelLabel}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-primary hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-primary hover:text-primary">
              Login
            </Link>
          )}
          <Link to="/premium" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background transition hover:bg-yellow-500">
            Get Premium
          </Link>
        </div>

        <button
          className="inline-flex items-center rounded-full border border-border p-3 text-muted transition hover:text-text lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 px-6 py-5">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="text-base font-medium text-muted transition hover:text-text"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 pt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={panelPath}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-border px-4 py-2 text-center text-sm text-text transition hover:border-primary hover:text-primary"
                  >
                    {panelLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-primary hover:text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-4 py-2 text-center text-sm text-text transition hover:border-primary hover:text-primary"
                >
                  Login
                </Link>
              )}
              <Link to="/premium" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-background transition hover:bg-yellow-500">
                Get Premium
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
