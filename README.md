# Git Diff Code Coverage

[![Build Status](https://travis-ci.org/EvgenyMahnovets/git-diff-code-coverage.svg?branch=master)](https://travis-ci.org/EvgenyMahnovets/git-diff-code-coverage)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()
[![airbnb-style](https://img.shields.io/badge/eslint-airbnb-4B32C3.svg)](https://github.com/airbnb/javascript)
[![npm version](https://badge.fury.io/js/git-diff-code-coverage.svg)](https://badge.fury.io/js/git-diff-code-coverage)

Application used to check code coverage by tests on added lines (ex. check coverage just on new code in PR)

## How to use?

1. Run test to generate coverage report
```
npm test
```

2. Run application to analyze it

```
git-diff-code-coverage --repoPath=/Users/user/Src/example --reportPath=artifacts/coverage/coverage-summary.json --fileTemplate=app/**/*.js --source=master --target=newBranch -v
```

## Arguments

Path to folder with initiated git repository (required)
```
--repoPath, String
```

Source branch or commit hash (ex. master)
```
--source, String
```

Target branch or commit hash (ex. myCoolFeature)

```
--target, String, defaultValue: 'master'
```

Path to generated report (json coverage report)
```
--reportPath, String, defaultValue: 'coverage/coverage-summary.json'
```

Verbose mode (display stats by each file and line)
```
--verbose, -v
```

Silent mode (hide all output)
```
--silent, -s
```

Minimum overall coverage
```
--minimumOverallCoverage, -m, Number, defaultValue: 70
```

Files to analyze
```
--fileTemplate, -f, String, defaultValue: 'src/**/*.js'
```


## Areas to improve:
* Analyse git default output (using data between @@ ... @@)
* Add other coverage report support (lcov, etc.)
* Improve coverage
* Generate pretty output