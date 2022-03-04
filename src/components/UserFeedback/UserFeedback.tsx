import React from 'react';
import { motion } from 'framer-motion';
import styles from './UserFeedback.module.css';

// Feel free to change however you see fit
const rightslideinVariants = {
  initial: {
    x: '125vw',
  },
  animate: {
    x: ['125vw', '0vw', '0vw', '125vw'],
    transition: { duration: 2, times: [0, 0.15, 0.85, 1] },
  },
};

interface UserFeedbackProps {
  isError: boolean;
  feedbackMessage: string | null;
}

/**
 * Pairs with the useFeedback hook.
 */
export default function UserFeedback({
  isError,
  feedbackMessage,
}: UserFeedbackProps) {
  return (
    <motion.article
      key={'userFeedback'}
      animate={'animate'}
      initial={'initial'}
      variants={rightslideinVariants}
      className={styles.feedbackcontainer}
    >
      {isError ? (
        // error message
        <p style={{ color: 'rgb(255, 76, 41)' }}>
          🔴 {feedbackMessage ? feedbackMessage : 'Error.'}
        </p>
      ) : (
        // success message
        <p style={{ color: 'rgb(93, 168, 233)' }}>
          🟢 {feedbackMessage ? feedbackMessage : 'Success!'}
        </p>
      )}
    </motion.article>
  );
}
