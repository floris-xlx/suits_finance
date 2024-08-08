import axios from 'axios';

const getLatestCommitHash = async () => {
    const GITHUB_API_KEY = "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";

    if (!GITHUB_API_KEY) {
        console.error('GitHub API key is not set in environment variables');
        throw new Error('GitHub API key is not set');
    }

    const repoUrl = 'https://api.github.com/repos/floris-xlx/app.suits.finance/commits';

    try {
        const response = await axios({
            method: 'get',
            url: repoUrl,
            headers: {
                'Authorization': `token ${GITHUB_API_KEY}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.status !== 200) {
            console.error(`GitHub API responded with status ${response.status}`);
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const data = response.data;
        const latestCommitHash = data[0]?.sha;

        if (!latestCommitHash) {
            console.error('No commit hash found in the response');
            throw new Error('No commit hash found');
        }

        return latestCommitHash.substring(0, 7);
    } catch (error) {
        console.error('Error fetching latest commit hash:', error);
        throw error;
    }
};

export { getLatestCommitHash };
