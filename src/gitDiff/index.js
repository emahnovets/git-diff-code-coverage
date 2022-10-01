import simpleGit from 'simple-git';
import GitDiff from './GitDiff';
import getArgumentsInstance from '../arguments/ArgumentsFactory';

function getDiff() {
  const args = getArgumentsInstance();
  const git = simpleGit(args.GitRepoPath);

  return new Promise((resolve, reject) => {
    let gitDiffArguments = ['-U10000'];

    if (args.TargetCommitHash) {
      if (args.SourceCommitHash) {
        gitDiffArguments = [args.SourceCommitHash, ...gitDiffArguments];
      }

      gitDiffArguments = [args.TargetCommitHash, ...gitDiffArguments];
    }

    git.diff(gitDiffArguments, (err, diff) => {
      if (err) {
        reject(err);
      } else {
        resolve(diff);
      }
    });
  });
}

export default async function getGitDiff() {
  const diff = await getDiff();

  return new GitDiff(diff);
}
