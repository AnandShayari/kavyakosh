import SectionHeading from '../components/SectionHeading';

const products = [
  { title: 'Golden Verses', price: '₹299', subtitle: 'Collector edition poetry book' },
  { title: 'Moonlight Anthology', price: '₹199', subtitle: 'Curated lyrical stories' },
  { title: 'Verse Studio Pass', price: '₹499', subtitle: 'Premium AI writing sessions' },
];

function Marketplace() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading title="Marketplace" subtitle="Premium poetry experiences" />
      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.title} className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Collection</p>
            <h3 className="mt-4 text-2xl font-semibold text-text">{product.title}</h3>
            <p className="mt-3 text-sm text-muted">{product.subtitle}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xl font-semibold text-text">{product.price}</span>
              <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background transition hover:bg-yellow-500">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
