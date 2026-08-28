export function Loading({ label = 'Finding destinations…' }) {
  return <div className="status"><span className="spinner" />{label}</div>;
}

export function ErrorMessage({ children }) {
  return <div className="error-message" role="alert">{children}</div>;
}
