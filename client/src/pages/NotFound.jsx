import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-center">
      <div className="max-w-xl space-y-8 rounded-[2rem] border border-border bg-surface/90 p-10 shadow-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">404</p>
        <h1 className="text-5xl font-semibold text-text">Page not found</h1>
        <p className="text-sm leading-7 text-muted">The verse you are seeking has not yet been written. Return to the homepage and continue your journey.</p>
        <Link to="/" className="inline-flex rounded-full bg-primary px-6 py-4 text-sm font-semibold text-background transition hover:bg-yellow-500">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
