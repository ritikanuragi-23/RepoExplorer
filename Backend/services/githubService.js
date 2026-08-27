const axios = require('axios');

const GITHUB_API = 'https://api.github.com';

const getHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'RepoExplorer-App'
  };
  const token = process.env.GITHUB_TOKEN;
  if (token && token !== 'your_github_personal_access_token_here' && token.trim() !== '') {
    headers['Authorization'] = `token ${token.trim()}`;
  }
  return headers;
};

const getRepoInfo = async (owner, repo) => {
  const res = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: getHeaders(),
  });
  return res.data;
};

const getReadme = async (owner, repo) => {
  try {
    const res = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
      headers: getHeaders(),
    });
    const content = Buffer.from(res.data.content, 'base64').toString('utf-8');
    // Trim to avoid Gemini token limits
    return content.slice(0, 6000);
  } catch {
    return 'No README found.';
  }
};

const getFileTree = async (owner, repo) => {
  try {
    const res = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`, {
      headers: getHeaders(),
    });
    // Return simplified tree: path + type
    return res.data.tree
      .filter((item) => item.path && !item.path.startsWith('node_modules'))
      .slice(0, 100)
      .map((item) => ({ path: item.path, type: item.type }));
  } catch {
    // Fallback: root contents
    try {
      const res = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contents`, {
        headers: getHeaders(),
      });
      return res.data.map((item) => ({ path: item.name, type: item.type }));
    } catch {
      return [];
    }
  }
};

module.exports = { getRepoInfo, getReadme, getFileTree };
