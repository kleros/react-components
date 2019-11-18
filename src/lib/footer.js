import { ReactComponent as Ghost } from "./images/ghost.svg";
import { ReactComponent as Github } from "./images/github.svg";
import { ReactComponent as LinkedIn } from "./images/linkedin.svg";
import { ReactComponent as Question } from "./images/question-circle.svg";
import { ReactComponent as Telegram } from "./images/telegram.svg";
import { ReactComponent as Twitter } from "./images/twitter.svg";

import React, { useEffect, useState } from "react";

function Footer({ name }) {
  const minWidth768 = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(minWidth768.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    minWidth768.addListener(handler);
    return () => minWidth768.removeListener(handler);
  });
  return (
    <footer
      style={{
        fontFamily:
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "3rem",
        display: "grid",
        grid: matches
          ? "1fr / [footer-start] 20px [banner] 10fr [title] 10fr [help] 4fr 1fr [social] 5fr 20px [footer-end]"
          : "1fr / [footer-start] 30px [banner] 9fr [help] 6fr 30px [footer-end]",
        background: "#4d00b4",
        color: "white",
        alignItems: "center",
        justifyItems: "center",
        minHeight: "40px"
      }}
    >
      <div style={{ gridColumn: "banner", justifySelf: "start" }}>
        <a
          style={{
            color: "white",
            textDecoration: "none"
          }}
          href="https://kleros.io"
        >
          Find out more about Kleros
        </a>
      </div>
      <div style={{ display: matches ? "" : "none", gridColumn: "title" }}>
        {name}
      </div>
      <div style={{ display: "grid", gridColumn: "help", justifySelf: "end" }}>
        <a
          href="https://t.me/kleros"
          style={{ color: "white", textDecoration: "none" }}
        >
          I need help <Question style={{ verticalAlign: "middle" }} />
        </a>
      </div>
      <div
        style={{
          display: matches ? "" : "none",
          gridColumn: "social",
          justifySelf: "stretch",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <div
          style={{
            display: matches ? "grid" : "none",
            alignItems: "center",
            grid: " 1fr / 1fr"
          }}
        >
          <div
            className="icons"
            style={{
              display: matches ? "grid" : "none",
              grid: "1fr / 1fr 1fr 1fr 1fr 1fr"
            }}
          >
            <a
              href="https://twitter.com/kleros_io?"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="https://github.com/kleros"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="https://blog.kleros.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Ghost style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="https://www.linkedin.com/company/kleros/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedIn style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="https://t.me/kleros"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Telegram style={{ verticalAlign: "middle" }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
