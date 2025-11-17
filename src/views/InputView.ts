import { Console } from '@woowacourse/mission-utils';
import {
  ERROR_MESSAGES,
  getInvalidPricaMessage,
  getNumberNotInRangeMessage,
} from '../constants/errorMessages.js';

class InputView {
  #lottoConfig;

  constructor(lottoConfig) {
    this.#lottoConfig = lottoConfig;
  }

  async getPurchasePrice() {
    const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');

    const purchasePrice = Number(input.trim());
    this.#validateNumberPositive(purchasePrice);
    this.#valiadtePurchasePrice(purchasePrice);

    return purchasePrice;
  }

  async getWinningNumbers() {
    const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');

    const numbers = input.split(',').map((number) => Number(number.trim()));

    numbers.forEach((number) => this.#validateNumberInRange(number));

    return numbers;
  }

  async getBonusNumber() {
    const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');

    const number = Number(input.trim());

    this.#validateNumberInRange(number);

    return number;
  }

  #validateNumberPositive(number) {
    if (Number.isNaN(number) || !Number.isInteger(number) || number === 0) {
      throw new Error(ERROR_MESSAGES.NUMBER_NOT_POSITIVE);
    }
  }

  #validateNumberInRange(number) {
    this.#validateNumberPositive(number);
    const from = this.#lottoConfig.getNumbersFrom();
    const to = this.#lottoConfig.getNumbersTo();

    if (number < from || number > to) {
      throw new Error(getNumberNotInRangeMessage(from, to));
    }
  }

  #valiadtePurchasePrice(purchasePrice) {
    const price = this.#lottoConfig.getPrice();
    if (purchasePrice % price !== 0) {
      throw new Error(getInvalidPricaMessage(price));
    }
  }
}

export default InputView;
