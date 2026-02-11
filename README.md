# MTG Lore Finder

A simple full-stack web application that fetches Magic: The Gathering character lore using the OpenAI API. Users can enter a character name and receive structured information about their story, affiliations, and relationships.

## 🎯 Features

- Clean, responsive UI built with vanilla HTML/CSS/JS
- Express.js backend with OpenAI integration
- Structured JSON responses with character lore
- Character relationship tracking (with Nahiri and Aurelia)
- Error handling and loading states
- Ready for deployment on Render

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **AI**: OpenAI API (Node SDK)
- **Deployment**: Render-ready

## 📁 Project Structure

```
mtg-lore/
├── public/
│   ├── index.html      # Main HTML page
│   ├── style.css       # Styling
│   └── script.js       # Frontend JavaScript
├── server/
│   ├── server.js       # Express server
│   └── openaiClient.js # OpenAI API integration
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Local Setup

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🌐 Deploying to Render

### Method 1: Web Service Deployment

1. **Create a new Web Service** on [Render](https://render.com)

2. **Connect your repository**
   - Connect your GitHub/GitLab repository
   - Or use Render's manual deploy

3. **Configure the service**
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add environment variable**
   - Go to "Environment" tab
   - Add `OPENAI_API_KEY` with your actual API key

5. **Deploy**
   - Render will automatically deploy your app
   - Access it at the provided URL (e.g., `https://your-app.onrender.com`)

### Method 2: Using render.yaml (Infrastructure as Code)

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: mtg-lore-app
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: OPENAI_API_KEY
        sync: false
```

Then connect your repository and Render will auto-configure based on this file.

## 🎮 Usage

1. Enter a Magic: The Gathering character name (e.g., "Jace Beleren", "Liliana Vess", "Chandra Nalaar")
2. Click "Get Lore"
3. View the structured information including:
   - Character name
   - Home plane
   - Affiliations
   - Story summary
   - Relationships with Nahiri and Aurelia

## 🔒 Security Notes

- Never commit your `.env` file or API keys to version control
- Use environment variables for all secrets
- The `.gitignore` file is configured to exclude sensitive files

## 📝 API Response Format

The backend returns a strict JSON format:

```json
{
  "name": "string",
  "plane": "string",
  "affiliations": ["array", "of", "strings"],
  "summary": "2-3 sentence summary",
  "nahiri_relationship": "attack_on_sight | enemies | neutral | friends | loved_ones",
  "aurelia_relationship": "attack_on_sight | enemies | neutral | friends | loved_ones"
}
```

## 🐛 Troubleshooting

**"OpenAI API key is not configured"**
- Make sure your `.env` file exists and contains a valid `OPENAI_API_KEY`
- On Render, verify the environment variable is set in the dashboard

**"Failed to fetch character lore"**
- Check your OpenAI API key is valid and has credits
- Verify your internet connection
- Check the browser console and server logs for details

**Port already in use**
- Change the `PORT` in your `.env` file to a different number

## 💡 Customization Ideas

- Add more characters to track relationships with
- Include character images using Scryfall API
- Add a history of searched characters
- Implement caching to reduce API calls
- Add more detailed lore sections

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Magic: The Gathering is a trademark of Wizards of the Coast
- Built with OpenAI's GPT models
