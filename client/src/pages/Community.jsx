import SectionHeading from '../components/SectionHeading';

const threads = [
  { title: 'Late night verse exchange', author: 'Karim', replies: 18 },
  { title: 'Ghazal prompts for monsoon', author: 'Sahana', replies: 12 },
  { title: 'Poetry beats: rhythm workshop', author: 'Danish', replies: 9 },
];

function Community() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Community" subtitle="Gather, share, and inspire together" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Events</p>
          <div className="mt-6 space-y-5">
            {['Open mic series', 'Weekly prompt ritual', 'Verse critique circle'].map((item) => (
              <div key={item} className="rounded-3xl border border-border bg-background/90 p-5">
                <h3 className="text-lg font-semibold text-text">{item}</h3>
                <p className="mt-2 text-sm text-muted">A live shared session to tune your language with the community.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6 rounded-[2rem] border border-border bg-background/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Discussion Threads</p>
          <div className="space-y-4">
            {threads.map((thread) => (
              <div key={thread.title} className="rounded-3xl border border-border bg-surface/80 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">{thread.title}</h3>
                  <span className="text-sm text-primary">{thread.replies} replies</span>
                </div>
                <p className="mt-3 text-sm text-muted">Started by {thread.author} in the Poetry Circle community.</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500">
            Create New Thread
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
