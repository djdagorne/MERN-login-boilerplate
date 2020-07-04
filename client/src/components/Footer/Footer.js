import React from "react";

export default function Footer() {
  return (
    <footer class="footer">
      <a
        href="mailto:dj.dagorne@gmail.com"
        class="footer__link"
        title="to email Dexter"
      >
        dj.dagorne@gmail.com
      </a>
      <ul class="social-list">
        <li class="social-list__item">
          <a
            href="https://github.com/djdagorne"
            class="social-list__link"
            title="to Dexter's Github"
          >
            <i class="fab fa-github"></i>
          </a>
        </li>
        <li class="social-list__item">
          <a
            href="https://linkedin.com/in/djdagorne"
            class="social-list__link"
            title="to Dexter's LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}
