const core = require('@actions/core');
const github = require('@actions/github');
const words = require('./src/words');
const gifs = require('./src/gifs');

const imageUrl = 'https://github.com/jayehernandez/the-good-place/blob/master/images/curse.png?raw=true';
const note = `\n\n![Janet's Reminder on Cursing](${imageUrl})`;

async function run() {
  try {
    const token = core.getInput('repo-token');
    const octokit = github.getOctokit(token);

    if (github.context.eventName === 'issues') {
      if (github.context.payload.action === 'labeled') {
        await checkIssueLabel(github, octokit);
      } else {
        await checkIssue(github, octokit);
      }
    } else if (github.context.eventName === 'issue_comment') {
      await checkIssueComment(github, octokit);
    } else if (github.context.eventName === 'pull_request') {
      await checkPullRequest(github, octokit);
    } else if (github.context.eventName === 'pull_request_review_comment') {
      await checkPullRequestComment(github, octokit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function checkIssue(github, octokit) {
  let issue = github.context.payload.issue;
  let newTitle = checkString(issue.title);
  let newBody = checkString(issue.body);

  if (issue.title !== newTitle || issue.body != newBody) {
    if (!newBody.includes(imageUrl)) newBody += note;

    await octokit.issues.update({
      ...github.context.repo,
      issue_number: issue.number,
      title: newTitle,
      body: newBody
    });
  }
}

async function checkIssueLabel(github, octokit) {
  let { label, issue } = github.context.payload;

  // To avoid spam for issues with multiple labels
  if (issue.labels.length === 1) {
    let gifsOfLabel = gifs[label.name];

    if (gifsOfLabel && gifsOfLabel.length > 0) {
      const randomGif = gifsOfLabel[Math.floor(Math.random() * gifsOfLabel.length)];

      await octokit.issues.createComment({
        ...github.context.repo,
        issue_number: issue.number,
        body: `![Random GIF related to ${label.name}](${randomGif})`
      });
    }
  }
}

async function checkIssueComment(github, octokit) {
  let comment = github.context.payload.comment;
  let newBody = checkString(comment.body);

  if (comment.body != newBody) {
    if (!newBody.includes(imageUrl)) newBody += note;

    await octokit.issues.updateComment({
      ...github.context.repo,
      comment_id: comment.id,
      body: newBody
    });
  }
}

async function checkPullRequest(github, octokit) {
  let pull_request = github.context.payload.pull_request;
  let newTitle = checkString(pull_request.title);
  let newBody = checkString(pull_request.body);

  if (pull_request.title !== newTitle || pull_request.body != newBody) {
    if (!newBody.includes(imageUrl)) newBody += note;

    await octokit.pulls.update({
      ...github.context.repo,
      pull_number: pull_request.number,
      title: newTitle,
      body: newBody
    });
  }
}

async function checkPullRequestComment(github, octokit) {
  let comment = github.context.payload.comment;
  let newBody = checkString(comment.body);

  if (comment.body != newBody) {
    if (!newBody.includes(imageUrl)) newBody += note;

    await octokit.pulls.updateReviewComment({
      ...github.context.repo,
      comment_id: comment.id,
      body: newBody
    });
  }
}

function checkString(str) {
  var re = new RegExp(`\\b${Object.keys(words).join('\\b|\\b')}\\b`, 'gi');

  return str.replace(re, function(matched){
    return words[matched.toLowerCase()];
  });
}

run();