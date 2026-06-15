function SectionHeading({ title, subtitle }) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.3em] text-primary">{title}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">{subtitle}</h2>
    </div>
  );
}

export default SectionHeading;
