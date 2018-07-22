export default class FileDiff {
  static get FileNameRegex() {
    return /^diff --git a.+ b\/(.+)$/gm;
  }

  static get FileDiffRegex() {
    return /@@\n([\s\S]+)/gm;
  }

  constructor(diffRaw) {
    if (!diffRaw || typeof diffRaw !== 'string' || diffRaw.length === 0) {
      throw new Error('raw diff should be passed');
    }

    this.diffRaw = diffRaw;
    this.name = null;
    this.addedLineNumbers = null;

    this.parseRawDiff();
  }

  parseRawDiff() {
    this.name = this.getNameFromRawDiff();
    this.addedLineNumbers = this.getAddedLineNumbersFromDiff();
  }

  getNameFromRawDiff() {
    const match = FileDiff.FileNameRegex.exec(this.diffRaw);

    return match && match[1];
  }

  getAddedLineNumbersFromDiff() {
    const targetFileContent = this.getTargetFileContent();

    return targetFileContent.split('\n').reduce((numbers, line, index) => {
      if (line.startsWith('+')) {
        return [...numbers, index];
      }

      return numbers;
    }, []);
  }

  getTargetFileContent() {
    const fileDiff = this.getFileDiff();

    return fileDiff.replace(/^-.+\n*\r*/gm, '');
  }

  getFileDiff() {
    const match = FileDiff.FileDiffRegex.exec(this.diffRaw);

    return match && match[1];
  }

  get Name() {
    return this.name;
  }

  get AddedLineNumbers() {
    return this.addedLineNumbers;
  }
}
