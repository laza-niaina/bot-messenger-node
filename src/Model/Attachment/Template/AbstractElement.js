class AbstractElement {
  /**
   * @param {string} title
   * @param {string|null} subtitle
   * @param {string|null} imageUrl
   */
  constructor(title, subtitle = null, imageUrl = null) {
    this.title = title;
    this.subtitle = subtitle;
    this.imageUrl = imageUrl;
  }

  /**
   * @return {Object}
   */
  jsonSerialize() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      image_url: this.imageUrl,
    };
  }

  /**
   * @return {string|null}
   */
  getImageUrl() {
    return this.imageUrl;
  }

  /**
   * @return {string|null}
   */
  getSubtitle() {
    return this.subtitle;
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this.title;
  }

  /**
   * @deprecated use the constructor argument instead
   * @param {string|null} imageUrl
   */
  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  /**
   * @deprecated use the constructor argument instead
   * @param {string|null} subtitle
   */
  setSubtitle(subtitle) {
    // Implement validation if needed for subtitle size
    this.subtitle = subtitle;
  }
}

module.exports = AbstractElement;
