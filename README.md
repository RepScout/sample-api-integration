# RepScout API Integration Demo

A simple Node.js Express application demonstrating how to integrate with the RepScout API to create and manage assignment workflows.

## Overview

This demo application showcases:

- Fetching assignment templates from the RepScout API
- Creating new assignments for candidates
- Basic web interface for testing the integration

## Features

- **Assignment Template Listing**: Displays available assignment templates from your RepScout account
- **Assignment Creation**: Creates new assignments via the RepScout API then automatically redirects
- **Webhook Support**: Accepts assignment status updates from RepScout via webhook endpoints
- **Active Assignments Tracking**: Displays real-time status of active assignments with scores and campaign information

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

6. The application will track active assignments and display their status, scores, and campaign information in real-time

## API Endpoints

### GET /

Displays the main page with candidates and assignment templates.

### POST /assignment.start

Creates a new assignment for a candidate.

**Request Body:**

- `assignment_type_id`: The ID of the assignment template to use
- `candidate_name`: Name of the candidate
- `candidate_email`: Email address of the candidate

### POST /assignment.update

Webhook endpoint that receives assignment status updates from RepScout. This endpoint is secured with Basic Authentication using your RepScout API key.

**Request Body:**

- `assignment_id`: The ID of the assignment being updated
- `assignment_status`: The new status of the assignment

**Authentication:**

This endpoint requires Basic Authentication with your RepScout API key. The webhook will automatically update the assignment status in the active assignments list.

## RepScout API Integration

This demo uses three RepScout API endpoints:

### 1. Assignment Templates (`/assignment.list`)

Fetches available assignment templates from your RepScout account.

### 2. Start Assignment (`/assignment.start`)

Creates a new assignment for a candidate and returns the assignment URL.

### 3. Assignment Update Webhook (`/assignment.update`)

Receives real-time updates from RepScout when assignment statuses change. This enables your application to stay synchronized with assignment progress, scores, and completion status.

## Webhook Setup

To enable real-time assignment updates, you need to configure your RepScout account to send webhook notifications to your application:

1. **Deploy your application** to a publicly accessible URL (e.g., using services like Heroku, Railway, or ngrok for local development)

2. **Configure the webhook URL** in your RepScout account settings:

   - Webhook URL: `https://your-domain.com/assignment.update`
   - Authentication: Basic Auth with your RepScout API key

3. **For local development**, you can use ngrok to expose your local server:

   ```bash
   # Install ngrok (if not already installed)
   npm install -g ngrok

   # Expose your local server
   ngrok http 3000

   # Use the provided HTTPS URL as your webhook endpoint
   ```

4. **Test the webhook** by creating an assignment and monitoring the active assignments section for real-time updates

## Project Structure

```
├── index.js          # Main Express application
├── authenticate.js   # Authentication middleware for webhook security
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
