import { Card, Col, Row } from "antd";
import React from "react";
import PropTypes from "prop-types";

import "antd/dist/antd.css";
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="293.775"
              height="293.667"
              viewBox="0 0 293.775 293.667"
              style={{ width: "2rem", height: "auto" }}
            >
              <g
                id="etherscan-logo-circle"
                transform="translate(-219.378 -213.334)"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.467-12.47h20.779a12.47,12.47,0,0,1,12.467,12.47v90.276s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.465-12.467h20.779A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
                  transform="translate(0 0)"
                  fill="#0c598b"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.405-232.79,128.793"
                  transform="translate(35.564 80.269)"
                  fill="#979695"
                />
              </g>
            </svg>
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
              <Col lg={1}></Col>
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
