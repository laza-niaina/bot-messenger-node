const Button = require('./Button');
const ButtonValidators = require('../Validators/ButtonValidators');

class WebUrl extends Button {
  constructor(title, url) {
    ButtonValidators.validateTitleSize(title);
    ButtonValidators.validateWebUrl(url);

    super(Button.TYPE_WEB_URL);

    this.title = title;
    this.url = url;
  }

  /**
   * @inheritDoc
   */
  jsonSerialize() {
    const json = super.jsonSerialize();
    json.title = this.title;
    json.url = this.url;
    return json;
  }

  getTitle() {
    return this.title;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = WebUrl;
