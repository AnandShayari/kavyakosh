import SectionHeading from '../components/SectionHeading';

const plans = [
  { name: 'Free', price: '₹0', features: ['Basic AI prompts', 'Community access', 'Daily poems'] },
  { name: 'Pro', price: '₹499', features: ['Advanced AI studio', 'Premium collections', 'Saved drafts'] },
  { name: 'Elite', price: '₹999', features: ['Unlimited generation', 'Priority support', 'Early beta access'] },
];

function Premium() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Premium" subtitle="Upgrade your poetic craft" />
      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">{plan.name}</p>
            <h3 className="mt-4 text-4xl font-semibold text-text">{plan.price}</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Premium;
