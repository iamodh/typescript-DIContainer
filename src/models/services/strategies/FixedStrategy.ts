import NumbersGenerator from './NumbersGenerator.js';

class FixedStrategy implements NumbersGenerator {
  #numbers: number[];
  constructor(numbers: number[]) {
    this.#numbers = numbers;
  }

  generate() {
    return this.#numbers;
  }
}

export default FixedStrategy;
