import { Card, Col, Row } from "antd";
import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as EtherscanSVG } from "./assets/images/logos/etherscan-logo-circle.svg";
import Attachment from "./attachment.js";
import "./evidence-card.css";

const truncateAddress = address =>
  `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

export const displayDateUTC = dateString => {
  const _date = new Date(dateString);

  const date = String(_date.getUTCDate()).replace(/\b(\d{1})\b/g, "0$1");
  const month = _date.getUTCMonth();
  const year = _date.getUTCFullYear();
  const hours = String(_date.getUTCHours()).replace(/\b(\d{1})\b/g, "0$1");
  const minutes = String(_date.getUTCMinutes()).replace(/\b(\d{1})\b/g, "0$1");

  return `${date} ${months[month]} ${year} ${hours}:${minutes} UTC`;
};

class EvidenceCard extends React.Component {
  render() {
    const { evidence, metaEvidence } = this.props;

    if (!evidence) return null;
    const submittedAtDate = new Date(evidence.submittedAt * 1000);

    return (
      <Card
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0px 6px 36px #bc9cff"
        }}
        extra={
          <a href={`https://etherscan.com/address/${evidence.submittedBy}`}>
            <EtherscanSVG style={{ width: "2rem", height: "auto" }} />
          </a>
        }
        title={
          <div style={{ color: "#4d00b4" }}>
            {evidence.evidenceJSON.title || evidence.evidenceJSON.name}
          </div>
        }
      >
        <div style={{ color: "black", padding: "1.5rem" }}>
          {evidence.evidenceJSON.description}
        </div>
        <div
          style={{
            background: "#f5f1fd",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px"
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px"
            }}
          >
            <Row>
              <Col lg={23}>
                <div style={{ color: "#4d00b4", fontWeight: "500" }}>
                  Submitted By:{" "}
                  {metaEvidence.aliases &&
                  metaEvidence.aliases[evidence.submittedBy]
                    ? metaEvidence.aliases[evidence.submittedBy]
                    : truncateAddress(evidence.submittedBy)}
                  <div style={{ fontWeight: "400" }}>
                    {displayDateUTC(submittedAtDate)}
                  </div>
                </div>
              </Col>
              <Col lg={1}>
                <Attachment
                  URI={evidence.evidenceJSON.fileURI}
                  extension={evidence.evidenceJSON.fileTypeExtension}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    );
  }
}

EvidenceCard.propTypes = {
  evidence: PropTypes.object
};

EvidenceCard.defaultProps = {};

export default EvidenceCard;
