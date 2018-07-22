import CoverageReport from '../../../src/corevageReport';
import JSONCoverageReport from '../../../src/corevageReport/JSONCoverageReport';

describe('index report', () => {
  test('should export JSON report as defualt', () => {
    expect(CoverageReport).toBe(JSONCoverageReport);
  });
});
