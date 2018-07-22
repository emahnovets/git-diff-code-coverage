import FileDiff from './FileDiff';

export default class GitDiff {
  constructor(rawDiff) {
    if (!rawDiff || typeof rawDiff !== 'string' || rawDiff.length === 0) {
      throw new Error('raw diff should be passed');
    }

    this.rawDiff = rawDiff;
    this.files = [];

    this.parseRawDiff();
  }

  parseRawDiff() {
    const fileParts = this.getFileDiffs();

    this.files = fileParts.map(fileDiffRaw => new FileDiff(fileDiffRaw));
  }

  getFileDiffs() {
    const fileDiffStartTemplate = 'diff --git';

    return this.rawDiff.split(fileDiffStartTemplate).reduce((files, file) => {
      if (file.length > 0) {
        return [...files, `${fileDiffStartTemplate}${file}`];
      }

      return files;
    }, []);
  }

  get FileNames() {
    return this.files.map(file => file.Name);
  }
}
