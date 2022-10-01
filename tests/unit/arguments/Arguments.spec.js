import Arguments from '../../../src/arguments/Arguments';

describe('arguments', () => {
  test('should parse command line args', () => {
    process.argv = ['node', 'jest',
      '--repoPath', './myCoolProject',
      '--source', '5d8469086d24b900532ebfbced71c9f27bcb9744',
      '--target', 'abe9a5f34d75e204ef46149bdc81920c647ba8ab',
      '--reportPath', 'coverage/coverage-summary.json',
      '--silent',
      '--verbose',
      '--minimumOverallCoverage', '90',
      '--reportFormat', 'lcov',
    ];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.GitRepoPath).toBe('./myCoolProject');
    expect(argumentsInstance.SourceCommitHash).toBe('5d8469086d24b900532ebfbced71c9f27bcb9744');
    expect(argumentsInstance.TargetCommitHash).toBe('abe9a5f34d75e204ef46149bdc81920c647ba8ab');
    expect(argumentsInstance.CoverageReportPath).toBe('coverage/coverage-summary.json');
    expect(argumentsInstance.Silent).toBeTruthy();
    expect(argumentsInstance.Verbose).toBeTruthy();
    expect(argumentsInstance.MinimumOverallCoverage).toBe(90);
    expect(argumentsInstance.ReportFormat).toBe('lcov');
  });

  test('should parse aliases correctly', () => {
    process.argv = ['node', 'jest',
      '--repoPath', './myCoolProject',
      '-s',
      '-v',
      '-m', '100',
    ];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.GitRepoPath).toBe('./myCoolProject');
    expect(argumentsInstance.Silent).toBeTruthy();
    expect(argumentsInstance.Verbose).toBeTruthy();
    expect(argumentsInstance.MinimumOverallCoverage).toBe(100);
  });

  test('should have \'master\' as default value for target option', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.TargetCommitHash).toBe('master');
  });

  test('should have \'lcov\' as default value for reportFormat', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.ReportFormat).toBe('lcov');
  });

  test('should have default value for coverage report path option', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.CoverageReportPath).toBe('coverage/coverage-summary.json');
  });

  test('should have default value for minimum overall coverage option', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.MinimumOverallCoverage).toBe(70);
  });

  test('should raise an error is repoPath option haven\'t passed', () => {
    process.argv = ['node', 'jest'];

    expect(() => new Arguments()).toThrow('repoPath option is required');
  });
});
