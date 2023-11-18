const Personas = require('./Personas'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class PersonasFactory {
  /**
   * Create a list of Personas
   *
   * @param {Object} data
   * @return {Personas[]}
   */
  static createList(data = {}) {
    const personas = [];
    for (const p of data.data) {
      personas.push(new Personas(p.name, p.profile_picture_url, p.id));
    }
    return personas;
  }

  /**
   * Create one Personas
   *
   * @param {Object} data
   * @return {Personas}
   */
  static createOne(data) {
    return new Personas(data.name, data.profile_picture_url, data.id);
  }
}

module.exports = PersonasFactory;
