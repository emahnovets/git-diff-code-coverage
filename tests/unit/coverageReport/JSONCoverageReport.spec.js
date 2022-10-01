import JSONCoverageReport from '../../../src/corevageReport/JSONCoverageReport';

describe('json coverage report', () => {
  test('should raise an error in file does not exists', () => {
    expect(() => new JSONCoverageReport('testPath/example.json'))
      .toThrow('coverage report does not exists, check path');
  });

  test('should raise an error in file has corrupted content', () => {
    expect(() => new JSONCoverageReport('tests/mocks/invalid-json.json'))
      .toThrow('can\'t parse report content');
  });

  test('should parse report content', () => {
    const report = new JSONCoverageReport('tests/mocks/coverage-example.json');

    expect(report.Report).toEqual({
      coverage: 'coverage-test-report',
    });
  });

  test('should check is line of file should be covered', () => {
    const report = new JSONCoverageReport('tests/mocks/coverage-summary.json');

    expect(report.isLineShouldBeCovered('app/file2.js', 6)).toBeTruthy();
    expect(report.isLineShouldBeCovered('app/file2.js', 12)).toBeTruthy();
    expect(report.isLineShouldBeCovered('app/file2.js', 1)).toBeFalsy();
    expect(report.isLineShouldBeCovered('app/file1.js', 1)).toBeFalsy();
    expect(report.isLineShouldBeCovered('app/file3.js', 1)).toBeFalsy();
  });
});
