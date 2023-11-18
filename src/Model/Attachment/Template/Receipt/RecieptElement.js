const AbstractElement = require('./AbstractElement'); // Adjust the path as needed

class ReceiptElement extends AbstractElement {
  constructor(title, price = 0, subtitle = null, quantity = null, currency = null, imageUrl = null) {
    super(title, subtitle, imageUrl);
    this.currency = currency;
    this.price = price;
    this.quantity = quantity;
  }

  getQuantity() {
    return this.quantity;
  }

  getPrice() {
    return this.price;
  }

  getCurrency() {
    return this.currency;
  }

  jsonSerialize() {
    return {
      ...super.jsonSerialize(),
      quantity: this.quantity,
      price: this.price,
      currency: this.currency,
    };
  }
}

module.exports = ReceiptElement;
