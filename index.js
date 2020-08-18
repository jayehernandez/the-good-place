const core = require('@actions/core');
const github = require('@actions/github');
const words = require('./words');

const note = '\n\n_Hi there! If you\'re trying to curse, you can\'t here at The Good Place. Have a great day! - Janet_'

async function run() {
  try {
    const token = core.getInput('repo-token');
    const octokit = github.getOctokit(token);

    console.log(words)

    if (github.context.eventName == 'issues') {
      let issue = github.context.payload.issue;

      console.log(issue.title);
      let newTitle = checkString(issue.title);
      let newBody = checkString(issue.body);


      console.log(newTitle);
      console.log(newBody);

      if (issue.title !== newTitle || issue.body != newBody) {
        if (!newBody.includes(note)) newBody += note;

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