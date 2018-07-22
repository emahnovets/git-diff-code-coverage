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
    this.addedLines = null;

    this.parseRawDiff();
  }

  parseRawDiff() {
    this.name = this.getNameFromRawDiff();
    this.addedLines = this.getAddedLinesFromDiff();
  }

  getNameFromRawDiff() {
    const match = FileDiff.FileNameRegex.exec(this.diffRaw);

    return match && match[1];
  }

  getAddedLinesFromDiff() {
    const targetFileContent = this.getTargetFileContent();

    return targetFileContent.split('\n').reduce((lines, line, index) => {
      if (line.startsWith('+')) {
        return [...lines, { content: line, number: index }];
      }

      return lines;
    }, []);
  }

  getTargetFileContent() {
    const fileDiff = this.getFileDiff();

    return fileDiff.replace(/^-.*\n*\r*/gm, '');
  }

  getFileDiff() {
    const match = FileDiff.FileDiffRegex.exec(this.diffRaw);

    return (match && match[1]) || '';
  }

  get Name() {
    return this.name;
  }

  get AddedLineNumbers() {
    return this.addedLines.map(line => line.number);
  }

  get AddedLines() {
    return this.addedLines;
  }
}
