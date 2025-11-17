class FixedStrategy {
  #numbers;
  constructor(numbers) {
    this.#numbers = numbers;
  }

  generate() {
    return this.#numbers;
  }
}

export default FixedStrategy;
