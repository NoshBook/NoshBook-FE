import React from 'react';

export default function UserFeedback(
  isError: boolean,
  feedbackMessage?: string,
) {
  return (
    <div>
      {isError ? (
        // error message
        <div>🔴 {feedbackMessage ? feedbackMessage : 'Error'}</div>
      ) : (
        // success message
        <div>🟢 {feedbackMessage ? feedbackMessage : 'Success'}</div>
      )}
    </div>
  );
}
