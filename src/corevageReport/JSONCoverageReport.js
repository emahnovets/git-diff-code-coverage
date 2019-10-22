import { readFileSync, existsSync } from 'fs';

export default class JSONCoverageReport {
  static build(reportPath) {
    return new JSONCoverageReport(reportPath);
  }

  constructor(reportPath) {
    this.reportPath = reportPath;
    this.reportContent = null;

    this.validatePath();
    this.loadReportContent();
  }

  validatePath() {
    if (!existsSync(this.reportPath)) {
      throw new Error('coverage report does not exists, check path');
    }
  }

  loadReportContent() {
    this.reportContent = this.getReportContent();
  }

  getReportContent() {
    try {
      const reportContent = readFileSync(this.reportPath, 'utf-8');

      return JSON.parse(reportContent);
    } catch (e) {
      throw new Error('can\'t parse report content');
    }
  }

  get Report() {
    return this.reportContent;
  }

  isLineShouldBeCovered(file, lineNumber) {
    return this.isFileExistsInReport(file) && this.getLinesToCover(file).includes(`${lineNumber}`);
  }

  isFileExistsInReport(file) {
    return !!this.Report[file];
  }

  getLinesToCover(file) {
    return Object.keys(this.Report[file].linesCovered);
  }

  isLineCovered(file, lineNumber) {
    return this.Report[file].linesCovered[lineNumber] > 0;
  }
}
