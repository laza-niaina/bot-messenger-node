const Attachment = require('./Attachment');

class File extends Attachment {
  constructor(filePath, type = Attachment.TYPE_FILE) {
    super(type, { is_reusable: true });

    this.path = filePath;
    this.stream = null;
  }

  open() {
    if (this.stream) {
      return;
    }

    if (this.isRemoteFile()) {
      throw new Error("Cannot open remote file");
    }

    if (!require('fs').existsSync(this.path) || !require('fs').readableSync(this.path)) {
      throw new Error(`${this.path} should be a readable file`);
    }

    this.stream = require('fs').createReadStream(this.path);

    this.stream.on('error', (err) => {
      throw new Error(`Unable to open ${this.path}: ${err.message}`);
    });
  }

  isRemoteFile() {
    return /^https:\/\//.test(this.path);
  }

  getStream() {
    this.open();
    return this.stream;
  }

  getPath() {
    return this.path;
  }
}

module.exports = File;
