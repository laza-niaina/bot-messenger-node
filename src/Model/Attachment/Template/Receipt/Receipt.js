const Template = require('./Template'); // Adjust the path as needed
const Address = require('./Receipt/Address'); // Adjust the path as needed
const Adjustment = require('./Receipt/Adjustment'); // Adjust the path as needed

class Receipt extends Template {
  constructor(
    recipientName,
    orderNumber,
    currency,
    paymentMethod,
    elements,
    summary
  ) {
    super('receipt'); // Assuming the constant TYPE_RECEIPT is 'receipt'
    this.recipientName = recipientName;
    this.orderNumber = orderNumber;
    this.currency = currency;
    this.paymentMethod = paymentMethod;
    this.elements = elements;
    this.summary = summary;
    this.timestamp = null;
    this.orderUrl = null;
    this.address = null;
    this.adjustments = [];
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  setOrderUrl(orderUrl) {
    this.orderUrl = orderUrl;
  }

  setAddress(address) {
    this.address = address;
  }

  setAdjustments(adjustments) {
    this.adjustments = adjustments;
  }

  jsonSerialize() {
    const json = super.jsonSerialize();
    json.payload = {
      ...json.payload,
      recipient_name: this.recipientName,
      order_number: this.orderNumber,
      currency: this.currency,
      payment_method: this.paymentMethod,
      timestamp: this.timestamp,
      order_url: this.orderUrl,
      elements: this.elements,
      address: this.address,
      summary: this.summary,
      adjustments: this.adjustments,
    };

    return json;
  }
}

module.exports = Receipt;
