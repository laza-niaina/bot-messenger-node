class Summary {
  constructor(totalCost, totalTax = null, subtotal = null, shippingCost = null) {
    this.subtotal = subtotal;
    this.shippingCost = shippingCost;
    this.totalCost = totalCost;
    this.totalTax = totalTax;
  }

  getSubtotal() {
    return this.subtotal;
  }

  getShippingCost() {
    return this.shippingCost;
  }

  getTotalTax() {
    return this.totalTax;
  }

  getTotalCost() {
    return this.totalCost;
  }

  jsonSerialize() {
    return {
      subtotal: this.subtotal,
      shipping_cost: this.shippingCost,
      total_tax: this.totalTax,
      total_cost: this.totalCost,
    };
  }
}

module.exports = Summary;
