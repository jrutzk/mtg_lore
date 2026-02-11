const OpenAI = require('openai');

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Fetches lore for a Magic: The Gathering character using OpenAI
 * @param {string} characterName - The name of the MTG character
 * @returns {Promise<Object>} - Parsed JSON object with character lore
 */
async function getCharacterLore(characterName) {
  try {
    // Define the system message that instructs the AI to be an MTG lore expert
    const systemMessage = `You are an expert on Magic: The Gathering lore. When asked about a character, you must respond with ONLY valid JSON matching this exact schema:

{
  "name": "string",
  "plane": "string",
  "affiliations": ["strings"],
  "summary": "2-3 sentence summary of their lore and story arc",
  "nahiri_relationship": "attack_on_sight | enemies | neutral | friends | loved_ones",
  "aurelia_relationship": "attack_on_sight | enemies | neutral | friends | loved_ones"
}

Rules:
- No extra fields.
- No markdown.
- No commentary.
- Output valid JSON only.
- Relationship fields must contain exactly one of the allowed values: attack_on_sight, enemies, neutral, friends, or loved_ones.
- Use snake_case for relationship enum values.
- Avoid using emojis or special characters in the response.`;

    // Construct the user message with the character name
    const userMessage = `Provide the lore for the Magic: The Gathering character: ${characterName}`;

    // Make the API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      //service_tier: "flex",
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' } // Ensures JSON response
    });

    // Extract the response content
    const responseContent = completion.choices[0].message.content;

    // Parse the JSON response
    const loreData = JSON.parse(responseContent);

    // Validate that required fields exist
    if (!loreData.name || !loreData.plane || !loreData.summary) {
      throw new Error('Invalid response structure from OpenAI');
    }

    return loreData;

  } catch (error) {
    console.error('Error fetching character lore:', error);
    throw error;
  }
}

module.exports = { getCharacterLore };
