# RepScout API Integration Demo

A simple Node.js Express application demonstrating how to integrate with the RepScout API to create and manage assignment workflows.

## Overview

This demo application showcases:

- Fetching assignment templates from the RepScout API
- Creating new assignments for candidates
- Basic web interface for testing the integration

## Features

- **Assignment Template Listing**: Displays available assignment templates from your RepScout account
- **Assignment Creation**: Creates new assignments via the RepScout API then automaticaly redirects

## Prerequisites

- Node.js (v14 or higher)
- A RepScout account with API access
- RepScout API credentials

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RepScout/sample-api-integration.git
cd sample-api-integration
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with your RepScout credentials:

```env
REPSCOUT_BASE_URL=https://test.repscout.ai/api/1/integrations/repscout
REPSCOUT_API_KEY=your_api_key_here
PORT=3000
```

## Usage

1. Start the application:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. You'll see a list of sample candidates and available assignment templates

4. Click "Start Assignment" next to any candidate to create a new assignment

5. You'll be automatically redirected to the assignment URL

## API Endpoints

### GET /

Displays the main page with candidates and assignment templates.

### POST /assignment.start

Creates a new assignment for a candidate.

**Request Body:**

- `assignment_type_id`: The ID of the assignment template to use
- `candidate_name`: Name of the candidate
- `candidate_email`: Email address of the candidate

## RepScout API Integration

This demo uses two RepScout API endpoints:

### 1. Assignment Templates (`/assignment.list`)

Fetches available assignment templates from your RepScout account.

### 2. Start Assignment (`/assignment.start`)

Creates a new assignment for a candidate and returns the assignment URL.

## Project Structure

```
├── index.js          # Main Express application
├── data.js           # Sample candidate data
├── views/
│   └── index.ejs     # Main HTML template
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **ejs**: Template engine for rendering HTML
- **body-parser**: Middleware for parsing request bodies
- **dotenv**: Environment variable management
- **base-64**: Base64 encoding for API authentication

## Customization

### Adding More Candidates

Edit the `data.js` file to add more sample candidates:

```javascript
module.exports = {
  sampleCandidates: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  ],
};
```

### Modifying Assignment Creation

The assignment creation logic is in the `/assignment.start` POST route in `index.js`. You can modify the request payload to include additional parameters like:

- `should_send_email`: Whether to send email notifications
- Custom candidate fields
- Assignment-specific settings

## License

ISC License - see LICENSE file for details

## Support

For questions about this demo or the RepScout API, please contact:

- Email: info@repscout.ai
