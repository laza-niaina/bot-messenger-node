class AbstractElement {

  constructor(title, subtitle = null, imageUrl = null) {
    // TemplateValidators::validateTitleSize($title);
    // TemplateValidators::validateSubtitleSize($subtitle);
    this.title = title;
    this.subtitle = subtitle;
    this.imageUrl = imageUrl;
  }

  jsonSerialize() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      image_url: this.imageUrl
    };
  }

  getImageUrl() {
    return this.imageUrl;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getTitle() {
    return this.title;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  setSubtitle(subtitle) {
    // TemplateValidators::validateSubtitleSize($subtitle);

    this.subtitle = subtitle;
  }
}
