require("dotenv").config();
const express = require("express");
const base64 = require("base-64");
const bp = require("body-parser");
const { sampleCandidates } = require("./data");

const PORT = process.env.PORT || 3000;
const REPSCOUT_BASE_URL = process.env.REPSCOUT_BASE_URL;
const REPSCOUT_API_KEY = base64.encode(`${process.env.REPSCOUT_API_KEY}:`);

const app = express();

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const assignmentTemplatesResponse = await fetch(
    `${REPSCOUT_BASE_URL}/assignment.list`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${REPSCOUT_API_KEY}`,
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
  });
});

app.post("/assignment.start", async (req, res) => {
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
        Authorization: `Basic ${REPSCOUT_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  if (!assignmentStartResponse.success)
    return res.status(500).json({ error: "Failed to start assignment" });

  const { assignment_url } = assignmentStartResponse.results;

  return res.redirect(assignment_url);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
