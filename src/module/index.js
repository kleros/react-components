import React from "react";
import { Footer } from "../lib/index";
import { EvidenceTimeline } from "../lib/index";

const App = () => (
  <>
    <Footer
      appName="Test Application"
      repository="https://github.com/kleros/react-components"
      locale="tr"
    />
    <EvidenceTimeline
      metaEvidence={{
        metaEvidenceJSON: {
          category: "Curated Lists",
          title: "Add Token to Registry",
          description:
            "Someone requested to add a token to the token curated registry of tokens.",
          aliases: {
            "0x988b3a538b618c7a603e1c11ab82cd16dbe28069": "Arbitrator"
          },
          question: "Should the token be added to the registry?",
          rulingOptions: {
            titles: ["Yes, Add It", "No, Don't Add It"],
            descriptions: [
              "Select this if you think the token information is correct and the token should be added to the registry.",
              "Select this if you think the token information is incorrect and the token should be not be added to the registry."
            ]
          },
          fileURI:
            "/ipfs/QmQGDs9jvWJxRAmCVtTXy3EPQeMj2dPMtLnr5WrWqYUYy6/t2cr-primary-document.pdf",
          evidenceDisplayInterfaceURL: "https://t2cr-evidence.netlify.com",
          evidenceDisplayInterfaceHash:
            "Bccz8gNQroXfAzDvXdiTq9SpPe6pE9qqUy2vuYMLFthdGTzWx3mki4uH2nLtSqj1n9iKHFTXhN5wXDygqpyRYv5eCt"
        }
      }}
      evidence={[
        {
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: "1600000000",
          evidenceJSON: {
            name: "Token challenge",
            description: 'Incorrect name. It should be just "ZB".',
            fileURI: "",
            fileTypeExtension: ""
          }
        },
        {
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: "1600000000",
          evidenceJSON: {
            title: "All roads lead to ZB TOKEN",
            description:
              "I send supporting evidence and refute the last presentation of the challenger. Please see attached document",
            fileURI:
              "/ipfs/QmcsAoDv9HeQ3a4TsGQH2g2putqShZfPLjTspntJqdyNms/evidence-ok.pdf",
            fileTypeExtension: "pdf",
            evidenceSide: 0
          }
        }
      ]}
    />
  </>
);
export default App;
