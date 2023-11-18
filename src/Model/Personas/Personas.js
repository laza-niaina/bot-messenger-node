class Personas {
  constructor(name, profile_picture_url, id = null) {
    this.name = name;
    this.profile_picture_url = profile_picture_url;
    this.id = id;
  }

  toJSON() {
    return {
      name: this.name,
      profile_picture_url: this.profile_picture_url,
    };
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getProfilePictureUrl() {
    return this.profile_picture_url;
  }
}

module.exports = Personas;
