# RepoExplorer — AI GitHub Project Explainer

RepoExplorer is a modern web application that lets developers instantly understand any GitHub repository using AI analysis. It breaks down complex codebases into structured insights, file trees, and actionable summaries.

## Features

- **Instant Repository Analysis**: Paste any GitHub URL and get a deep-dive summary in seconds.
- **Sequential Loading Experience**: A multi-step animation sequence that guides you through the analysis (Connecting → Fetching → Analyzing).
- **Interactive File Tree**: Explore the project structure with a visual, color-coded file explorer.
- **AI Chat Assistant**: Ask specific questions about the codebase and get contextual answers.
- **Premium UI/UX**: Built with a dark theme, glassmorphism effects, and dynamic background animations.

## Tech Stack

### Frontend
- **React 18** (Vite-powered)
- **Tailwind CSS** (Utility-first styling)
- **Framer Motion** (Animations)
- **Lucide & React Icons** (Iconography)
- **Axios** (API communication)

### Backend
- **Node.js & Express** (Server architecture)
- **Google Gemini Flash** (AI analysis)
- **GitHub REST API** (Repository data fetching)
- **Dotenv** (Secret management)

## Getting Started

### Prerequisites
- Node.js (v16+)
- A Google API Key ([Get it here](https://aistudio.google.com/app/apikey))
- A GitHub Personal Access Token

### Installation

1. **Clone the Repository**
```bash
   git clone https://github.com/ritikanuragi-23/RepoExplorer.git
   cd RepoExplorer
```

2. **Backend Setup**
```bash
   cd Backend
   npm install
```
   Create a `.env` file in the `Backend` directory:
```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   GITHUB_TOKEN=your_github_token_here
```
   Start the backend:
```bash
   npm run dev
```

3. **Frontend Setup**
```bash
   cd ../Frontend
   npm install
   npm run dev
```

4. **Open the App**
   Navigate to `http://localhost:5173` and start analyzing!

## License
This project is licensed under the MIT License.
