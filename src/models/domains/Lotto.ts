import {
  ERROR_MESSAGES,
  getInvalidCountMessage,
} from '../../constants/errorMessages.js';
import LottoConfig from '../services/configs/LottoConfig.js';

class Lotto {
  #lottoConfig: LottoConfig;
  #numbers: number[];

  constructor(lottoConfig: LottoConfig, numbers: number[]) {
    this.#lottoConfig = lottoConfig;

    this.#validateNumbersCount(numbers);
    this.#validateNumbersDuplicates(numbers);
    this.#numbers = numbers;
  }

  #validateNumbersCount(numbers: number[]) {
    const count = this.#lottoConfig.getNumbersCount();
    if (numbers.length !== count) {
      throw new Error(getInvalidCountMessage(count));
    }
  }

  #validateNumbersDuplicates(numbers: number[]) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.NUMBERS_DUPLICATES);
    }
  }

  contains(number: number) {
    return this.#numbers.includes(number);
  }

  matchCount(other: number[]) {
    const totalCounts = this.#numbers.length + other.length;

    const unionCounts = new Set([...this.#numbers, ...other]).size;

    return totalCounts - unionCounts;
  }

  getSortedNumbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }
}

export default Lotto;
