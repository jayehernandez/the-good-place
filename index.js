const core = require('@actions/core');
const github = require('@actions/github');
const words = require('./words');

const imageUrl = 'https://github.com/jayehernandez/the-good-place/blob/master/images/curse.png?raw=true';
const note = `\n\n![Janet Reminder](${imageUrl})`;

async function run() {
  try {
    const token = core.getInput('repo-token');
    const octokit = github.getOctokit(token);

    if (github.context.eventName === 'issues') {
      await checkIssue(github, octokit);
    } else if (github.context.eventName === 'issue_comment') {
      await checkIssueComment(github, octokit);
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

function checkString(str) {
  var re = new RegExp(Object.keys(words).join("|"),"gi");

  return str.replace(re, function(matched){
    return words[matched.toLowerCase()];
  });
}

run();