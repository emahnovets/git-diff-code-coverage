import { readFileSync } from 'fs';
import FileDiff from '../../../src/gitDiff/FileDiff';

describe('file diff', () => {
  let fileDiff = null;

  beforeEach(() => {
    const rawDiff = readFileSync('tests/mocks/fileDiff.txt', 'utf-8');

    fileDiff = new FileDiff(rawDiff);
  });

  test('should raise an error in passed incorrect data', () => {
    expect(() => new FileDiff()).toThrowError('raw diff should be passed');
    expect(() => new FileDiff('')).toThrowError('raw diff should be passed');
    expect(() => new FileDiff({})).toThrowError('raw diff should be passed');

    expect(() => new FileDiff('abc')).not.toThrowError('raw diff should be passed');
  });

  test('should extract target file name from raw diff', () => {
    expect(fileDiff.Name).toBe('tests/unit/arguments/ArgumentsFactory.spec.js');
  });

  test('should extract added row number from raw git diff', () => {
    expect(fileDiff.AddedLineNumbers).toEqual([
      0, 1, 3,
    ]);
  });

  test('should extract file content from raw diff', () => {
    expect(fileDiff.getFileDiff()).toBe(`-import Arguments from '../../src/arguments/Arguments';
-import getArgumentsInstance from '../../src/arguments/ArgumentsFactory';
+import Arguments from '../../../src/arguments/Arguments';
+import getArgumentsInstance from '../../../src/arguments/ArgumentsFactory';
 
-jest.mock('../../src/arguments/Arguments');
+jest.mock('../../../src/arguments/Arguments');
 
 describe('arguments factory', () => {
   afterAll(() => {
     jest.resetAllMocks();
   });
 
   test('should create one instance if Arguments class', () => {
     const firstArgumentsInstance = getArgumentsInstance();
     const secondArgumentsInstance = getArgumentsInstance();
     const thirdArgumentsInstance = getArgumentsInstance();
 
     expect(firstArgumentsInstance).toBeInstanceOf(Arguments);
     expect(Arguments).toHaveBeenCalledTimes(1);
     expect(firstArgumentsInstance).toBe(secondArgumentsInstance);
     expect(secondArgumentsInstance).toBe(thirdArgumentsInstance);
   });
 });`);
  });

  test('should extract new file content from raw git diff', () => {
    expect(fileDiff.getTargetFileContent()).toBe(`+import Arguments from '../../../src/arguments/Arguments';
+import getArgumentsInstance from '../../../src/arguments/ArgumentsFactory';
 
+jest.mock('../../../src/arguments/Arguments');
 
 describe('arguments factory', () => {
   afterAll(() => {
     jest.resetAllMocks();
   });
 
   test('should create one instance if Arguments class', () => {
     const firstArgumentsInstance = getArgumentsInstance();
     const secondArgumentsInstance = getArgumentsInstance();
     const thirdArgumentsInstance = getArgumentsInstance();
 
     expect(firstArgumentsInstance).toBeInstanceOf(Arguments);
     expect(Arguments).toHaveBeenCalledTimes(1);
     expect(firstArgumentsInstance).toBe(secondArgumentsInstance);
     expect(secondArgumentsInstance).toBe(thirdArgumentsInstance);
   });
 });`);
  });
});
