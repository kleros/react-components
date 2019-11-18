import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { ReactComponent as Ghost } from "./images/ghost.svg";
import { ReactComponent as Github } from "./images/github.svg";
import { ReactComponent as LinkedIn } from "./images/linkedin.svg";
import { ReactComponent as Question } from "./images/question-circle.svg";
import { ReactComponent as Telegram } from "./images/telegram.svg";
import { ReactComponent as Twitter } from "./images/twitter.svg";
import React, { useEffect, useState } from "react";

var Footer = function Footer(_ref) {
  var name = _ref.name;
  var minWidth768 = window.matchMedia("(min-width: 768px)");

  var _useState = useState(minWidth768.matches),
      _useState2 = _slicedToArray(_useState, 2),
      matches = _useState2[0],
      setMatches = _useState2[1];

  useEffect(function () {
    var handler = function handler(e) {
      return setMatches(e.matches);
    };

    minWidth768.addListener(handler);
    return function () {
      return minWidth768.removeListener(handler);
    };
  });
  return React.createElement("footer", {
    style: {
      fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "3rem",
      display: "grid",
      grid: matches ? "1fr / [footer-start] 20px [banner] 10fr [title] 10fr [help] 4fr 1fr [social] 5fr 20px [footer-end]" : "1fr / [footer-start] 30px [banner] 9fr [help] 6fr 30px [footer-end]",
      background: "#4d00b4",
      color: "white",
      alignItems: "center",
      justifyItems: "center",
      minHeight: "40px"
    }
  }, React.createElement("div", {
    style: {
      gridColumn: "banner",
      justifySelf: "start"
    }
  }, React.createElement("a", {
    style: {
      color: "white",
      textDecoration: "none"
    },
    href: "https://kleros.io"
  }, "Find out more about Kleros")), React.createElement("div", {
    style: {
      display: matches ? "" : "none",
      gridColumn: "title"
    }
  }, name), React.createElement("div", {
    style: {
      display: "grid",
      gridColumn: "help",
      justifySelf: "end"
    }
  }, React.createElement("a", {
    href: "https://t.me/kleros",
    style: {
      color: "white",
      textDecoration: "none"
    }
  }, "I need help ", React.createElement(Question, {
    style: {
      verticalAlign: "middle"
    }
  }))), React.createElement("div", {
    style: {
      display: matches ? "" : "none",
      gridColumn: "social",
      justifySelf: "stretch",
      alignItems: "center",
      textAlign: "center"
    }
  }, React.createElement("div", {
    style: {
      display: matches ? "grid" : "none",
      alignItems: "center",
      grid: " 1fr / 1fr"
    }
  }, React.createElement("div", {
    className: "icons",
    style: {
      display: matches ? "grid" : "none",
      grid: "1fr / 1fr 1fr 1fr 1fr 1fr"
    }
  }, React.createElement("a", {
    href: "https://twitter.com/kleros_io?",
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement(Twitter, {
    style: {
      verticalAlign: "middle"
    }
  })), React.createElement("a", {
    href: "https://github.com/kleros",
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement(Github, {
    style: {
      verticalAlign: "middle"
    }
  })), React.createElement("a", {
    href: "https://blog.kleros.io/",
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement(Ghost, {
    style: {
      verticalAlign: "middle"
    }
  })), React.createElement("a", {
    href: "https://www.linkedin.com/company/kleros/",
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement(LinkedIn, {
    style: {
      verticalAlign: "middle"
    }
  })), React.createElement("a", {
    href: "https://t.me/kleros",
    rel: "noopener noreferrer",
    target: "_blank"
  }, React.createElement(Telegram, {
    style: {
      verticalAlign: "middle"
    }
  }))))));
};

export { Footer };