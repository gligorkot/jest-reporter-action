# Jest reporter action

This action comments a pull request with the jest code coverage

![jest-reporter-action](https://imgur.com/ustWwwN.png)

## Inputs

### `github-token`

**Required** Github token.

### `test-command`

**Optional** A custom command to run the tests. (defaults to `npx jest` if not specified)

## Example usage

```yml
uses: gligorkot/jest-reporter-action@v0.6.0
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  test-command: "yarn jest --coverage"
```
