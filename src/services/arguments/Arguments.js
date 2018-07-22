import commandLineArgs from 'command-line-args';

export default class Arguments {
  constructor() {
    const {
      repoPath, source, target, reportPath,
    } = commandLineArgs([
      {
        name: 'repoPath', type: String,
      },
      {
        name: 'source', alias: 's', type: String,
      },
      {
        name: 'target', alias: 't', type: String, defaultValue: 'master',
      },
      {
        name: 'reportPath', type: String, defaultValue: 'coverage/coverage-summary.json',
      },
    ]);

    this.repoPath = repoPath;
    this.source = source;
    this.target = target;
    this.reportPath = reportPath;

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

  validateRepositoryPathOption() {
    if (!this.GitRepoPath) {
      throw new Error('repoPath option is required');
    }
  }
}
