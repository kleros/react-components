import React from "react";
import PropTypes from "prop-types";
import styles from "./evidence-timeline.module.css";
import isImage from "is-image";
import isTextPath from "is-text-path";
import isVideo from "is-video";
import clsx from "clsx";
import Dropzone from "react-dropzone";

class EvidenceTimeline extends React.Component {
  constructor(props) {
    super(props);

    var root = document.documentElement;

    this.state = {
      modalExtraClass: "closed",
      evidenceDescription: "",
      evidenceTitle: "",
      fileInput: "",
      awaitingConfirmation: false,
      support: 0
    };
  }
  truncateAddress = address =>
    `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
      address.length
    )}`;

  handleModalOpenClose = e => {
    const id = e.target.id;
    this.setState({ modalExtraClass: id == "evidence-button" ? "" : "closed" });
  };

  handleControlChange = async event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log([name, value]);
    await this.setState({ [name]: value });
  };

  handleSubmitEvidenceButtonClick = async event => {
    const {
      evidenceDescription,
      evidenceDocument,
      evidenceTitle,
      support
    } = this.state;
    await this.setState({
      awaitingConfirmation: true
    });

    try {
      await this.props.submitEvidenceCallback({
        evidenceDescription,
        evidenceDocument,
        evidenceTitle,
        supportingSide: support
      });

      await this.setState({
        awaitingConfirmation: false,
        evidenceTitle: "",
        evidenceDescription: "",
        fileInput: "",
        support: 0
      });
    } catch (err) {
      console.log("err");
      await this.setState({
        awaitingConfirmation: false,
        modalExtraClass: "closed"
      });
    }
  };

  handleDrop = async acceptedFiles => {
    console.log(acceptedFiles);
    this.setState({ fileInput: acceptedFiles[0] });

    var reader = new FileReader();
    reader.readAsArrayBuffer(acceptedFiles[0]);
    reader.addEventListener("loadend", async () => {
      const buffer = Buffer.from(reader.result);

      const result = await this.props.publishCallback(
        acceptedFiles[0].name,
        buffer
      );

      console.log(result);
      if (result)
        await this.setState({
          evidenceDocument: `/ipfs/${result[1].hash}${result[0].path}`
        });
    });
  };

  getSupportingSideIcon = supportingSide => {
    if (supportingSide == 1)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#66E800" />
          <path
            d="M14.0625 15.75H10.9375C10.4197 15.75 10 16.1697 10 16.6875V26.0625C10 26.5803 10.4197 27 10.9375 27H14.0625C14.5803 27 15 26.5803 15 26.0625V16.6875C15 16.1697 14.5803 15.75 14.0625 15.75ZM12.5 25.4375C11.9822 25.4375 11.5625 25.0178 11.5625 24.5C11.5625 23.9822 11.9822 23.5625 12.5 23.5625C13.0178 23.5625 13.4375 23.9822 13.4375 24.5C13.4375 25.0178 13.0178 25.4375 12.5 25.4375ZM25 10.1817C25 11.8386 23.9855 12.768 23.7001 13.875H27.6737C28.9782 13.875 29.9939 14.9588 30 16.1445C30.0032 16.8452 29.7052 17.5995 29.2406 18.0662L29.2363 18.0705C29.6205 18.9821 29.5581 20.2595 28.8727 21.1748C29.2118 22.1863 28.87 23.4288 28.2328 24.095C28.4007 24.7824 28.3205 25.3674 27.9927 25.8384C27.1954 26.9839 25.2194 27 23.5484 27L23.4373 27C21.5511 26.9993 20.0073 26.3125 18.767 25.7607C18.1436 25.4834 17.3286 25.1401 16.7103 25.1287C16.4548 25.1241 16.25 24.9156 16.25 24.6601V16.3097C16.25 16.1847 16.3001 16.0647 16.389 15.9768C17.9364 14.4478 18.6018 12.8289 19.8701 11.5584C20.4484 10.9791 20.6587 10.1039 20.862 9.25758C21.0357 8.53488 21.3991 7 22.1875 7C23.125 7 25 7.3125 25 10.1817Z"
            fill="white"
          />
        </svg>
      );
    else if (supportingSide == 2)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#F60C36" />
          <path
            d="M10 13.1875V22.5625C10 23.0803 10.4197 23.5 10.9375 23.5H14.0625C14.5803 23.5 15 23.0803 15 22.5625V13.1875C15 12.6697 14.5803 12.25 14.0625 12.25H10.9375C10.4197 12.25 10 12.6697 10 13.1875ZM11.5625 21C11.5625 20.4822 11.9822 20.0625 12.5 20.0625C13.0178 20.0625 13.4375 20.4822 13.4375 21C13.4375 21.5178 13.0178 21.9375 12.5 21.9375C11.9822 21.9375 11.5625 21.5178 11.5625 21ZM22.1875 31C21.3991 31 21.0357 29.4651 20.8621 28.7424C20.6587 27.8961 20.4484 27.0209 19.8702 26.4415C18.6018 25.1711 17.9364 23.5522 16.389 22.0231C16.345 21.9796 16.31 21.9278 16.2862 21.8706C16.2623 21.8135 16.25 21.7522 16.25 21.6903V13.3399C16.25 13.0844 16.4548 12.8759 16.7103 12.8712C17.3287 12.8599 18.1437 12.5166 18.767 12.2393C20.0074 11.6874 21.5511 11.0007 23.4373 11H23.5484C25.2194 11 27.1954 11.0161 27.9927 12.1616C28.3205 12.6326 28.4007 13.2176 28.2329 13.905C28.87 14.5712 29.2119 15.8138 28.8728 16.8252C29.5581 17.7405 29.6205 19.0179 29.2364 19.9295L29.2407 19.9338C29.7052 20.4005 30.0033 21.1548 30 21.8555C29.9939 23.0412 28.9782 24.125 27.6737 24.125H23.7001C23.9855 25.232 25 26.1614 25 27.8183C25 30.6875 23.125 31 22.1875 31Z"
            fill="white"
          />
        </svg>
      );
    else
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#CCCCCC" />
          <path
            d="M25.8662 16.1429C25.8662 12.1964 21.644 9 16.4331 9C11.2222 9 7 12.1964 7 16.1429C7 17.6741 7.63946 19.0848 8.72336 20.25C8.11565 21.5982 7.11338 22.6696 7.09977 22.683C7 22.7857 6.97279 22.9375 7.03175 23.0714C7.0907 23.2054 7.21769 23.2857 7.36281 23.2857C9.02268 23.2857 10.3968 22.7366 11.3855 22.1696C12.8458 22.8705 14.5737 23.2857 16.4331 23.2857C21.644 23.2857 25.8662 20.0893 25.8662 16.1429ZM31.3991 25.9643C32.483 24.8036 33.1224 23.3884 33.1224 21.8571C33.1224 18.8705 30.6961 16.3125 27.2585 15.2455C27.2993 15.5402 27.3175 15.8393 27.3175 16.1429C27.3175 20.8705 22.4331 24.7143 16.4331 24.7143C15.9433 24.7143 15.4671 24.6786 14.9955 24.6295C16.424 27.1964 19.78 29 23.6893 29C25.5488 29 27.2766 28.5893 28.737 27.8839C29.7256 28.4509 31.0998 29 32.7596 29C32.9048 29 33.0363 28.9152 33.0907 28.7857C33.1497 28.6563 33.1224 28.5045 33.0227 28.3973C33.0091 28.3839 32.0068 27.317 31.3991 25.9643Z"
            fill="white"
          />
        </svg>
      );
  };

  getAttachmentIcon = uri => {
    if (isImage(uri)) {
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 29 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles["theme-fill"]}
            d="M27.9359 7.45703L21.5996 1.06621C20.9199 0.380664 19.9985 -0.0078125 19.0393 -0.0078125H3.6251C1.62374 -0.000195312 0 1.6375 0 3.65605V35.3436C0 37.3621 1.62374 38.9998 3.6251 38.9998H25.3757C27.3771 38.9998 29.0008 37.3621 29.0008 35.3436V10.0469C29.0008 9.07949 28.6157 8.14258 27.9359 7.45703ZM25.0812 9.74981H19.3339V3.95313L25.0812 9.74981ZM3.6251 35.3436V3.65605H15.7088V11.5779C15.7088 12.591 16.5169 13.4061 17.5213 13.4061H25.3757V35.3436H3.6251ZM6.04184 31.6873H22.959V21.9373L21.1842 20.1473C20.8292 19.7893 20.2553 19.7893 19.9003 20.1473L13.292 26.8123L10.3089 23.8035C9.95393 23.4455 9.37995 23.4455 9.025 23.8035L6.04184 26.8123V31.6873ZM9.66694 13.4061C7.66558 13.4061 6.04184 15.0438 6.04184 17.0623C6.04184 19.0809 7.66558 20.7186 9.66694 20.7186C11.6683 20.7186 13.292 19.0809 13.292 17.0623C13.292 15.0438 11.6683 13.4061 9.66694 13.4061Z"
            fill="#000"
          />
        </svg>
      );
    } else if (isVideo(uri)) {
      return (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles["theme-fill"]}
            d="M20.9007 0.998047H2.9716C1.33038 0.998047 0 2.33471 0 3.98368V21.9974C0 23.6464 1.33038 24.983 2.9716 24.983H20.9007C22.5419 24.983 23.8723 23.6464 23.8723 21.9974V3.98368C23.8723 2.33471 22.5419 0.998047 20.9007 0.998047ZM32.6751 3.35282L25.8616 8.07487V17.9062L32.6751 22.622C33.9931 23.534 35.8084 22.6033 35.8084 21.0105V4.96432C35.8084 3.37781 33.9993 2.44089 32.6751 3.35282Z"
            fill="#000"
          />
        </svg>
      );
    } else if (isTextPath(uri)) {
      return (
        <svg
          width="30"
          height="39"
          viewBox="0 0 30 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles["theme-fill"]}
            d="M22.1856 18.8906V21.0234C22.1856 21.5262 21.7696 21.9375 21.2612 21.9375H8.31961C7.81119 21.9375 7.39521 21.5262 7.39521 21.0234V18.8906C7.39521 18.3879 7.81119 17.9766 8.31961 17.9766H21.2612C21.7696 17.9766 22.1856 18.3879 22.1856 18.8906ZM21.2612 24.375H8.31961C7.81119 24.375 7.39521 24.7863 7.39521 25.2891V27.4219C7.39521 27.9246 7.81119 28.3359 8.31961 28.3359H21.2612C21.7696 28.3359 22.1856 27.9246 22.1856 27.4219V25.2891C22.1856 24.7863 21.7696 24.375 21.2612 24.375ZM29.5808 10.0471V35.3438C29.5808 37.3623 27.9246 39 25.8832 39H3.69761C1.65622 39 0 37.3623 0 35.3438V3.65625C0 1.6377 1.65622 0 3.69761 0H19.4201C20.3985 0 21.3383 0.388477 22.0316 1.07402L28.4947 7.46484C29.188 8.14277 29.5808 9.07969 29.5808 10.0471ZM19.7206 3.95332V9.75H25.5828L19.7206 3.95332ZM25.8832 35.3438V13.4062H17.8718C16.8472 13.4062 16.023 12.5912 16.023 11.5781V3.65625H3.69761V35.3438H25.8832Z"
            fill="#000"
          />
        </svg>
      );
    } else if (uri)
      return (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles["theme-fill"]}
            d="M20.4132 11.5869C24.1474 15.325 24.0962 21.3181 20.4357 24.9988C20.4289 25.0063 20.4207 25.0144 20.4132 25.0219L16.2132 29.2219C12.5089 32.9263 6.48208 32.9258 2.77828 29.2219C-0.926092 25.5182 -0.926092 19.4907 2.77828 15.7869L5.0974 13.4678C5.7124 12.8528 6.77152 13.2616 6.80327 14.1307C6.84377 15.2383 7.04239 16.3511 7.40889 17.4257C7.53302 17.7896 7.44433 18.1921 7.17246 18.464L6.35452 19.2819C4.6029 21.0336 4.54796 23.8857 6.28233 25.6544C8.03383 27.4406 10.9127 27.4512 12.6776 25.6863L16.8776 21.4869C18.6396 19.725 18.6322 16.8771 16.8776 15.1226C16.6463 14.8917 16.4133 14.7123 16.2313 14.587C16.1026 14.4986 15.9962 14.3813 15.9209 14.2445C15.8455 14.1077 15.8031 13.9552 15.7971 13.7991C15.7724 13.1387 16.0064 12.4581 16.5282 11.9363L17.8441 10.6203C18.1892 10.2753 18.7305 10.2329 19.1306 10.5121C19.5888 10.8321 20.018 11.1918 20.4132 11.5869ZM29.2217 2.77809C25.5179 -0.925779 19.4911 -0.926279 15.7867 2.77809L11.5867 6.97808C11.5792 6.98558 11.5711 6.9937 11.5642 7.0012C7.90383 10.6819 7.85252 16.675 11.5867 20.4131C11.9819 20.8082 12.411 21.1679 12.8693 21.4878C13.2694 21.7671 13.8108 21.7246 14.1558 21.3796L15.4716 20.0637C15.9935 19.5418 16.2275 18.8612 16.2027 18.2008C16.1968 18.0447 16.1544 17.8922 16.079 17.7554C16.0036 17.6186 15.8973 17.5014 15.7686 17.4129C15.5866 17.2876 15.3536 17.1082 15.1223 16.8774C13.3677 15.1228 13.3603 12.2749 15.1223 10.513L19.3222 6.31364C21.0872 4.54871 23.966 4.55933 25.7175 6.34552C27.4519 8.11427 27.397 10.9664 25.6454 12.718L24.8274 13.5359C24.5555 13.8078 24.4669 14.2103 24.591 14.5742C24.9575 15.6488 25.1561 16.7616 25.1966 17.8692C25.2284 18.7384 26.2875 19.1471 26.9025 18.5321L29.2216 16.213C32.926 12.5093 32.926 6.48183 29.2217 2.77809Z"
            fill="#000"
          />
        </svg>
      );
    else return null;
  };

  getRulingTitle = (rulingCode, rulingOptions) => {
    if (rulingCode) return rulingOptions.titles[rulingCode - 1];
    else return "Refused to Rule";
  };

  render() {
    const {
      ipfsGateway,
      metaevidence,
      evidences,
      currentRuling,
      ruling,
      dispute
    } = this.props;

    const {
      evidenceDescription,
      evidenceTitle,
      fileInput,
      awaitingConfirmation
    } = this.state;
    console.log(this.props);
    console.log(this.state);
    return (
      <div id="evidence-timeline" className={styles.evidenceTimeline}>
        <input
          id="collapsible"
          className={styles.toggle}
          type="checkbox"
          defaultChecked
        />
        <label htmlFor="collapsible" className={styles["lbl-toggle"]}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "0.5rem" }}
          >
            <path
              d="M18.4377 5.875H16.7647V4.1875C16.7647 3.25586 16.0138 2.5 15.0882 2.5H9.5L7.26471 0.25H1.67647C0.750919 0.25 0 1.00586 0 1.9375V12.0625C0 12.9941 0.750919 13.75 1.67647 13.75H15.6471C16.2233 13.75 16.7612 13.4512 17.0686 12.9555L19.8592 8.45547C20.5577 7.33398 19.7544 5.875 18.4377 5.875ZM1.67647 2.14844C1.67647 2.03242 1.77077 1.9375 1.88603 1.9375H6.56967L8.80496 4.1875H14.8787C14.9939 4.1875 15.0882 4.28242 15.0882 4.39844V5.875H5.30882C4.72206 5.875 4.17721 6.18437 3.87335 6.69062L1.67647 10.3539V2.14844ZM15.6471 12.0625H2.51471L5.21103 7.5625H18.4412L15.6471 12.0625Z"
              fill="white"
            />
          </svg>
          Evidence ({evidences.length})
        </label>
        <div className={styles["collapsible-content"]}>
          <div className={styles["content-inner"]}>
            <button
              type="button"
              id="evidence-button"
              className={styles["evidence-button"]}
              onClick={this.handleModalOpenClose}
            >
              Submit Evidence
            </button>

            <hr />
            <div className={styles["event"]}>
              {(metaevidence &&
                (ruling && (
                  <>
                    <p>
                      {`Jurors ruled: ${this.getRulingTitle(
                        ruling.ruling,
                        metaevidence.metaEvidenceJSON.rulingOptions
                      )}  `}
                    </p>
                    <small>{new Date(ruling.ruledAt * 1000).toString()}</small>
                  </>
                ))) ||
                (metaevidence &&
                  typeof currentRuling != undefined &&
                  `Current ruling: ${this.getRulingTitle(
                    currentRuling,
                    metaevidence.metaEvidenceJSON.rulingOptions
                  )}`) ||
                "Fetching..."}
            </div>
            {evidences
              .sort((a, b) => {
                if (a.submittedAt > b.submittedAt) return -1;
                else if (a.submittedAt < b.submittedAt) return 1;

                return 0;
              })
              .map((evidence, index) => (
                <React.Fragment key={index}>
                  <div className={styles["divider"]}></div>
                  <div className={styles.evidence}>
                    <div className={styles["header"]}>
                      <h1>
                        {evidence.evidenceJSON.title ||
                          evidence.evidenceJSON.name}
                      </h1>
                      <a
                        href={`https://etherscan.io/tx/${evidence.transactionHash}`}
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
                              fill="#4d00b4"
                            />
                            <path
                              id="Path_2"
                              data-name="Path 2"
                              d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.405-232.79,128.793"
                              transform="translate(35.564 80.269)"
                              fill="#4d00b4"
                            />
                          </g>
                        </svg>
                      </a>
                    </div>
                    <p>{evidence.evidenceJSON.description}</p>
                    <div
                      className={
                        styles.footer +
                        " " +
                        styles[
                          `${evidence.evidenceJSON.evidenceSide != undefined}`
                        ]
                      }
                    >
                      {evidence.evidenceJSON.evidenceSide != undefined && (
                        <div className={styles["evidence-side"]}>
                          {this.getSupportingSideIcon(
                            evidence.evidenceJSON.evidenceSide
                          )}
                        </div>
                      )}
                      <div className={styles["temp"]}>
                        <span className={styles["sender"]}>
                          Submitted by:{" "}
                          {this.truncateAddress(evidence.submittedBy)}
                        </span>

                        <br />
                        <span className={styles["timestamp"]}>
                          Submitted at:{" "}
                          {new Date(evidence.submittedAt * 1000).toString()}
                        </span>
                      </div>
                      <a
                        href={`${ipfsGateway}${evidence.evidenceJSON.fileURI}`}
                      >
                        {this.getAttachmentIcon(evidence.evidenceJSON.fileURI)}
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            <div className={styles["divider"]}></div>
            <div className={styles["event"]}>
              <>
                <p>Dispute Created</p>
                {dispute && (
                  <small>{new Date(dispute.createdAt * 1000).toString()}</small>
                )}
              </>
            </div>
          </div>
          <div
            className={clsx(
              styles["modal-overlay"],
              styles[this.state.modalExtraClass]
            )}
            id="modal-overlay"
            onClick={this.handleModalOpenClose}
          ></div>
          <div className={styles.modalContainer}>
            <div
              className={clsx(styles.modal, styles[this.state.modalExtraClass])}
              id="modal"
            >
              <div className={styles["modal-header"]}>
                <h1>Submit Evidence</h1>
              </div>
              <div className={styles["modal-guts"]}>
                <div className={styles.evidenceTitle}>
                  <label htmlFor="evidence-title">Evidence Title</label>
                  <input
                    name="evidenceTitle"
                    id="evidence-title"
                    type="text"
                    onChange={this.handleControlChange}
                    value={evidenceTitle}
                  ></input>
                </div>
                <div className={styles.evidenceDescription}>
                  <label htmlFor="evidence-description">
                    Evidence Description
                  </label>
                  <textarea
                    name="evidenceDescription"
                    id="evidence-description"
                    type="textarea"
                    rows="3"
                    onChange={this.handleControlChange}
                    value={evidenceDescription}
                  ></textarea>
                </div>
                <div className={styles.dropzoneDiv}>
                  <label htmlFor="dropzone">
                    Upload Evidence Document (optional)
                  </label>
                  <Dropzone onDrop={this.handleDrop} id="dropzone">
                    {({ getInputProps, getRootProps }) => (
                      <section className={styles["dropzone"]}>
                        <div
                          {...getRootProps()}
                          className={styles["vertical-center"]}
                        >
                          <input {...getInputProps()} />
                          <p>
                            {(fileInput && fileInput.path) ||
                              "Drag 'n' drop some files here, or click to select files."}
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                {this.props.metaevidence && (
                  <div className={styles.evidenceSide}>
                    <div className={styles.discussion}>
                      <input
                        value={0}
                        type="radio"
                        name="support"
                        onChange={this.handleControlChange}
                        defaultChecked
                      />
                      <label>Discussion</label>
                    </div>
                    <div className={styles.sideZero}>
                      <input
                        value={1}
                        type="radio"
                        name="support"
                        onChange={this.handleControlChange}
                      />
                      <label>{`I'm supporting "${
                        this.props.metaevidence.metaEvidenceJSON.rulingOptions
                          .titles[0]
                      }"`}</label>
                    </div>
                    <div className={styles.sideOne}>
                      <input
                        value={2}
                        type="radio"
                        name="support"
                        onChange={this.handleControlChange}
                      />
                      <label>{`I'm supporting "${
                        this.props.metaevidence.metaEvidenceJSON.rulingOptions
                          .titles[1]
                      }"`}</label>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className={styles["submit-button"]}
                  onClick={this.handleSubmitEvidenceButtonClick}
                >
                  {(awaitingConfirmation && "Awaiting Confirmation") ||
                    "Submit Evidence"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EvidenceTimeline.propTypes = {
  ipfsGateway: PropTypes.string.isRequired,
  metaevidence: PropTypes.object,
  evidences: PropTypes.array,
  ruling: PropTypes.object,
  currentRuling: PropTypes.number,
  evidenceButtonHandler: PropTypes.func,
  publishCallback: PropTypes.func,
  submitEvidenceCallback: PropTypes.func
};

EvidenceTimeline.defaultProps = {
  ipfsGateway: "https://ipfs.kleros.io",
  publishCallback: e => console.error(e),
  submitEvidenceCallback: e => console.error(e)
};

export default EvidenceTimeline;
