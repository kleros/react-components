import { Col, Icon, Row, Collapse } from "antd";
import React from "react";
import EvidenceCard from "./evidence-card.js";
import PropTypes from "prop-types";
import { ReactComponent as FolderSVG } from "./assets/images/folder.svg";

import "./evidence-timeline.css";

const { Panel } = Collapse;

class EvidenceTimeline extends React.Component {
  // Sort so most recent is first
  sortedEvidence = this.props.evidence.sort((a, b) => {
    if (a.submittedAt > b.submittedAt) return -1;
    else if (a.submittedAt < b.submittedAt) return 1;

    return 0;
  });

  render() {
    if (this.sortedEvidence.length === 0) return null;

    const { evidence, ruling, metaEvidence } = this.props;
    return (
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
        <Panel
          header={<FolderSVG />}
          style={{ background: "#4d00b4" }}
          className="primary"
          key="1"
        >
          <div style={{ padding: "35px 10%" }}>
            <Row id="scroll-top">
              <Col
                style={{
                  color: "#4d00b4",
                  fontSize: "18px",
                  lineHeight: "21px"
                }}
                lg={4}
              >
                Latest
              </Col>
              <Col lg={16}>
                {ruling && (
                  <div
                    style={{
                      background: "#4d00b4",
                      borderRadius: "300px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "14px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: "8px 0",
                      textAlign: "center",
                      width: "225px"
                    }}
                  >
                    {ruling
                      ? `Jurors ruled: ${
                          metaEvidence.metaEvidenceJSON.rulingOptions
                            ? metaEvidence.metaEvidenceJSON.rulingOptions
                                .titles[Number(ruling) - 1]
                            : ruling
                        }`
                      : "Jurors refused to make a ruling"}
                  </div>
                )}
              </Col>
              <div
                style={{
                  color: "#009aff",
                  cursor: "pointer",
                  textAlign: "right"
                }}
                lg={4}
                onClick={() => {
                  const _bottomRow = document.getElementById("scroll-bottom");
                  _bottomRow.scrollIntoView();
                }}
              >
                Scroll to Bottom <Icon type="arrow-down" />
              </div>
            </Row>
            {this.sortedEvidence.map((_evidence, i) => (
              <div key={`evidence-${i}`}>
                <Row>
                  <Col
                    style={{ borderRight: "1px solid #4d00b4", height: "3rem" }}
                    lg={12}
                  />
                </Row>
                <EvidenceCard
                  evidence={_evidence}
                  metaEvidence={metaEvidence.metaEvidenceJSON}
                />
              </div>
            ))}
            <Row>
              <Col
                style={{ borderRight: "1px solid #4d00b4", height: "3rem" }}
                lg={12}
              />
            </Row>
            <Row id="scroll-bottom">
              <Col
                style={{
                  color: "#4d00b4",
                  fontSize: "18px",
                  lineHeight: "21px"
                }}
                lg={4}
              >
                Start
              </Col>
              <Col lg={16}>
                <div
                  style={{
                    background: "#4d00b4",
                    borderRadius: "300px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "14px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: "8px 0",
                    textAlign: "center",
                    width: "135px"
                  }}
                >
                  Dispute Created
                </div>
              </Col>
              <Col
                style={{
                  color: "#009aff",
                  cursor: "pointer",
                  textAlign: "right"
                }}
                lg={4}
                onClick={() => {
                  const _bottomRow = document.getElementById("scroll-top");
                  _bottomRow.scrollIntoView();
                }}
              >
                Scroll to Top <Icon type="arrow-up" />
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    );
  }
}

EvidenceTimeline.propTypes = {
  evidence: PropTypes.array,
  ruling: PropTypes.object,
  metaEvidence: PropTypes.object
};

EvidenceTimeline.defaultProps = {
  evidence: [],
  ruling: null,
  metaEvidence: []
};

export default EvidenceTimeline;
