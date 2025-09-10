require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const { sampleCandidates } = require("./data");
const { authenticate, encodedApiKey } = require("./authenticate");

const PORT = process.env.PORT || 3000;
const REPSCOUT_BASE_URL = process.env.REPSCOUT_BASE_URL;

const app = express();
const urlencodedParser = bp.urlencoded({ extended: true });
const jsonParser = bp.json();

let activeAssignments = [];

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const assignmentTemplatesResponse = await fetch(
    `${REPSCOUT_BASE_URL}/assignment.list`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedApiKey}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  if (!assignmentTemplatesResponse.success)
    return res
      .status(500)
      .json({ error: "Failed to fetch assignment templates" });

  const assignmentTemplates = assignmentTemplatesResponse.results;

  return res.render("index.ejs", {
    assignmentTemplates,
    candidates: sampleCandidates,
    activeAssignments,
  });
});

app.post("/assignment.start", urlencodedParser, async (req, res) => {
  const { assignment_type_id, candidate_name, candidate_email } = req.body;

  const assignmentStartResponse = await fetch(
    `${REPSCOUT_BASE_URL}/assignment.start`,
    {
      method: "POST",
      body: JSON.stringify({
        assignment_type_id,
        should_send_email: false,
        candidate: {
          name: candidate_name,
          email: candidate_email,
        },
      }),
      headers: {
        Authorization: `Basic ${encodedApiKey}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  if (!assignmentStartResponse.success)
    return res.status(500).json({ error: "Failed to start assignment" });

  const { assignment_url } = assignmentStartResponse.results;

  activeAssignments.push(assignmentStartResponse.results);

  return res.redirect(assignment_url);
});

// Accepts assignment update requests from RepScout
app.post("/assignment.update", jsonParser, authenticate, async (req, res) => {
  const { assignment_id, assignment_status } = req.body;

  const assignment = activeAssignments.find(
    (assignment) => assignment_id === assignment.assignment_id
  );

  if (!assignment) {
    return res.status(404).json({
      error: "Assignment not found",
      assignment_id,
    });
  }

  assignment.assignment_status = assignment_status;

  return res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
