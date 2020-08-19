![Hero Image](images/hero.png)

<p>
  <a href="https://github.com/jayehernandez/the-good-place#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/jayehernandez/the-good-place/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jayehernandez/the-good-place" />
  </a>
  <a href="https://twitter.com/jayehernandez_" target="_blank">
    <img alt="Twitter: jayehernandez_" src="https://img.shields.io/twitter/follow/jayehernandez_.svg?style=social" />
  </a>
</p>

> A GitHub Action that makes your repo a neighborhood in The Good Place

## 🍤 Features
- Replaces curse words with approved words in The Good Place

![Feature 1 Demo](images/feature1.png)

- Comments a forking accurate GIF when you first label an issue

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

Give a ⭐️ if you think this project is cool!

## 📝 License

Copyright © 2020 [Jaye Hernandez](https://jayehernandez.com).<br />
This project is [MIT](https://github.com/jayehernandez/the-good-place/blob/master/LICENSE) licensed.
