import Arguments from '../../../src/services/arguments/Arguments';

describe('arguments', () => {
  test('should parse command line args', () => {
    process.argv = ['node', 'jest',
      '--repoPath', './myCoolProject',
      '--source', '5d8469086d24b900532ebfbced71c9f27bcb9744',
      '--target', 'abe9a5f34d75e204ef46149bdc81920c647ba8ab',
      '--reportPath', 'coverage/coverage-summary.json',
    ];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.GitRepoPath).toBe('./myCoolProject');
    expect(argumentsInstance.SourceCommitHash).toBe('5d8469086d24b900532ebfbced71c9f27bcb9744');
    expect(argumentsInstance.TargetCommitHash).toBe('abe9a5f34d75e204ef46149bdc81920c647ba8ab');
    expect(argumentsInstance.CoverageReportPath).toBe('coverage/coverage-summary.json');
  });

  test('should parse aliases correctly', () => {
    process.argv = ['node', 'jest',
      '--repoPath', './myCoolProject',
      '-s', '8d190c3009d7d9fc546ca4ce17d5200f9bfecc9b',
      '-t', 'c480082507dc4bc37633580748aaab9cb2e446d2',
      '--reportPath', 'coverage/coverage-summary.json',
    ];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.GitRepoPath).toBe('./myCoolProject');
    expect(argumentsInstance.SourceCommitHash).toBe('8d190c3009d7d9fc546ca4ce17d5200f9bfecc9b');
    expect(argumentsInstance.TargetCommitHash).toBe('c480082507dc4bc37633580748aaab9cb2e446d2');
    expect(argumentsInstance.CoverageReportPath).toBe('coverage/coverage-summary.json');
  });

  test('should have \'master\' as default value for target option', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.TargetCommitHash).toBe('master');
  });

  test('should have default value for coverage report path option', () => {
    process.argv = ['node', 'jest', '--repoPath', './myCoolProject'];

    const argumentsInstance = new Arguments();

    expect(argumentsInstance.CoverageReportPath).toBe('coverage/coverage-summary.json');
  });

  test('should raise an error is repoPath option haven\'t passed', () => {
    process.argv = ['node', 'jest'];

    expect(() => new Arguments()).toThrowError('repoPath option is required');
  });
});
