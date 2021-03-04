import React from "react";

export default function Footer() {
  return (
    <footer>
      <small>
        <a
          href="https://www.linkedin.com/in/steffany-camila/"
          target="_blank"
          rel="noreferrer"
        >
          Steffany Camila
        </a>{" "}
        @ {new Date().getFullYear()}
      </small>
    </footer>
  );
}
