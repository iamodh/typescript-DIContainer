import {
  ERROR_MESSAGES,
  getInvalidCountMessage,
} from '../../constants/errorMessages.js';

class Lotto {
  #lottoConfig;
  #numbers;

  constructor(lottoConfig, numbers) {
    this.#lottoConfig = lottoConfig;

    this.#validateNumbersCount(numbers);
    this.#validateNumbersDuplicates(numbers);
    this.#numbers = numbers;
  }

  #validateNumbersCount(numbers) {
    const count = this.#lottoConfig.getNumbersCount();
    if (numbers.length !== count) {
      throw new Error(getInvalidCountMessage(count));
    }
  }

  #validateNumbersDuplicates(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.NUMBERS_DUPLICATES);
    }
  }

  contains(number) {
    return this.#numbers.includes(number);
  }

  matchCount(other) {
    const totalCounts = this.#numbers.length + other.length;

    const unionCounts = new Set([...this.#numbers, ...other]).size;

    return totalCounts - unionCounts;
  }

  getSortedNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
