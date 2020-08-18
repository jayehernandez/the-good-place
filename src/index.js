const core = require('@actions/core');
const github = require('@actions/github');
const words = require('./words');

async function run() {
  try {
    const token = core.getInput('repo-token');
    const octokit = github.getOctokit(token);

    if (github.context.eventName == 'issues') {
      const issue = github.context.payload.issue;
      let newTitle = checkString(issue.title);
      let newBody = checkString(issue.body);
      console.log(newTitle);
      console.log(newBody);

      if (issue.title !== newTitle || issue.body != newBody) {
        newBody += '\n🍤 If you\'re trying to curse, you can\'t here. Your issue was updated by The Good Place Action.'

        await octokit.issues.update({
          ...github.context.repo,
          issue_number: issue.number,
          title: newTitle,
          body: newBody
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

function checkString(str) {
  var re = new RegExp(Object.keys(words).join("|"),"gi");

  return str.replace(re, function(matched){
    return words[matched.toLowerCase()];
  });
}

run();