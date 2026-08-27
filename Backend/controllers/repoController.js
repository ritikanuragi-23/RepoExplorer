const githubService = require('../services/githubService');
const geminiService = require('../services/geminiService');

const parseGithubUrl = (url) => {
  try {
    const cleaned = url.trim().replace(/\/$/, '');
    const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  } catch {
    return null;
  }
};

const analyzeRepo = async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid GitHub repository URL.' });
  }

  const parsed = parseGithubUrl(url);
  if (!parsed) {
    return res.status(400).json({
      error: 'Invalid GitHub URL. Expected format: https://github.com/owner/repo',
    });
  }

  const { owner, repo } = parsed;

  try {
    // Fetch GitHub data in parallel
    let repoInfo, readme, fileTree;
    try {
      [repoInfo, readme, fileTree] = await Promise.all([
        githubService.getRepoInfo(owner, repo),
        githubService.getReadme(owner, repo),
        githubService.getFileTree(owner, repo),
      ]);
    } catch (err) {
      console.error('[GitHub Service Error]', err.response?.status, err.message);
      if (err.response?.status === 401) {
        return res.status(401).json({ error: 'GitHub Authentication failed. Check your GITHUB_TOKEN.' });
      }
      throw err; // Let it be caught by the outer catch
    }

    // Generate AI analysis
    let aiAnalysis;
    try {
      aiAnalysis = await geminiService.analyzeRepo({
        name: repoInfo.full_name,
        description: repoInfo.description,
        language: repoInfo.language,
        stars: repoInfo.stargazers_count,
        forks: repoInfo.forks_count,
        readme,
        fileTree,
      });
    } catch (err) {
      console.error('[Gemini Service Error]', err.status || err.response?.status, err.message);
      const status = err.status || err.response?.status;
      if (status === 401 || status === 400 || err.message?.includes('API_KEY_INVALID')) {
        return res.status(401).json({ error: 'Gemini API Authentication failed. Please check if your GEMINI_API_KEY is valid.' });
      }
      throw err;
    }

    res.json({
      repoInfo: {
        name: repoInfo.name,
        fullName: repoInfo.full_name,
        description: repoInfo.description,
        language: repoInfo.language,
        stars: repoInfo.stargazers_count,
        forks: repoInfo.forks_count,
        watchers: repoInfo.watchers_count,
        openIssues: repoInfo.open_issues_count,
        defaultBranch: repoInfo.default_branch,
        htmlUrl: repoInfo.html_url,
        createdAt: repoInfo.created_at,
        updatedAt: repoInfo.updated_at,
        license: repoInfo.license?.name || null,
        topics: repoInfo.topics || [],
        homepage: repoInfo.homepage || null,
      },
      fileTree,
      aiAnalysis,
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: `Repository "${owner}/${repo}" not found on GitHub.` });
    }
    if (err.response?.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit reached. Add a GITHUB_TOKEN to your .env file.' });
    }
    if (err.message?.includes('JSON')) {
      return res.status(500).json({ error: 'AI failed to generate a structured response. Try again.' });
    }
    console.error('[analyzeRepo error]', err);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
};

const chatAboutRepo = async (req, res) => {
  const { repoContext, question } = req.body;

  if (!repoContext || !question) {
    return res.status(400).json({ error: 'Missing repoContext or question' });
  }

  try {
    const answer = await geminiService.chatWithRepo({ repoContext, question });
    res.json({ answer });
  } catch (err) {
    console.error('[chatAboutRepo error]', err);
    res.status(500).json({ error: 'Failed to get a response from AI.' });
  }
};

module.exports = {
  analyzeRepo,
  chatAboutRepo
};
