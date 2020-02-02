import React from "react";
import { Footer } from "../lib/index";
import { EvidenceTimeline } from "../lib/index";
import Archon from "@kleros/archon";

const archon = new Archon(window.ethereum, "https://ipfs.kleros.io");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { metaevidence: "", evidences: [] };
  }

  getMetaEvidence = async () => {
    const disputeLog = await archon.arbitrable.getDispute(
      "0xebcf3bca271b26ae4b162ba560e243055af0e679", // arbitrable contract address
      "0x988b3A538b618C7A603e1c11Ab82Cd16dbE28069", // arbitrator contract address
      132 // dispute unique identifier
    );

    const metaevidence = await archon.arbitrable.getMetaEvidence(
      "0xebcf3bca271b26ae4b162ba560e243055af0e679", // arbitrable contract address
      disputeLog.metaEvidenceID
    );

    return metaevidence;
  };

  getEvidence = async () => {
    const disputeLog = await archon.arbitrable.getDispute(
      "0xebcf3bca271b26ae4b162ba560e243055af0e679", // arbitrable contract address
      "0x988b3A538b618C7A603e1c11Ab82Cd16dbE28069", // arbitrator contract address
      132 // dispute unique identifier
    );

    const evidence = await archon.arbitrable.getEvidence(
      "0xebcf3bca271b26ae4b162ba560e243055af0e679",
      "0x988b3A538b618C7A603e1c11Ab82Cd16dbE28069",
      disputeLog.evidenceGroupID
    );
    console.log(evidence);
    return evidence;
  };

  componentDidMount = async () => {
    const metaevidence = await this.getMetaEvidence();
    const evidences = await this.getEvidence();
    this.setState({ metaevidence, evidences });
  };

  render() {
    return (
      <>
        <EvidenceTimeline
          metaevidence={this.state.metaevidence}
          evidences={this.state.evidences}
        />
        <br />
        <Footer
          appName="Test Application"
          repository="https://github.com/kleros/react-components"
        />
      </>
    );
  }
}

export default App;
