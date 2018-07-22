import simpleGit from 'simple-git';
import Promise from 'promise';
import GitDiff from './GitDiff';
import getArgumentsInstance from '../arguments/ArgumentsFactory';

function getDiff() {
  const args = getArgumentsInstance();
  const git = simpleGit(args.GitRepoPath);

  return new Promise((resolve, reject) => {
    git.diff(['-U10000'], (err, diff) => {
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
