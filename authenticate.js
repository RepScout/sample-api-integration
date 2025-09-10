require("dotenv").config();
const base64 = require("base-64");

const REPSCOUT_API_KEY = process.env.REPSCOUT_API_KEY;
const ENCODED_REPSCOUT_API_KEY = base64.encode(`${REPSCOUT_API_KEY}:`);

module.exports = {
  encodedApiKey: ENCODED_REPSCOUT_API_KEY,
  authenticate: (req, res, next) => {
    const authorization = req.headers.authorization;

    // Clients validate against the API key provided by RepScout.
    if (authorization !== `Basic ${ENCODED_REPSCOUT_API_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  },
};
