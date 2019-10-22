import CoverageReport from '../../../src/corevageReport';
import ReportFactory from '../../../src/corevageReport/ReportFactory';

describe('index report', () => {
  test('should export report factory as default', () => {
    expect(CoverageReport).toBe(ReportFactory);
  });
});
