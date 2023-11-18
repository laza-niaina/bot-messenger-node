const Attachment = require('./Attachment');
const File = require('./File');

class Audio extends File {
  constructor(filePath) {
    super(filePath, Attachment.TYPE_AUDIO);
  }
}

module.exports = Audio;
