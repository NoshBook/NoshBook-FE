import styles from './About.module.css';
import { motion } from 'framer-motion';
import { upfadeinVariants } from '../../utils/variants';
import diyanaPic from './Diyana.jpg';
import dylanPic from './Dylan.png';
import michaelPic from './Michael.jpg';
import zackPic from './Zack.png';
import githubPic from './github.png';
import linkedinPic from './linkedin.png';

export default function About() {
  return (
    <motion.main
      className={styles.flexCol}
      variants={upfadeinVariants}
      initial={'initial'}
      animate={'animate'}
    >
      <h2>About Us</h2>
      <section className={styles.twoByTwo}>
        <div className={`${styles.flexCol} ${styles.card}`}>
          <h3>Diyana Mendoza-Price</h3>
          <img src={diyanaPic} />
          <div className={styles.socials}>
            <a href="https://github.com/diyanamendoza/">
              <img src={githubPic} className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com/in/diyana-mendoza-price/">
              <img src={linkedinPic} className={styles.socialIcon} />
            </a>
          </div>
          Diyana (aka Dee, she/her pronouns) is a full stack developer who
          shifted from nonprofit management to tech back in 2019. One of her
          favorite foods to cook and eat is a dairy-free version of butter
          mochi.
        </div>
        <div className={`${styles.flexCol} ${styles.card}`}>
          <h3>Dylan Floyd</h3>
          <img src={dylanPic} />
          <div className={styles.socials}>
            <a href="https://github.com/Dylan-Floyd/">
              <img src={githubPic} className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com/in/dylan-c-floyd/">
              <img src={linkedinPic} className={styles.socialIcon} />
            </a>
          </div>
          Dylan is an experienced software developer pivoting into web
          development. His favorite food is a toasted bagel with an egg,
          creamcheese, and ham.
        </div>
        <div className={`${styles.flexCol} ${styles.card}`}>
          <h3>Michael Rider</h3>
          <img src={michaelPic} />
          <div className={styles.socials}>
            <a href="https://github.com/MikepdXRider">
              <img src={githubPic} className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com/in/mikepdxrider/">
              <img src={linkedinPic} className={styles.socialIcon} />
            </a>
          </div>
          Michael X Rider is a software developer with eight years of operations
          and project management experience. His favorite foods are fresh
          ceviche and chicken tortilla soup.
        </div>
        <div className={`${styles.flexCol} ${styles.card}`}>
          <h3>Zack Lyon</h3>
          <img src={zackPic} />
          <div className={styles.socials}>
            <a href="https://github.com/ZackLyon">
              <img src={githubPic} className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com/in/zacklyon/">
              <img src={linkedinPic} className={styles.socialIcon} />
            </a>
          </div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tempus
          tellus. Cras lobortis enim quis augue efficitur volutpat. Donec eget
          tortor condimentum, bibendum libero nec, posuere nulla. Vivamus
          interdum laoreet vestibulum.
        </div>
      </section>
    </motion.main>
  );
}
