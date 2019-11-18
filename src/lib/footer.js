import Ghost from "./images/ghost.svg";
import Github from "./images/github.svg";
import LinkedIn from "./images/linkedin.svg";
import Question from "./images/question-circle.svg";
import Telegram from "./images/telegram.svg";
import Twitter from "./images/twitter.svg";

import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
  }

  setMatches = matches => {
    this.setState({ matches });
  };

  componentDidMount() {
    const handler = e => this.setMatches(e.matches);
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }
  render() {
    const { matches } = this.state;
    const { name } = this.props;
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
        <div
          style={{ display: "grid", gridColumn: "help", justifySelf: "end" }}
        >
          <a
            href="https://t.me/kleros"
            style={{ color: "white", textDecoration: "none" }}
          >
            I need help{" "}
            <img src={Question} style={{ verticalAlign: "middle" }} />
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
                <img src={Twitter} />
              </a>
              <a
                href="https://github.com/kleros"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={Github} />
              </a>
              <a
                href="https://blog.kleros.io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={Ghost} />
              </a>
              <a
                href="https://www.linkedin.com/company/kleros/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={LinkedIn} />
              </a>
              <a
                href="https://t.me/kleros"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={Telegram} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
