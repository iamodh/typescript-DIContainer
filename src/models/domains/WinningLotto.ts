import {
  ERROR_MESSAGES,
  getInvalidCountMessage,
} from '../../constants/errorMessages.js';
import LottoConfig from '../services/configs/LottoConfig.js';
import Lotto from './Lotto.js';

class WinningLotto {
  #lottoConfig: LottoConfig;
  #numbers: number[];
  #bonusNumber: number;

  constructor(
    lottoConfig: LottoConfig,
    numbers: number[],
    bonusNumber: number
  ) {
    this.#lottoConfig = lottoConfig;

    this.#validateNumbersCount(numbers);
    this.#validateNumbersDuplicates(numbers);
    this.#validateBonusNumberDuplicates(numbers, bonusNumber);

    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
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

  #validateBonusNumberDuplicates(numbers: number[], bonusNumber: number) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATES);
    }
  }

  calculateRank(lotto: Lotto) {
    const matchCount = lotto.matchCount(this.#numbers);
    const hasBonus = lotto.contains(this.#bonusNumber);

    return this.#determineRank(matchCount, hasBonus);
  }

  #determineRank(matchCount: number, hasBonus: boolean) {
    if (matchCount === 6) return 'FIRST';
    if (matchCount === 5 && hasBonus) return 'SECOND';
    if (matchCount === 5) return 'THIRD';
    if (matchCount === 4) return 'FOURTH';
    if (matchCount === 3) return 'FIFTH';
    else return 'NONE';
  }
}

export default WinningLotto;
