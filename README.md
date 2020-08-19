![Hero Image](images/hero.png)

<p>
  <a href="https://github.com/jayehernandez/the-good-place#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/jayehernandez/the-good-place/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jayehernandez/the-good-place" />
  </a>
  <a href="http://hits.dwyl.com/jayehernandez/the-good-place" target="_blank">
    <img alt="HitCount" src="http://hits.dwyl.com/jayehernandez/the-good-place.svg" />
  </a>
  <a href="https://twitter.com/jayehernandez_" target="_blank">
    <img alt="Twitter: jayehernandez_" src="https://img.shields.io/twitter/follow/jayehernandez_.svg?style=social" />
  </a>
</p>

> A GitHub Action that lets you be an architect of your own neighborhood (your repository) in The Good Place

## 🍤 Features
- Replaces curse words in Issues and Pull Requests with approved words in The Good Place

![Feature 1 Demo](images/feature1.png)

- Comments a forking accurate GIF when you first label an issue (supports GitHub's [default labels](https://docs.github.com/en/github/managing-your-work-on-github/about-labels#using-default-labels))
![Feature 2](https://dev-to-

![Feature 2 Demo](images/feature2.png)

## 🧐 How to Use
Create a new file titled `action.yml` inside the `.github/workflows` directory of your repository and copy the code below.

```yaml
on:
  issues:
    types: [opened, edited, labeled]
  issue_comment:
    types: [created, edited]
  pull_request:
    types: [opened, edited]
  pull_request_review_comment:
    types: [created, edited]
jobs:
  build:
    runs-on: ubuntu-latest
    name: The Good Place
    steps:
      - name: The Good Place Action
        uses: jayehernandez/the-good-place@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## 🙏🏻 Acknowledgements

* [Octokit Rest API](https://developer.github.com/v3/libraries/)
* GIFs from [Giphy](giphy.com)

Give a ⭐️ if you think this project is cool! This is an entry to dev.to's [GitHub Actions Hackathon](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn).

## 📝 License

Copyright © 2020 [Jaye Hernandez](https://jayehernandez.com).<br />
This project is [MIT](https://github.com/jayehernandez/the-good-place/blob/master/LICENSE) licensed.
