import { Col, Icon, Row, Collapse } from "antd";
import React from "react";
import EvidenceCard from "./evidence-card.js";
import PropTypes from "prop-types";

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
          header={
            <>
              <svg
                width="21"
                height="14"
                viewBox="0 0 21 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "0.5rem" }}
              >
                <path
                  d="M18.4377 5.875H16.7647V4.1875C16.7647 3.25586 16.0138 2.5 15.0882 2.5H9.5L7.26471 0.25H1.67647C0.750919 0.25 0 1.00586 0 1.9375V12.0625C0 12.9941 0.750919 13.75 1.67647 13.75H15.6471C16.2233 13.75 16.7612 13.4512 17.0686 12.9555L19.8592 8.45547C20.5577 7.33398 19.7544 5.875 18.4377 5.875ZM1.67647 2.14844C1.67647 2.03242 1.77077 1.9375 1.88603 1.9375H6.56967L8.80496 4.1875H14.8787C14.9939 4.1875 15.0882 4.28242 15.0882 4.39844V5.875H5.30882C4.72206 5.875 4.17721 6.18437 3.87335 6.69062L1.67647 10.3539V2.14844ZM15.6471 12.0625H2.51471L5.21103 7.5625H18.4412L15.6471 12.0625Z"
                  fill="white"
                />
              </svg>
              <span>Evidence</span>
            </>
          }
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
