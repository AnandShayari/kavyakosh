import SectionHeading from '../components/SectionHeading';

function Settings() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Settings" subtitle="Fine tune your KavyaKosh experience" />
      <div className="mt-10 space-y-8 rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {['Account', 'Notifications', 'Privacy', 'Premium'].map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-background/90 p-6">
              <h3 className="text-lg font-semibold text-text">{item}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Customize {item.toLowerCase()} and security settings for your writing workflow.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
