import React from "react";
import PropTypes from "prop-types";
import { Collapse, Timeline, Card } from "antd";
import "antd/dist/antd.css";
import { ReactComponent as Folder } from "./assets/images/folder.svg";
const { Panel } = Collapse;

class EvidenceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      biggerThan768px: window.matchMedia("(min-width: 768px)").matches
    };
  }

  componentDidMount() {
    window
      .matchMedia("(min-width: 768px)")
      .addListener(e => this.setState({ biggerThan768px: e.matches }));
  }
  render() {
    return (
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
        <Panel header={Folder} className="primary" key="1">
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
