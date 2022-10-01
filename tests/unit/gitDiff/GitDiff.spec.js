import { readFileSync } from 'fs';
import GitDiff from '../../../src/gitDiff/GitDiff';

describe('git diff', () => {
  let gitDiff = null;

  beforeEach(() => {
    const rawDiff = readFileSync('tests/mocks/diff.txt', 'utf-8');

    gitDiff = new GitDiff(rawDiff);
  });

  test('should raise an error in passed incorrect data', () => {
    expect(() => new GitDiff()).toThrow('raw diff should be passed');
    expect(() => new GitDiff('')).toThrow('raw diff should be passed');
    expect(() => new GitDiff({})).toThrow('raw diff should be passed');

    expect(() => new GitDiff('abc')).not.toThrow('raw diff should be passed');
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
        newLines: [{
          number: 0,
          content: '+import Arguments from \'../../../src/arguments/Arguments\';',
        }],
      },
      {
        fileName: 'tests/unit/arguments/ArgumentsFactory.spec.js',
        newLines: [
          {
            number: 0,
            content: '+import Arguments from \'../../../src/arguments/Arguments\';',
          }, {
            number: 1,
            content: '+import getArgumentsInstance from \'../../../src/arguments/ArgumentsFactory\';',
          }, {
            number: 3,
            content: '+jest.mock(\'../../../src/arguments/Arguments\');',
          }],
      },
    ]);
  });
});
