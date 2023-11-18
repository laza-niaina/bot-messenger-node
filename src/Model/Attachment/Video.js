const Attachment = require('./Attachment');
const File = require('./File');

class Audio extends File {
  constructor(filePath) {
    super(filePath, Attachment.TYPE_VIDEO);
  }
}

module.exports = Audio;
