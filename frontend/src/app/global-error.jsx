'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h2>Application Error</h2>
          <p>{error?.message ?? 'Unexpected error'}</p>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
