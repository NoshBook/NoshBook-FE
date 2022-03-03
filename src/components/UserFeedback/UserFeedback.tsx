import React from 'react';

export default function UserFeedback(
  isError: boolean,
  feedbackMessage?: string,
) {
  return (
    <article>
      {isError ? (
        // error message
        <p>🔴 {feedbackMessage ? feedbackMessage : 'Error'}</p>
      ) : (
        // success message
        <p>🟢 {feedbackMessage ? feedbackMessage : 'Success'}</p>
      )}
    </article>
  );
}
