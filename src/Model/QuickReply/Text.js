const QuickReply = require('./QuickReply');

class Text extends QuickReply {
  /**
   * @param {string} title
   * @param {string} payload
   * @param {string|null} imgUrl
   */
  constructor(title, payload, imgUrl = null) {
    super(QuickReply.TYPE_TEXT);

    this.title = title;
    this.payload = payload;
    this.imgUrl = imgUrl;

    return this;
  }

  /**
   * @inheritdoc
   */
  jsonSerialize() {
    const json = super.jsonSerialize();
    json.title = this.title;
    json.payload = this.payload;
    json.image_url = this.imgUrl;
    return json;
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this.title;
  }

  /**
   * @param {string} title
   * @return {Text}
   */
  setTitle(title) {
    this.title = title;
    return this;
  }

  /**
   * @return {string}
   */
  getPayload() {
    return this.payload;
  }

  /**
   * @param {string} payload
   * @return {Text}
   */
  setPayload(payload) {
    this.payload = payload;
    return this;
  }

  /**
   * @return {string}
   */
  getImgUrl() {
    return this.imgUrl;
  }

  /**
   * @param {string} imgUrl
   * @return {Text}
   */
  setImgUrl(imgUrl) {
    this.imgUrl = imgUrl;
    return this;
  }
}

module.exports = Text;
