import JSONCoverageReport from './JSONCoverageReport';
import LCOVCoverageReport from './LCOVCoverageReport';

export default class ReportFactory {
  constructor() {
    this.reportType = {
      json: JSONCoverageReport,
      lcov: LCOVCoverageReport,
    };
  }

  isTypeExists(type) {
    return Object.keys(this.reportType).includes(type);
  }

  create(reportPath, type = 'lcov') {
    const isTypeExists = this.isTypeExists(type);
    const CoverageReport = isTypeExists ? this.reportType[type] : this.reportType.lcov;
    const report = CoverageReport.build(reportPath);
    report.type = isTypeExists ? type : 'lcov';

    return report;
  }
}
