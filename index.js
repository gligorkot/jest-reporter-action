const core = require('@actions/core');
const { execSync } = require('child_process');
const { context } = require('@actions/github');
const github = require('@actions/github');

const main = async () => {
  const repoName = context.repo.repo;
  const repoOwner = context.repo.owner;
  const githubToken = core.getInput('github-token');
  const testCommand = core.getInput('test-command') || 'npx jest';
  const withCoverageTable = core.getInput('with-coverage-table') || 'true';
  const coverageInfoLocation = core.getInput('coverage-info-location') || './coverage/lcov.info';
  const prNumber = context.issue.number;
  const githubClient = github.getOctokit(githubToken);

  const codeCoverage = execSync(testCommand).toString();
  const coveragePercentage = parseFloat(execSync(
      `npx coverage-percentage ${coverageInfoLocation} --lcov`
  ).toString()).toFixed(2);

  const commentBody = `## Code Coverage Summary
<p>Total Coverage: <code>${coveragePercentage}%</code></p>
${withCoverageTable === 'true' ? `<details><summary>Coverage report</summary>
<p>
<pre>${codeCoverage}</pre>
</p>
</details>` : ''}`;

  await githubClient.rest.issues.createComment({
    repo        : repoName,
    owner       : repoOwner,
    body        : commentBody,
    issue_number: prNumber,
  });
};

main().catch(err => core.setFailed(err.message));
