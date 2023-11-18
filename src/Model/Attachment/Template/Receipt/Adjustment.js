class Adjustment {
  constructor(name = null, amount = null) {
    this.name = name;
    this.amount = amount;
  }

  getName() {
    return this.name;
  }

  getAmount() {
    return this.amount;
  }

  jsonSerialize() {
    return {
      name: this.name,
      amount: this.amount,
    };
  }
}

module.exports = Adjustment;
