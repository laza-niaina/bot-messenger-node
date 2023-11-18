class PersistentMenu {
  static NAME = "persistent_menu";

  constructor(persistentElements) {
    this.persistentElements = persistentElements;
  }

  jsonSerialize() {
    return {
      persistent_menu: this.persistentElements,
    };
  }

  getPersistantElements() {
    return this.persistentElements;
  }

  setPersistantElements(persistantElements) {
    this.persistentElements = persistantElements;
    return this;
  }
}

module.exports = PersistentMenu;
