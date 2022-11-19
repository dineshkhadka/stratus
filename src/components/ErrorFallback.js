import React from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const [resetDialog, setResetDialog] = React.useState(false);
  const clear = () => {
    localStorage.clear();
    reloadApplication();
  };
  const reset = () => {
    setResetDialog(true);
  };
  const reloadApplication = () => {
    window.location.reload(true);
  };
  let link = new URL(`https://github.com/dineshkhadka/stratus/issues/new`);
  link.searchParams.set("body", error.message);
  return (
    <div className="error-alert" role="alert">
      {!resetDialog && (
        <div className="error-alert__inner">
          <div className="error-alert__details">
            <h2>
              <span role="img" aria-label="warning icon">
                ⚠️
              </span>{" "}
              Something went wrong:
            </h2>
            <pre style={{ overflow: "auto" }}>{error.message}</pre>
            <p>
              If the problem persists we suggest resetting the application to
              default. However, doing so will clear everything including the
              tasks and world clocks
            </p>
            Would you like to{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              submit an issue
            </a>
          </div>
          <div className="error-alert__action">
            <button className="btn btn-primary" onClick={reloadApplication}>
              Try again
            </button>
            <button className="btn btn-primary btn-danger" onClick={reset}>
              Reset all Settings
            </button>
          </div>
        </div>
      )}
      {resetDialog && (
        <div className="error-alert__inner">
          <div className="error-alert__details">
            <h2>
              <span role="img" aria-label="warning icon">
                🛑
              </span>{" "}
              Warning! Clearing all saved items:
            </h2>
            <p>
              This is a destructive action that will reset the application to
              default. All <strong>saved items will be deleted</strong> and
              cannot be recovered again.
            </p>
            <p>Are you sure to proceed?</p>
          </div>
          <div className="error-alert__action">
            <button className="btn btn-primary btn-danger" onClick={clear}>
              Yes, clear all saved items
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
