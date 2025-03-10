# Jest reporter action

This action comments a pull request with the jest code coverage

![jest-reporter-action](https://imgur.com/ustWwwN.png)

## Inputs

### `github-token`

**Required** Github token.

### `test-command`

**Optional** A custom command to run the tests. (defaults to `npx jest` if not specified)

### `coverage-info-location`

**Optional** The location of the coverage info file, useful for a monorepo, (defaults to './coverage/lcov.info' if not specified)

### `with-coverage-table`

**Optional** Whether to include a coverage table in the github comment or not (defaults to 'true')

## Example usage

```yml
uses: gligorkot/jest-reporter-action@v0.7.0
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  test-command: "yarn jest --coverage"
  coverage-info-location: ./coverage/lcov.info
  with-coverage-table: true
```
