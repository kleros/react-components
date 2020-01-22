import React from "react";
import PropTypes from "prop-types";
import { Collapse, Timeline, Card } from "antd";
import "antd/dist/antd.css";
import { ReactComponent as Folder } from "./assets/images/folder.svg";
const { Panel } = Collapse;

export const content = {
  en: { "find-out": "Find out more about Kleros", help: "I need help" },
  tr: {
    "find-out": "Kleros hakkında detaylı bilgi için",
    help: "Yardıma ihtiyacım var"
  },
  fr: { "find-out": "En Savoir plus sur Kleros", help: "J’ai besoin d’aide" },
  pt: { "find-out": "Saiba mais sobre o Kleros", help: "Preciso de ajuda" },
  es: { "find-out": "Aprende más sobre Kleros", help: "Necesito ayuda" },
  ru: { "find-out": "Узнайте больше о Kleros", help: "Мне нужна помощь" },
  "pt-BR": {
    "find-out": "Aprenda mais sobre Kleros",
    help: "Preciso de ajuda"
  }
};

const DEFAULT_LOCALE = "en";

class EvidenceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      biggerThan768px: window.matchMedia("(min-width: 768px)").matches
    };
  }

  getContent = (locale, key) =>
    Object.keys(content).includes(locale)
      ? content[locale][key]
      : content[DEFAULT_LOCALE][key];

  componentDidMount() {
    window
      .matchMedia("(min-width: 768px)")
      .addListener(e => this.setState({ biggerThan768px: e.matches }));
  }
  render() {
    const anchorStyle = {
      color: "white",
      textDecoration: "none"
    };

    const text = `it can be found as a welcome guest in many households across the world.`;

    function callback(key) {
      console.log(key);
    }

    const { biggerThan768px } = this.state || false;
    const { appName } = this.props;

    return (
      <Collapse
        defaultActiveKey={["1"]}
        onChange={callback}
        expandIconPosition="right"
      >
        <Panel header={<Folder />} className="primary" key="1">
          <Timeline>
            <Timeline.Item>Jurors ruled: Yes, Add It</Timeline.Item>
            <Timeline.Item>step2 2015-09-01</Timeline.Item>
            <Timeline.Item>
              <Card>asdasd</Card>
            </Timeline.Item>
            <Timeline.Item>Dispute Created</Timeline.Item>
          </Timeline>
        </Panel>
      </Collapse>
    );
  }
}

EvidenceDisplay.defaultProps = {};

EvidenceDisplay.propTypes = {};

export default EvidenceDisplay;
