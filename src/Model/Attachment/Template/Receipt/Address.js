class Address {
  constructor(street, city, postalCode, state, country, secondStreet = null) {
    this.country = country;
    this.state = state;
    this.postalCode = postalCode;
    this.city = city;
    this.secondStreet = secondStreet;
    this.street = street;
  }

  getCountry() {
    return this.country;
  }

  getState() {
    return this.state;
  }

  getPostalCode() {
    return this.postalCode;
  }

  getCity() {
    return this.city;
  }

  getStreet() {
    return this.street;
  }

  getSecondStreet() {
    return this.secondStreet;
  }

  jsonSerialize() {
    return {
      street_1: this.street,
      street_2: this.secondStreet,
      postal_code: this.postalCode,
      city: this.city,
      country: this.country,
      state: this.state,
    };
  }
}

module.exports = Address;
