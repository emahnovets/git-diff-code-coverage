export default class GitDiff {
  constructor(files) {
    this.files = files;
  }

  get FileNames() {
    return this.files.map(file => file.Name);
  }
}
