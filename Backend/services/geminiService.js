const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const analyzeRepo = async ({ name, description, language, readme, fileTree, stars, forks }) => {
  const treeText = fileTree
    .slice(0, 60)
    .map((f) => `${f.type === 'tree' ? '📁' : '📄'} ${f.path}`)
    .join('\n');

  const prompt = `
You are an expert software engineer. Analyze the following GitHub repository and provide a structured explanation.

## Repository Info
- **Name**: ${name}
- **Description**: ${description || 'No description provided'}
- **Primary Language**: ${language || 'Unknown'}
- **Stars**: ${stars || 0}
- **Forks**: ${forks || 0}

## README Content
\`\`\`
${readme}
\`\`\`

## File Structure (first 60 entries)
${treeText}

---

Please respond with a valid JSON object (no markdown fences, no extra text) in this exact format:
{
  "summary": "2-3 sentence project summary covering what it does and why it matters",
  "technologies": ["tech1", "tech2", "tech3"],
  "folderStructure": "Brief explanation of key folders/files and their purpose (3-5 sentences)",
  "keyFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "setup": ["Step 1: ...", "Step 2: ...", "Step 3: ...", "Step 4: ..."],
  "audience": "Who would benefit from using or contributing to this project (2-3 sentences)",
  "category": "One of: library, framework, tool, app, api, devops, learning, other"
}

Be specific, concise, and developer-focused. Use actual details from the repo, not generic statements.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  const text = response.text.trim();

  // Strip any accidental markdown code fences
  const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse JSON from Gemini response:", text);
    throw new Error("AI failed to generate a valid JSON response.");
  }
};

const chatWithRepo = async ({ repoContext, question }) => {
  const prompt = `
You are an AI assistant specialized in analyzing GitHub repositories. You have been provided with the following context about a repository:

## Repository Context
- **Name**: ${repoContext.name}
- **Description**: ${repoContext.description}
- **Primary Language**: ${repoContext.language}
- **Stars**: ${repoContext.stars}
- **Forks**: ${repoContext.forks}

## README Snippet
\`\`\`
${repoContext.readme.slice(0, 5000)}
\`\`\`

## File Structure (Partial)
${repoContext.fileTree.slice(0, 100).map(f => f.path).join('\n')}

---

The user has the following question about this repository:
"${question}"

Please provide a concise, helpful, and technical answer based ONLY on the provided context. If the answer isn't in the context, say you don't have enough information about that specific detail. Keep the response under 150 words.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text.trim();
};

module.exports = { analyzeRepo, chatWithRepo };
