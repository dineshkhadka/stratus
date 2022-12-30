import React from "react";
import { useTimeout } from "./useTimeout";

export const Toast = (props) => {
  const TIMEOUT_IN_MILLISECONDS = 3000;
  useTimeout(props.close, TIMEOUT_IN_MILLISECONDS);

  return (
    <div className="toast-message">
      <div className="toast-message__content">{props.children}</div>
    </div>
  );
};
