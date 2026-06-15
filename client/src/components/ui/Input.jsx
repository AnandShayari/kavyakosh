export function TextInput({
  placeholder = '',
  value = '',
  onChange = () => {},
  disabled = false,
  type = 'text',
  error = '',
  label = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-surface/50 px-4 py-3 text-sm text-text outline-none transition ${
          error ? 'border-error' : 'border-border focus:border-primary'
        } placeholder:text-muted disabled:opacity-50`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export function TextArea({
  placeholder = '',
  value = '',
  onChange = () => {},
  disabled = false,
  error = '',
  label = '',
  rows = 4,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-2xl border bg-surface/50 px-4 py-3 text-sm text-text outline-none transition resize-none ${
          error ? 'border-error' : 'border-border focus:border-primary'
        } placeholder:text-muted disabled:opacity-50`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export function SelectInput({
  label = '',
  options = [],
  value = '',
  onChange = () => {},
  error = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border bg-surface/50 px-4 py-3 text-sm text-text outline-none transition ${
          error ? 'border-error' : 'border-border focus:border-primary'
        }`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
