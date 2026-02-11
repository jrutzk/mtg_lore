const express = require('express');
const path = require('path');
require('dotenv').config();

const { getCharacterLore } = require('./openaiClient');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

/**
 * POST /api/lore
 * Endpoint to fetch MTG character lore
 * Expects JSON body: { "characterName": "string" }
 */
app.post('/api/lore', async (req, res) => {
  try {
    // Extract character name from request body
    const { characterName } = req.body;

    // Validate input
    if (!characterName || typeof characterName !== 'string' || characterName.trim() === '') {
      return res.status(400).json({
        error: 'Character name is required and must be a non-empty string'
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key is not configured on the server'
      });
    }

    // Fetch character lore from OpenAI
    const loreData = await getCharacterLore(characterName.trim());

    // Return the parsed JSON to the frontend
    res.json(loreData);

  } catch (error) {
    console.error('Error in /api/lore endpoint:', error);

    // Handle different types of errors
    if (error.message.includes('Invalid response structure')) {
      return res.status(500).json({
        error: 'Received invalid data format from AI service'
      });
    }

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        error: 'Failed to parse AI response as JSON'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Failed to fetch character lore. Please try again.'
    });
  }
});

// Health check endpoint (useful for Render deployment)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
