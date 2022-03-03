export const upfadeinVariants = {
  initial: {
    opacity: 0,
    y: '7vh',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.8 },
  },
};

export const downfadeinVariants = {
  initial: {
    opacity: 0,
    y: '-10vh',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.8 },
  },
};

export const fadeindelayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 1, duration: 0.8 },
  },
};

export const fadeinVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { delay: 1, duration: 0.8 },
  },
};

export const leftslideinVariants = {
  initial: {
    opacity: 0,
    x: '-50vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { delay: 1.5, duration: 0.8 },
  },
};
