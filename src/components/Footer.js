import React from "react";
import { SiNetlify, SiRedux, SiFirebase, SiReact } from "react-icons/si";
// Styles
import styles from "./styles/footer.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Built with</p>
      <div className={styles.icons}>
        <SiReact title="React" /> <SiRedux title="Redux" />
        <SiFirebase title="Firebase" /> <SiNetlify title="Netlify" />
      </div>
      <p>
        Issues? Comments? Suggestions? email me at{" "}
        <a
          href="mailto:info@tarkovhideout.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          info@tarkov-hideout.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
