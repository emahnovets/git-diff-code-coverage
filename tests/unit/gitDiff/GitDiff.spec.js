import { readFileSync } from 'fs';
import GitDiff from '../../../src/gitDiff/GitDiff';

describe('git diff', () => {
  let gitDiff = null;

  beforeEach(() => {
    const rawDiff = readFileSync('tests/mocks/diff.txt', 'utf-8');

    gitDiff = new GitDiff(rawDiff);
  });

  test('should raise an error in passed incorrect data', () => {
    expect(() => new GitDiff()).toThrowError('raw diff should be passed');
    expect(() => new GitDiff('')).toThrowError('raw diff should be passed');
    expect(() => new GitDiff({})).toThrowError('raw diff should be passed');

    expect(() => new GitDiff('abc')).not.toThrowError('raw diff should be passed');
  });

  test('should split whole diff on separate files', () => {
    expect(gitDiff.FileNames).toEqual([
      'tests/unit/arguments/Arguments.spec.js',
      'tests/unit/arguments/ArgumentsFactory.spec.js',
    ]);
  });

  test('should return array of objects with fileName and modifiedLines', () => {
    expect(gitDiff.ModifiedLines).toEqual([
      {
        fileName: 'tests/unit/arguments/Arguments.spec.js',
        newLines: [0],
      },
      {
        fileName: 'tests/unit/arguments/ArgumentsFactory.spec.js',
        newLines: [0, 1, 3],
      },
    ]);
  });
});
