/* eslint-disable no-console */
import getGitDiff from './gitDiff';
import ReportFactory from './corevageReport';
import getArgumentsInstance from './arguments/ArgumentsFactory';
import Reporter from './reporter';

async function main() {
  const args = getArgumentsInstance();
  const reportFactory = new ReportFactory();
  const diff = await getGitDiff();

  const report = await reportFactory.create(
    `${args.GitRepoPath}/${args.CoverageReportPath}`,
    args.ReportFormat,
  );

  const reporter = new Reporter(diff, report);

  if (reporter.addedLinesCount === 0) {
    console.log('No files changed');
    process.exit(0);
  }

  reporter.displayResults();

  if (reporter.overallCoverage >= args.MinimumOverallCoverage) {
    process.exit(0);
  } else {
    console.error(`Current overall coverage (${reporter.overallCoverage.toFixed(2)}%) should be more than ${args.MinimumOverallCoverage}%`);
    process.exit(1);
  }
}

main();
