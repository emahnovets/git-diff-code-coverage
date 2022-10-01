/* eslint-disable no-console */
import semver from 'semver';
import minimatch from 'minimatch';
import getArgumentsInstance from './arguments/ArgumentsFactory';

export default class Reporter {
  constructor(gitDiff, coverageReport) {
    this.gitDiff = gitDiff;
    this.coverageReport = coverageReport;
    this.args = getArgumentsInstance();
    this.calculateCoverageResults();
  }

  calculateCoverageResults() {
    const filesToCheck = this.getFilesToCheck();
    const fileReports = this.getCoverageReportByFile(filesToCheck);
    const addedLinesCount = fileReports.reduce((sum, { linesCount }) => sum + linesCount, 0);
    const totalCoveredLinesCount = fileReports
      .reduce((sum, { coveredLinesCount }) => sum + coveredLinesCount, 0);

    this.overallCoverage = (addedLinesCount ? totalCoveredLinesCount / addedLinesCount : 0) * 100;
    this.addedLinesCount = addedLinesCount;
    this.totalCoveredLinesCount = totalCoveredLinesCount;
    this.fileReports = fileReports;
  }

  getFilesToCheck() {
    const nameTemplate = this.args.FileTemplate;

    return this.gitDiff.ModifiedLines
      .filter(({ fileName }) => minimatch(fileName, nameTemplate));
  }

  getCoverageReportByFile(filesToCheck) {
    return (filesToCheck || []).map((file) => {
      const lines = this.getProcessedFileLines(file);
      const coveredLinesCount = lines.filter(({ covered }) => covered).length;
      const coverage = lines.length ? coveredLinesCount / lines.length : 0;

      return {
        fileName: file.fileName,
        linesCount: lines.length,
        coverage: coverage * 100,
        coveredLinesCount,
        lines,
      };
    });
  }

  getProcessedFileLines({ fileName, newLines }) {
    return newLines.reduce((lines, { number, content }) => {
      if (this.coverageReport.isLineShouldBeCovered(fileName, number + 1)) {
        return [...lines, {
          number: number + 1,
          covered: this.coverageReport.isLineCovered(fileName, number + 1),
          content,
        }];
      }

      return lines;
    }, []);
  }

  displayResults() {
    this.displayOverallCoverage();
    this.displayFilesDetails();
  }

  displayOverallCoverage() {
    if (!this.args.Silent) {
      console.log(`Overall coverage: ${this.overallCoverage.toFixed(2)}%\n`);
    }
  }

  displayFilesDetails() {
    this.fileReports.forEach((file) => {
      if (file.linesCount) {
        const countOfCoveredLines = file.lines.filter(({ covered }) => covered).length;
        console.log(`File: ${file.fileName}: ${file.coverage.toFixed(2)}% | ${countOfCoveredLines} / ${file.lines.length}`);

        if (this.args.Verbose) {
          this.displayLinesResults(file);
          console.log('\n');
        }
      }
    });
  }

  displayLinesResults({ lines }) {
    if (semver.gte(process.version, '10.0.0')) {
      console.table(lines, ['covered', 'number', 'content']);
    } else {
      lines.forEach(line => console.log(`${line.covered} | ${line.number}: ${line.content}`));
    }
  }
}
