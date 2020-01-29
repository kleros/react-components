import React from "react";
import PropTypes from "prop-types";
import "./evidence-timeline.css";

class EvidenceTimeline extends React.Component {
  truncateAddress = address =>
    `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
      address.length
    )}`;

  render() {
    const { ipfsGateway } = this.props;

    return (
      <div id="evidence-timeline">
        <input
          id="collapsible"
          className="toggle"
          type="checkbox"
          defaultChecked
        />
        <label htmlFor="collapsible" className="lbl-toggle">
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
          Evidence ({this.props.evidences.length})
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            {this.props.evidences.map(evidence => (
              <div className="evidence">
                <div className="header">
                  <h1>
                    {evidence.evidenceJSON.title || evidence.evidenceJSON.name}
                  </h1>
                  <a
                    href={`https://etherscan.io/address/${evidence.submittedBy}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="293.775"
                      height="293.667"
                      viewBox="0 0 293.775 293.667"
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
                </div>
                <p>{evidence.evidenceJSON.description}</p>
                <div className="footer">
                  <div className="temp">
                    <span className="sender">
                      {this.truncateAddress(evidence.submittedBy)}
                    </span>
                    <br />
                    <span className="timestamp">{evidence.submittedAt}</span>
                  </div>
                  <a href={`${ipfsGateway}${evidence.evidenceJSON.fileURI}`}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        class="theme-fill"
                        d="M20.4132 11.5869C24.1474 15.325 24.0962 21.3181 20.4357 24.9988C20.4289 25.0063 20.4207 25.0144 20.4132 25.0219L16.2132 29.2219C12.5089 32.9263 6.48208 32.9258 2.77828 29.2219C-0.926092 25.5182 -0.926092 19.4907 2.77828 15.7869L5.0974 13.4678C5.7124 12.8528 6.77152 13.2616 6.80327 14.1307C6.84377 15.2383 7.04239 16.3511 7.40889 17.4257C7.53302 17.7896 7.44433 18.1921 7.17246 18.464L6.35452 19.2819C4.6029 21.0336 4.54796 23.8857 6.28233 25.6544C8.03383 27.4406 10.9127 27.4512 12.6776 25.6863L16.8776 21.4869C18.6396 19.725 18.6322 16.8771 16.8776 15.1226C16.6463 14.8917 16.4133 14.7123 16.2313 14.587C16.1026 14.4986 15.9962 14.3813 15.9209 14.2445C15.8455 14.1077 15.8031 13.9552 15.7971 13.7991C15.7724 13.1387 16.0064 12.4581 16.5282 11.9363L17.8441 10.6203C18.1892 10.2753 18.7305 10.2329 19.1306 10.5121C19.5888 10.8321 20.018 11.1918 20.4132 11.5869ZM29.2217 2.77809C25.5179 -0.925779 19.4911 -0.926279 15.7867 2.77809L11.5867 6.97808C11.5792 6.98558 11.5711 6.9937 11.5642 7.0012C7.90383 10.6819 7.85252 16.675 11.5867 20.4131C11.9819 20.8082 12.411 21.1679 12.8693 21.4878C13.2694 21.7671 13.8108 21.7246 14.1558 21.3796L15.4716 20.0637C15.9935 19.5418 16.2275 18.8612 16.2027 18.2008C16.1968 18.0447 16.1544 17.8922 16.079 17.7554C16.0036 17.6186 15.8973 17.5014 15.7686 17.4129C15.5866 17.2876 15.3536 17.1082 15.1223 16.8774C13.3677 15.1228 13.3603 12.2749 15.1223 10.513L19.3222 6.31364C21.0872 4.54871 23.966 4.55933 25.7175 6.34552C27.4519 8.11427 27.397 10.9664 25.6454 12.718L24.8274 13.5359C24.5555 13.8078 24.4669 14.2103 24.591 14.5742C24.9575 15.6488 25.1561 16.7616 25.1966 17.8692C25.2284 18.7384 26.2875 19.1471 26.9025 18.5321L29.2216 16.213C32.926 12.5093 32.926 6.48183 29.2217 2.77809Z"
                        fill="#000"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

EvidenceTimeline.propTypes = {
  ipfsGateway: PropTypes.string.isRequired
};

EvidenceTimeline.defaultProps = {
  ipfsGateway: "https://ipfs.kleros.io/ipfs/"
};

export default EvidenceTimeline;
