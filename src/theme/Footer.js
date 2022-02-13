import OriginalFooter from '@theme-original/Footer';
import React from 'react';
import styles from './Footer.module.css';

export default function Footer(props) {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
      <ul className={styles.socialLinks}>
        <li>
          <a
            target="_blank"
            href="https://twitter.com/symbiosiscloud"
            className={styles.socialLink}
            aria-label="Twitter"
            rel="noreferrer"
          >
            <svg
              className={styles.socialLinkSvg}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
            </svg>
          </a>
        </li>
        <li className="ml-4">
          <a
            target="_blank"
            href="https://github.com/symbiosis-cloud"
            className={styles.socialLink}
            aria-label="Github"
            rel="noreferrer"
          >
            <svg
              className={styles.socialLinkSvg}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
            </svg>
          </a>
        </li>
      </ul>

      <div className={styles.footerInfo}>
        <span className={styles.copyrightTitle}>&copy; 2021 Symbiosis. All rights reserved.</span>
        <span className={styles.contactInfo}>
          Contact{" "}
          <span className={styles.contactEmail}>
            info@stim.dev
          </span>
        </span>
      </div>
      </div>
    </footer>
  );
}
