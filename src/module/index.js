import React from "react";
import { Footer } from "../lib/index";
import { EvidenceTimeline } from "../lib/index";
import { EvidenceCard } from "../lib/index";

import { Attachment } from "../lib/index";

const App = () => (
  <>
    <Attachment />
    <EvidenceCard />
    <EvidenceTimeline />
  </>
);
export default App;
