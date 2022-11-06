import React from "react";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-alert" role="alert">
      <div className="error-alert__inner">
        <div className="error-alert__details">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
        </div>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
}
