import { readFileSync, existsSync } from 'fs';
import parse from 'lcov-parse';

export default class LCOVCoverageReport {
  static async build(reportPath) {
    const instance = new LCOVCoverageReport(reportPath);
    await instance.loadReportContent();

    return instance;
  }

  constructor(reportPath) {
    this.reportPath = reportPath;
    this.reportContent = null;

    this.validatePath();
  }

  validatePath() {
    if (!existsSync(this.reportPath)) {
      throw new Error('coverage report does not exists, check path');
    }
  }

  async loadReportContent() {
    this.reportContent = await this.getReportContent();
  }

  getReportContent() {
    const reportContent = readFileSync(this.reportPath, 'utf-8');

    return new Promise((resolve, reject) => {
      parse(reportContent, (error, report) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(report);
        }
      });
    });
  }

  get Report() {
    return this.reportContent;
  }

  isLineShouldBeCovered(file, lineNumber) {
    return this.isFileExistsInReport(file) && this.getLinesToCover(file).includes(lineNumber);
  }

  getFileFromReport(fileName) {
    return this.Report.find(({ file }) => file.includes(fileName));
  }

  isFileExistsInReport(file) {
    return !!this.getFileFromReport(file);
  }

  getLinesToCover(file) {
    const fileFromReport = this.getFileFromReport(file);

    return fileFromReport.lines.details.map(({ line }) => line);
  }

  getCoveredLines(file) {
    const fileFromReport = this.getFileFromReport(file);

    return fileFromReport.lines.details.reduce((lines, { line, hit }) => {
      if (parseInt(hit, 10) > 0) {
        return [...lines, line];
      }

      return lines;
    }, []);
  }

  isLineCovered(file, lineNumber) {
    return this.getCoveredLines(file).includes(lineNumber);
  }
}
