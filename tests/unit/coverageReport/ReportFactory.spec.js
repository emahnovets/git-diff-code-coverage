import ReportFactory from '../../../src/corevageReport/ReportFactory';

describe('Reports factory', () => {
  test('should create LCOVCoverageReport as default report', () => {
    const reportFactory = new ReportFactory();
    const report = reportFactory.create('tests/mocks/lcov.info');

    expect(report.type).toBe('lcov');
  });

  test('should create LCOVCoverageReport if unknown type', () => {
    const reportFactory = new ReportFactory();
    const report = reportFactory.create('tests/mocks/lcov.info', 'unknownReportType');

    expect(report.type).toBe('lcov');
  });

  test('should create JSONCoverageReport', () => {
    const reportFactory = new ReportFactory();
    const report = reportFactory.create('tests/mocks/coverage-example.json', 'json');

    expect(report.type).toBe('json');
  });
});
