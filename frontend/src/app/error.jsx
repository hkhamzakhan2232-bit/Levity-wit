'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong</h2>
      <p>{error?.message ?? 'Unexpected error'}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
