import React from "react";
import { Footer } from "../lib/index";
import { EvidenceTimeline } from "../lib/index";
import Archon from "@kleros/archon";

const archon = new Archon(window.ethereum, "https://ipfs.kleros.io");
const KLEROS_MAIN = "0x988b3a538b618c7a603e1c11ab82cd16dbe28069";
const DISPUTE_ID = 132;
const ARBITRATED = "0xebcf3bca271b26ae4b162ba560e243055af0e679";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evidences: [],
      currentRuling: ""
    };
  }

  getDisputeCreation = async () =>
    archon.arbitrable.getDispute(ARBITRATED, KLEROS_MAIN, DISPUTE_ID);

  getCurrentRuling = async () =>
    archon.arbitrator.getCurrentRuling(KLEROS_MAIN, DISPUTE_ID);

  getRuling = async () =>
    archon.arbitrable.getRuling(ARBITRATED, KLEROS_MAIN, DISPUTE_ID);

  getMetaEvidence = async () => {
    const disputeLog = await archon.arbitrable.getDispute(
      ARBITRATED, // arbitrable contract address
      KLEROS_MAIN, // arbitrator contract address
      DISPUTE_ID // dispute unique identifier
    );

    const metaevidence = await archon.arbitrable.getMetaEvidence(
      ARBITRATED, // arbitrable contract address
      disputeLog.metaEvidenceID
    );

    return metaevidence;
  };

  getEvidence = async () => {
    const disputeLog = await archon.arbitrable.getDispute(
      ARBITRATED, // arbitrable contract address
      KLEROS_MAIN, // arbitrator contract address
      DISPUTE_ID // dispute unique identifier
    );

    const evidence = await archon.arbitrable.getEvidence(
      ARBITRATED,
      KLEROS_MAIN,
      disputeLog.evidenceGroupID
    );
    return evidence;
  };

  componentDidMount = async () => {
    const metaevidence = await this.getMetaEvidence();
    const evidences = await this.getEvidence();
    const ruling = await this.getRuling();
    const currentRuling = await this.getCurrentRuling();
    const disputeEvent = await this.getDisputeCreation();

    this.setState({
      metaevidence,
      evidences,
      ruling,
      currentRuling,
      disputeEvent
    });
  };

  render() {
    return (
      <>
        <EvidenceTimeline
          key={0}
          metaevidence={this.state.metaevidence}
          evidences={this.state.evidences}
          ruling={{ ruling: 0 }}
          currentRuling={this.state.currentRuling}
          dispute={null}
          disputePeriod={2}
          numberOfVotesCast={2}
        />
        <br />
        <Footer
          key={1}
          appName="Test Application"
          repository="https://github.com/kleros/react-components"
        />
      </>
    );
  }
}

export default App;
