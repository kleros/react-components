import React from "react";
import { Footer } from "../lib/index";
import { EvidenceTimeline } from "../lib/index";

const App = () => (
  <>
    <EvidenceTimeline
      evidences={[
        {
          evidenceJSON: {
            fileURI:
              "QmbY6fRVgXXnNcmhoYRb4JCPU8y9uKmdWVFLoj5fBRb1av/evidence-zb-token-.mov",
            fileHash:
              "Bce1WTQa7bfrJMFdEJuWV2xHsmj5JcDDyqBKGXu6PHZsn5e5oxkJ8cMJcuFDK1VsQYBtfrzgWkKCovWSvsacgN1XTj",
            name: "Example Evidence",
            description:
              "This evidence shows how to properly utilize hashing and Archon to submit valid evidence!"
          },
          evidenceValid: true,
          fileValid: true,
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: 1579543075
        },
        {
          evidenceJSON: {
            fileURI:
              "QmbY6fRVgXXnNcmhoYRb4JCPU8y9uKmdWVFLoj5fBRb1av/evidence-zb-token-.png",
            fileHash:
              "Bce1WTQa7bfrJMFdEJuWV2xHsmj5JcDDyqBKGXu6PHZsn5e5oxkJ8cMJcuFDK1VsQYBtfrzgWkKCovWSvsacgN1XTj",
            name: "Example Evidence",
            description:
              "This evidence shows how to properly utilize hashing and Archon to submit valid evidence!"
          },
          evidenceValid: true,
          fileValid: true,
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: 1579543075
        },
        {
          evidenceJSON: {
            fileURI:
              "QmbY6fRVgXXnNcmhoYRb4JCPU8y9uKmdWVFLoj5fBRb1av/evidence-zb-token-.txt",
            fileHash:
              "Bce1WTQa7bfrJMFdEJuWV2xHsmj5JcDDyqBKGXu6PHZsn5e5oxkJ8cMJcuFDK1VsQYBtfrzgWkKCovWSvsacgN1XTj",
            name: "Example Evidence",
            description:
              "This evidence shows how to properly utilize hashing and Archon to submit valid evidence!"
          },
          evidenceValid: true,
          fileValid: true,
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: 1579543075
        },
        {
          evidenceJSON: {
            fileURI:
              "QmbY6fRVgXXnNcmhoYRb4JCPU8y9uKmdWVFLoj5fBRb1av/evidence-zb-token-.a",
            fileHash:
              "Bce1WTQa7bfrJMFdEJuWV2xHsmj5JcDDyqBKGXu6PHZsn5e5oxkJ8cMJcuFDK1VsQYBtfrzgWkKCovWSvsacgN1XTj",
            name: "Example Evidence",
            description:
              "This evidence shows how to properly utilize hashing and Archon to submit valid evidence!"
          },
          evidenceValid: true,
          fileValid: true,
          submittedBy: "0xac96570CF5bb71e557f117651Ce4B100B6d06af8",
          submittedAt: 1579543075
        }
      ]}
    />
    <br />
    <Footer
      appName="Test Application"
      repository="https://github.com/kleros/react-components"
    />
  </>
);
export default App;
