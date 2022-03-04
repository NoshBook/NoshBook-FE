import { useState } from 'react';

/**
 * Pairs with UserFeedback component.
 */
export default function useFeedback() {
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  // reset state helper function
  function resetFeedbackState() {
    setIsFeedback(false);
    setFeedbackMessage(null);
    setIsError(false);
  }

  // give feedback function
  function giveUserFeedback(isError: boolean, feedbackMessage?: string) {
    if (feedbackMessage) setFeedbackMessage(feedbackMessage);
    if (isError) setIsError(true);
    setIsFeedback(true);

    setTimeout(() => {
      resetFeedbackState();
    }, 2000);
  }

  return { isFeedback, feedbackMessage, isError, giveUserFeedback };
}
