import commandLineArgs from 'command-line-args';

export default class Arguments {
  constructor() {
    const {
      repoPath, source, target, reportPath, verbose, minimumOverallCoverage, silent, fileTemplate,
    } = commandLineArgs([
      {
        name: 'repoPath', type: String,
      },
      {
        name: 'source', type: String,
      },
      {
        name: 'target', type: String, defaultValue: 'master',
      },
      {
        name: 'reportPath', type: String, defaultValue: 'coverage/coverage-summary.json',
      },
      {
        name: 'verbose', alias: 'v', type: Boolean,
      },
      {
        name: 'silent', alias: 's', type: Boolean,
      },
      {
        name: 'minimumOverallCoverage', alias: 'm', type: Number, defaultValue: 70,
      },
      {
        name: 'fileTemplate', alias: 'f', type: String, defaultValue: 'src/**/*.js',
      },
    ]);

    this.repoPath = repoPath;
    this.source = source;
    this.target = target;
    this.reportPath = reportPath;
    this.verbose = verbose;
    this.minimumOverallCoverage = minimumOverallCoverage;
    this.silent = silent;
    this.fileTemplate = fileTemplate;

    this.validateRepositoryPathOption();
  }

  get GitRepoPath() {
    return this.repoPath;
  }

  get SourceCommitHash() {
    return this.source;
  }

  get TargetCommitHash() {
    return this.target;
  }

  get CoverageReportPath() {
    return this.reportPath;
  }

  get Verbose() {
    return this.verbose;
  }

  get Silent() {
    return this.silent;
  }

  get MinimumOverallCoverage() {
    return this.minimumOverallCoverage;
  }

  get FileTemplate() {
    return this.fileTemplate;
  }

  validateRepositoryPathOption() {
    if (!this.GitRepoPath) {
      throw new Error('repoPath option is required');
    }
  }
}
